"use server"

import { Resend } from "resend"
import { db, getRegistrationErrorMessage, isDatabaseConfigured, isSafeText, isValidEmail, registrations } from "@/lib/db"
import { academyPrograms } from "@/lib/academy-data"

const academyInbox = "njigouhrazak@iut-dhaka.edu"

export type RegistrationState = { success: boolean; message: string }

export async function submitRegistration(_previousState: RegistrationState, formData: FormData): Promise<RegistrationState> {
  const studentName = String(formData.get("student_name") ?? "").trim()
  const parentName = String(formData.get("parent_name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const phone = String(formData.get("phone") ?? "").trim()
  const course = String(formData.get("course") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!isSafeText(studentName, 120) || !isSafeText(parentName, 120) || !isValidEmail(email) || !isSafeText(phone, 40) || !academyPrograms.some((program) => program.title === course)) {
    return { success: false, message: "Vérifiez les informations obligatoires et choisissez une formation proposée." }
  }

  if (!isDatabaseConfigured()) {
    return { success: false, message: "La base de données n’est pas configurée. Veuillez contacter l’administration." }
  }

  try {
    const [registration] = await db.insert(registrations).values({ studentName, parentName, email, phone, course, message }).returning({ id: registrations.id })
    const resend = new Resend(process.env.RESEND_API_KEY_2 || process.env.RESEND_API_KEY)
    const from = process.env.RESEND_FROM_EMAIL_2 || process.env.RESEND_FROM_EMAIL

    if (!from) return { success: false, message: "Le service d’email n’est pas configuré. Veuillez contacter l’administration." }

    const { error } = await resend.emails.send({
      from,
      to: [academyInbox],
      replyTo: email,
      subject: `Nouvelle demande d’admission — ${course}`,
      html: `<h2>Nouvelle demande Global Academy</h2><p><strong>Apprenant :</strong> ${studentName}</p><p><strong>Responsable :</strong> ${parentName}</p><p><strong>Email :</strong> ${email}</p><p><strong>Téléphone :</strong> ${phone}</p><p><strong>Formation :</strong> ${course}</p><p><strong>Message :</strong> ${message || "Aucun message"}</p>`,
    }, { idempotencyKey: `registration/${registration.id}` })

    if (error) console.error("[v0] Resend delivery failed", error)
    return { success: true, message: "Votre demande a bien été enregistrée. Notre équipe vous contactera prochainement pour la suite de la validation." }
  } catch (error) {
    return { success: false, message: getRegistrationErrorMessage(error) }
  }
}
