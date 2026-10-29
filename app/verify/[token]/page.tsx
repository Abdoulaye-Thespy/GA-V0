import Link from "next/link"
import { notFound } from "next/navigation"
import { getCertificateByToken } from "@/lib/certificates"

export default async function VerifyCertificate({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const certificate = await getCertificateByToken(token)
  if (!certificate) notFound()
  const valid = certificate.status === "valid"
  return <main className="min-h-screen bg-sand px-4 py-10 sm:px-6 sm:py-16"><div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-10"><p className="eyebrow text-gold-dark">Global Academy · Vérification</p><div className={`mt-6 rounded-xl p-5 ${valid ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}><p className="text-sm font-bold uppercase tracking-[.16em]">{valid ? "Certificat valide" : "Certificat révoqué"}</p><h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">{certificate.courseTitle}</h1></div><dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-muted-foreground">Titulaire</dt><dd className="mt-1 font-bold text-forest">{certificate.recipientName}</dd></div><div><dt className="text-muted-foreground">Numéro</dt><dd className="mt-1 font-bold text-forest">{certificate.certificateNumber}</dd></div><div><dt className="text-muted-foreground">Délivré le</dt><dd className="mt-1 font-bold text-forest">{new Intl.DateTimeFormat("fr-FR").format(certificate.issuedAt)}</dd></div><div><dt className="text-muted-foreground">Émetteur</dt><dd className="mt-1 font-bold text-forest">{certificate.issuerName}</dd></div></dl><Link href={`/certificates/${token}`} className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-forest px-5 py-3 text-sm font-bold text-white hover:bg-forest-light">Voir le certificat</Link></div></main>
}
