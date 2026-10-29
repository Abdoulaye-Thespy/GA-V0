"use client"

import { createContext, useContext, useState } from "react"

const TOTAL_STEPS = 6
const LabCompletionContext = createContext<{ completed: boolean[]; toggle: (index: number, checked: boolean) => void }>({ completed: Array(TOTAL_STEPS).fill(false), toggle: () => {} })

export function LabCompletionProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<boolean[]>(Array(TOTAL_STEPS).fill(false))
  function toggle(index: number, checked: boolean) {
    setCompleted((current) => { const next = [...current]; next[index] = checked; return next })
  }
  return <LabCompletionContext.Provider value={{ completed, toggle }}>{children}</LabCompletionContext.Provider>
}

export function LabStepCheckbox({ index }: { index: number }) {
  const { completed, toggle } = useContext(LabCompletionContext)
  return <label className={`mt-6 flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${completed[index] ? "border-gold bg-gold/10" : "border-forest/10 bg-sand/70 hover:border-gold/60"}`}><input type="checkbox" checked={completed[index]} onChange={(event) => toggle(index, event.target.checked)} className="size-5 shrink-0 accent-[#0d4b45]" /><span className="text-sm font-semibold text-forest">{completed[index] ? "Étape validée" : "J’ai terminé cette étape"}</span><span className="ml-auto text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">{index + 1}/{TOTAL_STEPS}</span></label>
}

export function LabCompletion() {
  const { completed } = useContext(LabCompletionContext)
  const [name, setName] = useState("")
  const [certificateToken, setCertificateToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const allDone = completed.every(Boolean)
  async function issueCertificate() {
    if (!allDone || name.trim().length < 2) return
    setLoading(true); setError("")
    try { const response = await fetch("/api/certificates/lab-completion", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim() }) }); const payload = await response.json(); if (!response.ok) throw new Error(payload.error || "Impossible de générer le certificat."); setCertificateToken(payload.token) } catch (caught) { setError(caught instanceof Error ? caught.message : "Une erreur est survenue.") } finally { setLoading(false) }
  }
  const certificateUrl = certificateToken ? `/certificates/${certificateToken}` : ""
  const linkedinUrl = certificateToken ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}${certificateUrl}`)}` : "#"
  return <section className="bg-forest px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-10"><div className="container mx-auto max-w-5xl"><p className="eyebrow text-gold">Dernière étape</p><h2 className="mt-3 max-w-3xl font-serif text-2xl font-bold sm:text-3xl">Votre certificat de completion</h2><p className="mt-4 max-w-2xl leading-7 text-white/75">Toutes les étapes sont-elles validées ? Indiquez votre nom pour générer votre certificat.</p><div className="mt-7 rounded-2xl bg-white p-5 text-forest sm:p-7"><label htmlFor="certificate-name" className="text-sm font-bold">Nom à afficher sur le certificat</label><input id="certificate-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Votre nom complet" className="mt-2 min-h-12 w-full rounded-md border border-border bg-white px-4 py-3 text-forest outline-none focus:border-gold" /><button type="button" disabled={!allDone || name.trim().length < 2 || loading} onClick={issueCertificate} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-forest-light disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto">{loading ? "Génération en cours..." : "Générer mon certificat"}</button>{!allDone && <p className="mt-3 text-sm text-muted-foreground">Validez les étapes ci-dessus pour activer le certificat.</p>}{error && <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>}{certificateToken && <div className="mt-6 border-t border-border pt-5"><p className="font-bold text-forest">Félicitations, votre certificat est prêt.</p><div className="mt-4 flex flex-col gap-3 sm:flex-row"><a href={certificateUrl} className="inline-flex min-h-11 items-center justify-center rounded-md bg-gold px-4 py-2 text-center text-sm font-bold text-forest">Voir et télécharger le certificat</a><a href={linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-md border border-forest px-4 py-2 text-center text-sm font-bold text-forest">Partager sur LinkedIn</a></div></div>}</div></div></section>
}
