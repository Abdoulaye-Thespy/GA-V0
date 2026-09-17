import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowUpRight, Handshake, Lightbulb, Globe2 } from "lucide-react"

const partnerTypes = [
  { name: "Partenaires académiques", text: "Des institutions qui partagent notre exigence et enrichissent nos parcours.", icon: Lightbulb },
  { name: "Partenaires professionnels", text: "Des entreprises qui ouvrent aux apprenants les portes du monde réel.", icon: Handshake },
  { name: "Réseau international", text: "Une ouverture sur les idées, les cultures et les opportunités au-delà des frontières.", icon: Globe2 },
]

const professionalPartners = [
  { name: "FreelanceConnect", logo: "/partners/freelanceconnect.svg", description: "Un partenaire dédié au développement des compétences freelance, à la collaboration à distance et à l'entrepreneuriat numérique." },
  { name: "Global Logistics Ltd", logo: "/partners/global-logistics.svg", description: "Un partenaire métier qui rapproche les apprenants des réalités opérationnelles du transport et de la logistique." },
]

export default function PartnersPage() {
  return <div className="min-h-screen bg-background"><Navigation /><main>
   
    <section className="bg-forest px-6 py-20 text-white md:py-28"><div className="container mx-auto lg:px-10"><p className="eyebrow text-gold">Un réseau qui fait la différence</p><h1 className="mt-4 max-w-3xl font-serif text-5xl font-bold md:text-6xl">Nos <span className="text-gold">partenaires.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-white/70">Nous avançons avec des organisations engagées pour offrir le meilleur à notre communauté.</p></div></section>
    <section className="bg-cream"><div className="container mx-auto px-6 py-20 lg:px-10"><div className="max-w-2xl"><p className="eyebrow">Partenaires professionnels</p><h2 className="mt-3 font-serif text-4xl font-bold text-forest md:text-5xl">Des liens concrets avec le monde professionnel.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Ces collaborations donnent à nos apprenants un accès direct aux expériences, aux pratiques et aux opportunités de leur secteur.</p></div><div className="mt-12 grid gap-6 md:grid-cols-2">{professionalPartners.map((partner) => <article key={partner.name} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"><div className="flex h-56 items-center justify-center border-b border-border bg-white p-8"><img src={partner.logo} alt={`Logo ${partner.name}`} className="max-h-full w-full object-contain" /></div><div className="p-7"><p className="text-sm font-bold uppercase tracking-[.18em] text-gold-dark">Partenaire professionnel</p><h3 className="mt-3 font-serif text-2xl font-bold text-forest">{partner.name}</h3><p className="mt-3 leading-7 text-muted-foreground">{partner.description}</p></div></article>)}</div></div></section>
    <section className="container mx-auto px-6 py-20 lg:px-10"><div className="grid gap-6 md:grid-cols-3">{partnerTypes.map(({ name, text, icon: Icon }) => <article key={name} className="rounded-xl border border-border bg-white p-7"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/20 text-forest"><Icon /></div><h2 className="mt-7 font-serif text-2xl font-bold text-forest">{name}</h2><p className="mt-3 leading-7 text-muted-foreground">{text}</p><a href="/contact" className="mt-7 inline-flex items-center gap-2 font-bold text-forest">Devenir partenaire <ArrowUpRight className="h-4 w-4" /></a></article>)}</div></section>
    </main><Footer /></div>
}
