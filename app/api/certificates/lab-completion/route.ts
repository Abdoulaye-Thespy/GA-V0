import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { certificates, createCertificateToken } from "@/lib/certificates"
import { academyAccreditation } from "@/lib/academy-data"
import { sanitizeCertificateName } from "@/lib/certificate-validation"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = sanitizeCertificateName(body.name)
    if (!name) return NextResponse.json({ error: "Indiquez un nom complet valide." }, { status: 400 })
    const now = new Date()
    const token = createCertificateToken()
    const certificateNumber = `GA-LLM-${now.getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`
    await db.insert(certificates).values({ id: randomUUID(), verificationToken: token, certificateNumber, recipientName: name, recipientEmail: "lab-participant@globalacademy.local", courseTitle: "Faire tourner un petit LLM en local avec Docker et Ollama", courseSlug: "local-llm-docker-ollama", certificateType: "lab", issuedAt: now, completedAt: now, duration: "Lab pratique", issuerName: "Global Academy", issuerTitle: "Direction académique", accreditationText: academyAccreditation, status: "valid", pdfGenerationVersion: "v1", createdAt: now, updatedAt: now })
    return NextResponse.json({ token })
  } catch {
    return NextResponse.json({ error: "Le certificat n’a pas pu être créé. Réessayez." }, { status: 500 })
  }
}
