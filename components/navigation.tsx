"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { globalAcademyLogo as logo } from "@/components/site-brand"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = [{ name: "Accueil", href: "/" }, { name: "À propos", href: "/about" }, { name: "Programmes", href: "/programs" }, { name: "Admissions", href: "/admissions" }, { name: "Événements", href: "/events" }, { name: "Partenaires", href: "/partners" }, { name: "Contact", href: "/contact" }]
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-white/95 backdrop-blur"><div className="container mx-auto flex items-center justify-between px-6 py-3 lg:px-10"><Link href="/" className="flex items-center gap-3"><img src={logo} alt="Global Academy" className="h-12 w-12 object-contain" /><span className="font-serif text-xl font-bold tracking-tight text-forest">Global Academy<span className="block font-sans text-[10px] font-semibold uppercase tracking-[.24em] text-gold-dark">Former pour transformer</span></span></Link><nav className="hidden items-center gap-7 lg:flex">{navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-foreground/75 transition hover:text-forest">{item.name}</Link>)}<Link href="/register" className="rounded-md bg-forest px-5 py-2.5 text-sm font-bold text-white transition hover:bg-forest-light">Demander des informations</Link></nav><button className="rounded-md p-2 text-forest lg:hidden" aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button></div>{isOpen && <div className="border-t border-border bg-white px-6 py-4 lg:hidden">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block border-b border-border py-3 font-semibold text-forest">{item.name}</Link>)}<Link href="/register" onClick={() => setIsOpen(false)} className="mt-4 block rounded-md bg-forest px-5 py-3 text-center font-bold text-white">Demander des informations</Link></div>}</header>
}
