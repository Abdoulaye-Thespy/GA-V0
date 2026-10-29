"use client"

import { useState } from "react"

export function CertificateActions({ token, verificationUrl }: { token: string; verificationUrl: string }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}${verificationUrl}`)}`
  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}${verificationUrl}`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }
  return <div className="mt-6 grid gap-3 sm:grid-cols-3"><a href={`/api/certificates/${token}/pdf`} className="inline-flex min-h-12 items-center justify-center rounded-md bg-forest px-5 py-3 text-center text-sm font-bold text-white hover:bg-forest-light">Télécharger le PDF</a><a href={shareUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-md border border-forest px-5 py-3 text-center text-sm font-bold text-forest hover:bg-white">Partager sur LinkedIn</a><button type="button" onClick={copyLink} className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-white px-5 py-3 text-center text-sm font-bold text-forest">{copied ? "Lien copié" : "Copier le lien de vérification"}</button></div>
}
