"use server"

import { Resend } from "resend"
import { db, getRegistrationErrorMessage, isDatabaseConfigured, isSafeText, isValidEmail, registrations } from "@/lib/db"
import { academyPrograms, freeShortCourses } from "@/lib/academy-data"

const academyInbox = "njigouhrazak@iut-dhaka.edu"
const defaultFrom = "Global Academy <noreply@globalacademy.freelanceconnect.cm>"

export type RegistrationState = { success: boolean; message: string }

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;",
  })[character] ?? character)
}

function confirmationEmail(studentName: string, course: string) {
  const safeName = escapeHtml(studentName)
  const safeCourse = escapeHtml(course)

  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#17324d"><div style="max-width:620px;margin:32px auto;background:#ffffff;border:1px solid #dce6ef;border-radius:16px;overflow:hidden"><div style="background:#0c6b72;padding:28px 32px;color:#ffffff"><div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85">Global Academy</div><h1 style="margin:10px 0 0;font-size:26px;line-height:1.2">Votre demande a bien été reçue</h1></div><div style="padding:32px"><p style="font-size:16px;line-height:1.6">Bonjour ${safeName},</p><p style="font-size:16px;line-height:1.6">Nous vous remercions pour votre intérêt envers Global Academy. Votre demande d’inscription à la formation <strong>${safeCourse}</strong> a été enregistrée avec succès.</p><p style="font-size:16px;line-height:1.6">Notre équipe va examiner vos informations et vous recontacter prochainement afin de vous présenter les prochaines étapes de validation.</p><div style="margin:24px 0;padding:18px 20px;background:#eef8f7;border-left:4px solid #0c6b72;border-radius:8px"><strong>À retenir</strong><br><span style="line-height:1.6">Cette confirmation ne vaut pas encore admission définitive. L’accès à la formation sera confirmé après étude de votre dossier.</span></div><p style="font-size:15px;line-height:1.6">Pour toute question, vous pouvez répondre directement à cet email ou écrire à <a href="mailto:contact@globalacademy.freelanceconnect.cm" style="color:#0c6b72">contact@globalacademy.freelanceconnect.cm</a>.</p><p style="font-size:16px;line-height:1.6">Cordialement,<br><strong>L’équipe Global Academy</strong></p></div><div style="padding:18px 32px;background:#f7fafc;color:#60758a;font-size:12px;line-height:1.5">Global Academy · Centre de formation professionnelle agréé par le MINEFOP<br>920 Avenue de l’indépendance, Bonapriso, Douala, Cameroun · BP 3861</div></div></body></html>`
}

export async function submitRegistration(_previousState: RegistrationState, formData: FormData): Promise<RegistrationState> {
  const studentName = String(formData.get("student_name") ?? "").trim()
  const parentName = String(formData.get("parent_name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const phone = String(formData.get("phone") ?? "").trim()
  const course = String(formData.get("course") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!isSafeText(studentName, 120) || !isSafeText(parentName, 120) || !isValidEmail(email) || !isSafeText(phone, 40) || ![...academyPrograms, ...freeShortCourses].some((program) => program.title === course)) {
    return { success: false, message: "Vérifiez les informations obligatoires et choisissez une formation proposée." }
  }

  if (!isDatabaseConfigured()) {
    return { success: false, message: "La base de données n’est pas configurée. Veuillez contacter l’administration." }
  }

  try {
    const [registration] = await db.insert(registrations).values({ studentName, parentName, email, phone, course, message }).returning({ id: registrations.id })
    const resendApiKey = process.env.RESEND_API_KEY_2?.startsWith("re_")
      ? process.env.RESEND_API_KEY_2
      : process.env.RESEND_API_KEY
    const resend = new Resend(resendApiKey)
    const configuredFrom = process.env.RESEND_FROM_EMAIL_2?.includes("@") && !process.env.RESEND_FROM_EMAIL_2.includes("process.env")
      ? process.env.RESEND_FROM_EMAIL_2
      : defaultFrom
    const from = configuredFrom

    const { error: adminError } = await resend.emails.send({
      from,
      to: [academyInbox],
      replyTo: email,
      subject: `Nouvelle demande d’admission — ${course}`,
      html: `<h2>Nouvelle demande Global Academy</h2><p><strong>Apprenant :</strong> ${escapeHtml(studentName)}</p><p><strong>Responsable :</strong> ${escapeHtml(parentName)}</p><p><strong>Email :</strong> ${escapeHtml(email)}</p><p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p><p><strong>Formation :</strong> ${escapeHtml(course)}</p><p><strong>Message :</strong> ${escapeHtml(message || "Aucun message")}</p>`,
    }, { idempotencyKey: `registration-admin/${registration.id}` })

    const { error: applicantError } = await resend.emails.send({
      from: defaultFrom,
      to: [email],
      replyTo: academyInbox,
      subject: "Confirmation de réception de votre demande — Global Academy",
      html: confirmationEmail(studentName, course),
    }, { idempotencyKey: `registration-confirmation/${registration.id}` })

    if (adminError || applicantError) {
      console.error("[v0] Registration email delivery failed", { adminError, applicantError, registrationId: registration.id })
    }

    return { success: true, message: "Votre demande a bien été enregistrée. Un email de confirmation vous a été envoyé et notre équipe vous contactera prochainement pour la suite de la validation." }
  } catch (error) {
    return { success: false, message: getRegistrationErrorMessage(error) }
  }
}
