"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { globalAcademyLogo as logo } from "@/components/site-brand"

const primaryNavigation = [
  { name: "Accueil", href: "/" },
  { name: "Formations", href: "/programs" },
  { name: "Admissions", href: "/admissions" },
  { name: "Blog", href: "/blog" },
]

const organizationNavigation = [
  { name: "À propos", href: "/about" },
  { name: "Équipe", href: "/team" },
  { name: "Partenaires", href: "/partners" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOrganizationOpen, setIsOrganizationOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
    setIsOrganizationOpen(false)
  }

  return <header className="sticky top-0 z-50 border-b border-border/70 bg-white/95 backdrop-blur"><div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-10"><Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={closeMenu}><img src={logo} alt="Global Academy" className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12" /><span className="truncate font-serif text-base font-bold tracking-tight text-forest sm:text-xl">Global Academy<span className="block truncate font-sans text-[8px] font-semibold uppercase tracking-[.18em] text-gold-dark sm:text-[10px] sm:tracking-[.24em]">Former pour transformer</span></span></Link><nav className="hidden items-center gap-5 xl:flex">{primaryNavigation.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-foreground/75 transition hover:text-forest">{item.name}</Link>)}<div className="relative"><button type="button" onClick={() => setIsOrganizationOpen(!isOrganizationOpen)} aria-expanded={isOrganizationOpen} className="inline-flex items-center gap-1 text-sm font-semibold text-foreground/75 transition hover:text-forest">L&apos;académie <ChevronDown className={`size-4 transition-transform ${isOrganizationOpen ? "rotate-180" : ""}`} /></button>{isOrganizationOpen && <div className="absolute right-0 top-full mt-3 w-48 rounded-xl border border-border bg-white p-2 shadow-lg">{organizationNavigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOrganizationOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-forest hover:bg-sand">{item.name}</Link>)}</div>}</div><Link href="/login" className="text-sm font-bold text-forest">Connexion</Link><Link href="/register" className="rounded-md bg-forest px-4 py-2.5 text-sm font-bold text-white">Candidater</Link></nav><button className="rounded-md p-2 text-forest xl:hidden" aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button></div>{isOpen && <div className="border-t border-border bg-white px-4 py-4 sm:px-6 xl:hidden"><div className="grid gap-1">{primaryNavigation.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu} className="block border-b border-border py-3 font-semibold text-forest">{item.name}</Link>)}<button type="button" onClick={() => setIsOrganizationOpen(!isOrganizationOpen)} aria-expanded={isOrganizationOpen} className="flex w-full items-center justify-between border-b border-border py-3 text-left font-semibold text-forest">L&apos;académie <ChevronDown className={`size-4 transition-transform ${isOrganizationOpen ? "rotate-180" : ""}`} /></button>{isOrganizationOpen && <div className="grid gap-1 border-b border-border bg-sand/60 px-3 py-2">{organizationNavigation.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu} className="py-2 text-sm font-semibold text-forest">{item.name}</Link>)}</div>}</div><div className="mt-4 grid grid-cols-2 gap-3"><Link href="/login" onClick={closeMenu} className="rounded-md border border-forest px-4 py-3 text-center font-bold text-forest">Connexion</Link><Link href="/register" onClick={closeMenu} className="rounded-md bg-forest px-4 py-3 text-center font-bold text-white">Candidater</Link></div></div>}</header>
}
