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
  const referenceName = String(formData.get("reference_name") ?? "").trim()
  const lastDiploma = String(formData.get("last_diploma") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const whatsappSameAsPhone = formData.get("whatsapp_same_as_phone") === "true"
  const whatsappPhone = whatsappSameAsPhone ? phone : String(formData.get("whatsapp_phone") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const course = String(formData.get("course") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!isSafeText(studentName, 120) || !isSafeText(phone, 40) || !isSafeText(whatsappPhone, 40) || !isSafeText(referenceName || "non renseignée", 120) || !isSafeText(lastDiploma || "non renseigné", 160) || !isValidEmail(email) || ![...academyPrograms, ...freeShortCourses].some((program) => program.title === course)) {
    return { success: false, message: "Vérifiez les informations obligatoires et choisissez une formation proposée." }
  }

  if (!isDatabaseConfigured()) {
    return { success: false, message: "La base de données n’est pas configurée. Veuillez contacter l’administration." }
  }

  try {
    const [registration] = await db.insert(registrations).values({ studentName, referenceName: referenceName || "Non renseignée", lastDiploma: lastDiploma || "Non renseigné", whatsappPhone, whatsappSameAsPhone, email, phone, course, message }).returning({ id: registrations.id })
    const resendApiKey = [process.env.RESEND_API_KEY_2, process.env.RESEND_API_KEY]
      .find((value) => value?.startsWith("re_") && !value.includes("process.env"))

    if (!resendApiKey) {
      console.error("[v0] Registration saved but Resend API key is not configured", { registrationId: registration.id })
      return { success: false, message: "Votre demande a été enregistrée, mais l’envoi de la confirmation est momentanément indisponible. Notre équipe va vous recontacter." }
    }

    const resend = new Resend(resendApiKey)
    const configuredFrom = [process.env.RESEND_FROM_EMAIL_2, process.env.RESEND_FROM_EMAIL]
      .find((value) => value?.includes("@") && !value.includes("process.env"))
    const from = configuredFrom || defaultFrom

    const { error: adminError } = await resend.emails.send({
      from,
      to: [academyInbox],
      replyTo: email,
      subject: `Nouvelle demande d’admission — ${course}`,
      html: `<div style="margin:0;background:#f4f7fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#17324d"><div style="max-width:620px;margin:auto;overflow:hidden;border:1px solid #dce6ef;border-radius:16px;background:#fff"><div style="background:#0c6b72;padding:28px 32px;color:#fff"><div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85">Global Academy · Admissions</div><h1 style="margin:10px 0 0;font-size:26px;line-height:1.2">Nouvelle demande reçue</h1></div><div style="padding:32px"><p style="font-size:16px;line-height:1.6">Une nouvelle demande d’admission vient d’être enregistrée.</p><table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.5"><tbody><tr><td style="padding:12px 0;border-bottom:1px solid #e7eef3;color:#60758a">Apprenant</td><td style="padding:12px 0;border-bottom:1px solid #e7eef3;font-weight:bold;text-align:right">${escapeHtml(studentName)}</td></tr><tr><td style="padding:12px 0;border-bottom:1px solid #e7eef3;color:#60758a">Email</td><td style="padding:12px 0;border-bottom:1px solid #e7eef3;text-align:right"><a href="mailto:${escapeHtml(email)}" style="color:#0c6b72">${escapeHtml(email)}</a></td></tr><tr><td style="padding:12px 0;border-bottom:1px solid #e7eef3;color:#60758a">Téléphone d’appel</td><td style="padding:12px 0;border-bottom:1px solid #e7eef3;text-align:right">${escapeHtml(phone)}</td></tr><tr><td style="padding:12px 0;border-bottom:1px solid #e7eef3;color:#60758a">WhatsApp</td><td style="padding:12px 0;border-bottom:1px solid #e7eef3;text-align:right">${escapeHtml(whatsappPhone)}${whatsappSameAsPhone ? " (identique au téléphone d’appel)" : ""}</td></tr><tr><td style="padding:12px 0;border-bottom:1px solid #e7eef3;color:#60758a">Référence Global Academy</td><td style="padding:12px 0;border-bottom:1px solid #e7eef3;text-align:right">${escapeHtml(referenceName || "Non renseignée")}</td></tr><tr><td style="padding:12px 0;border-bottom:1px solid #e7eef3;color:#60758a">Dernier diplôme</td><td style="padding:12px 0;border-bottom:1px solid #e7eef3;text-align:right">${escapeHtml(lastDiploma || "Non renseigné")}</td></tr><tr><td style="padding:12px 0;color:#60758a">Formation</td><td style="padding:12px 0;font-weight:bold;text-align:right;color:#0c6b72">${escapeHtml(course)}</td></tr></tbody></table><div style="margin-top:24px;padding:18px 20px;background:#eef8f7;border-left:4px solid #0c6b72;border-radius:8px"><strong>Message du candidat</strong><p style="margin:8px 0 0;line-height:1.6">${escapeHtml(message || "Aucun message")}</p></div></div><div style="padding:18px 32px;background:#f7fafc;color:#60758a;font-size:12px;line-height:1.5">Global Academy · Centre de formation professionnelle agréé par le MINEFOP</div></div></div>`,
    }, { idempotencyKey: `registration-admin/${registration.id}` })

    const { error: applicantError } = await resend.emails.send({
      from: defaultFrom,
      to: [email],
      replyTo: academyInbox,
      subject: "Confirmation de réception de votre demande — Global Academy",
      html: confirmationEmail(studentName, course),
    }, { idempotencyKey: `registration-confirmation/${registration.id}` })

    if (adminError || applicantError) {
      console.error("[v0] Registration email delivery failed", {
        adminError: adminError?.message,
        applicantError: applicantError?.message,
        registrationId: registration.id,
        from,
      })
      return { success: false, message: "Votre demande a bien été enregistrée, mais l’email de confirmation n’a pas pu être envoyé. Notre équipe va vous recontacter prochainement." }
    }

    return { success: true, message: "Votre demande a bien été enregistrée. Un email de confirmation vous a été envoyé et notre équipe vous contactera prochainement pour la suite de la validation." }
  } catch (error) {
    return { success: false, message: getRegistrationErrorMessage(error) }
  }
}
