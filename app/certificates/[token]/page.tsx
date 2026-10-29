import Link from "next/link"
import { notFound } from "next/navigation"
import { getCertificateByToken } from "@/lib/certificates"
import { CertificateActions } from "@/components/certificate-actions"
import { globalAcademyLogo } from "@/components/site-brand"
import { academyAccreditation } from "@/lib/academy-data"

export default async function CertificatePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const certificate = await getCertificateByToken(token)
  if (!certificate) notFound()
  const verificationUrl = `/verify/${certificate.verificationToken}`
  return <main className="min-h-screen bg-sand px-4 py-8 sm:px-6 sm:py-14"><div className="mx-auto max-w-4xl"><Link href={verificationUrl} className="text-sm font-bold text-forest underline">← Vérifier ce certificat</Link><section className="mt-6 overflow-hidden rounded-2xl border-2 border-forest bg-[#f8f3e5] p-6 text-center shadow-lg sm:p-14"><img src={globalAcademyLogo} alt="Logo Global Academy" className="mx-auto h-16 w-auto object-contain sm:h-20" /><p className="mt-8 font-serif text-3xl font-bold text-forest sm:text-5xl">Certificat de réussite</p><p className="mt-8 text-sm text-muted-foreground">Ce certificat est décerné à</p><h1 className="mt-3 break-words font-serif text-2xl font-bold text-gold-dark sm:text-4xl">{certificate.recipientName}</h1><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-forest">pour avoir complété avec succès <strong>{certificate.courseTitle}</strong>.</p><div className="mt-10 grid gap-4 border-t border-forest/15 pt-6 text-sm text-muted-foreground sm:grid-cols-3"><p>N° {certificate.certificateNumber}</p><p>{new Intl.DateTimeFormat("fr-FR").format(certificate.issuedAt)}</p><p>{certificate.issuerName}</p></div><p className="mt-6 text-xs font-semibold text-forest/70">{certificate.accreditationText || academyAccreditation}</p></section><CertificateActions token={token} verificationUrl={verificationUrl} /></div></main>
}
