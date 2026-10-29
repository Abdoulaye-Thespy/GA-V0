import { randomBytes } from "node:crypto"
import { get, put } from "@vercel/blob"
import { eq } from "drizzle-orm"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import QRCode from "qrcode"
import { db } from "@/lib/db"
import { academyAccreditation } from "@/lib/academy-data"
import { globalAcademyLogo } from "@/components/site-brand"
import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core"

export const certificates = pgTable("certificates", {
  id: uuid("id").primaryKey(), verificationToken: text("verification_token").notNull().unique(), certificateNumber: text("certificate_number").notNull().unique(), recipientName: text("recipient_name").notNull(), recipientEmail: text("recipient_email").notNull(), courseTitle: text("course_title").notNull(), courseSlug: text("course_slug").notNull(), certificateType: text("certificate_type").notNull(), issuedAt: timestamp("issued_at", { withTimezone: true }).notNull(), completedAt: timestamp("completed_at", { withTimezone: true }).notNull(), duration: text("duration"), issuerName: text("issuer_name").notNull(), issuerTitle: text("issuer_title").notNull(), accreditationText: text("accreditation_text").notNull(), status: text("status").notNull(), revokedAt: timestamp("revoked_at", { withTimezone: true }), revokedReason: text("revoked_reason"), pdfPathname: text("pdf_pathname"), pdfSize: integer("pdf_size"), pdfGenerationVersion: text("pdf_generation_version").notNull(), pdfGeneratedAt: timestamp("pdf_generated_at", { withTimezone: true }), createdAt: timestamp("created_at", { withTimezone: true }).notNull(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
})

export type Certificate = typeof certificates.$inferSelect

export async function getCertificateByToken(token: string) {
  const [certificate] = await db.select().from(certificates).where(eq(certificates.verificationToken, token)).limit(1)
  return certificate ?? null
}

function certificateUrl(token: string) {
  const origin = process.env.BETTER_AUTH_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "localhost:3000"
  return `${origin.startsWith("http") ? origin : `https://${origin}`}/verify/${token}`
}

export async function buildCertificatePdf(certificate: Certificate) {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([842, 595])
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const nameFont = await pdf.embedFont(StandardFonts.TimesRomanBoldItalic)
  const forest = rgb(0.07, 0.24, 0.22)
  const gold = rgb(0.78, 0.58, 0.18)
  const cream = rgb(0.97, 0.95, 0.89)

  page.drawRectangle({ x: 0, y: 0, width: 842, height: 595, color: cream })
  page.drawRectangle({ x: 22, y: 22, width: 798, height: 551, borderColor: forest, borderWidth: 2 })
  page.drawRectangle({ x: 34, y: 34, width: 774, height: 527, borderColor: gold, borderWidth: 1 })
  const logoResponse = await fetch(globalAcademyLogo)
  if (logoResponse.ok) {
    const logoImage = await pdf.embedJpg(await logoResponse.arrayBuffer())
    page.drawImage(logoImage, { x: 369, y: 492, width: 104, height: 42 })
  }
  page.drawText("CERTIFICAT DE RÉUSSITE", { x: 242, y: 440, size: 26, font: bold, color: forest })
  page.drawText("décerne ce certificat à", { x: 347, y: 397, size: 13, font: regular, color: forest })
  page.drawText(certificate.recipientName, { x: 421 - nameFont.widthOfTextAtSize(certificate.recipientName, 27) / 2, y: 348, size: 27, font: nameFont, color: gold })
  page.drawText(`pour avoir complété ${certificate.courseTitle}`, { x: 421 - regular.widthOfTextAtSize(`pour avoir complété ${certificate.courseTitle}`, 13) / 2, y: 309, size: 13, font: regular, color: forest })
  page.drawText(`N° ${certificate.certificateNumber}`, { x: 70, y: 85, size: 10, font: regular, color: forest })
  page.drawText(`Délivré le ${new Intl.DateTimeFormat("fr-FR").format(certificate.issuedAt)}`, { x: 70, y: 68, size: 10, font: regular, color: forest })
  page.drawText(certificate.issuerName, { x: 640, y: 85, size: 11, font: bold, color: forest })
  page.drawText(certificate.issuerTitle, { x: 640, y: 68, size: 9, font: regular, color: forest })
  page.drawText(certificate.accreditationText || academyAccreditation, { x: 70, y: 48, size: 7.5, font: regular, color: forest })
  const qr = await QRCode.toDataURL(certificateUrl(certificate.verificationToken), { margin: 1, width: 100 })
  const qrImage = await pdf.embedPng(qr)
  page.drawImage(qrImage, { x: 700, y: 405, width: 80, height: 80 })
  page.drawText("Vérifier", { x: 722, y: 392, size: 8, font: regular, color: forest })
  return pdf.save()
}

export async function ensureCertificatePdf(certificate: Certificate) {
  if (certificate.pdfPathname) {
    const existing = await get(certificate.pdfPathname, { access: "private" })
    if (existing) return existing
  }
  const bytes = await buildCertificatePdf(certificate)
  const blob = await put(`certificates/${certificate.id}/${certificate.certificateNumber}.pdf`, Buffer.from(bytes), { access: "private", contentType: "application/pdf", addRandomSuffix: false })
  await db.update(certificates).set({ pdfPathname: blob.pathname, pdfSize: bytes.byteLength, pdfGeneratedAt: new Date(), updatedAt: new Date() }).where(eq(certificates.id, certificate.id))
  return get(blob.pathname, { access: "private" })
}

export function createCertificateToken() {
  return randomBytes(24).toString("base64url")
}
