import { NextResponse } from "next/server"
import { ensureCertificatePdf, getCertificateByToken } from "@/lib/certificates"

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const certificate = await getCertificateByToken(token)
  if (!certificate) return NextResponse.json({ error: "Certificate not found" }, { status: 404 })
  const file = await ensureCertificatePdf(certificate)
  if (!file) return NextResponse.json({ error: "Certificate PDF unavailable" }, { status: 404 })
  return new NextResponse(file.stream, { headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="global-academy-${certificate.certificateNumber}.pdf"`, "Cache-Control": "private, no-cache" } })
}
