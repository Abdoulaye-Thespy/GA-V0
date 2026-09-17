import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Quote, Users } from "lucide-react"

const team = [
  { role: "Co-fondateur & Directeur", focus: "Vision stratégique et direction générale" },
  { role: "Responsable de suivi", focus: "Accompagnement et réussite des apprenants" },
  { role: "Responsable pédagogique", focus: "Qualité des parcours et de l'apprentissage" },
]

function ProfilePlaceholder({ large = false }: { large?: boolean }) {
  return <div className={`flex items-center justify-center bg-forest/10 ${large ? "min-h-[360px] md:min-h-[480px]" : "aspect-[4/5]"}`}><Users className={`${large ? "h-24 w-24" : "h-14 w-14"} text-forest opacity-35`} aria-hidden="true" /></div>
}

export default function TeamPage() {
  return <div className="min-h-screen bg-background"><Navigation /><main>
    <section className="bg-forest px-6 py-20 text-white md:py-28"><div className="container mx-auto lg:px-10"><p className="eyebrow text-gold">Les femmes et les hommes de Global Academy</p><h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold md:text-6xl">Une équipe engagée pour <span className="text-gold">faire grandir les talents.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Chaque jour, notre équipe met son expertise et son énergie au service d&apos;une formation exigeante, humaine et tournée vers l&apos;avenir.</p></div></section>
    <section className="container mx-auto px-6 py-20 lg:px-10"><div className="grid items-center gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-16"><div className="relative overflow-hidden rounded-2xl border-8 border-white bg-white shadow-xl"><ProfilePlaceholder large /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent p-7 pt-24"><p className="text-sm font-bold uppercase tracking-[.18em] text-gold">Le promoteur</p><p className="mt-2 font-serif text-3xl font-bold text-white">La vision au service de l&apos;avenir.</p></div></div><div><p className="eyebrow">Notre promoteur</p><h2 className="mt-3 font-serif text-4xl font-bold text-forest md:text-5xl">Porter une ambition qui transforme.</h2><div className="mt-7 border-l-4 border-gold pl-6"><Quote className="h-7 w-7 text-gold-dark" /><p className="mt-4 text-lg leading-8 text-muted-foreground">Global Academy est née de la conviction que chaque talent mérite un cadre solide, des repères justes et des opportunités concrètes pour s&apos;exprimer.</p></div><p className="mt-7 leading-8 text-muted-foreground">Sous son impulsion, l&apos;Académie rassemble une équipe attentive aux parcours de chacun et engagée pour une formation qui ouvre des perspectives durables.</p></div></div></section>
    <section className="bg-cream"><div className="container mx-auto px-6 py-20 lg:px-10"><div className="max-w-2xl"><p className="eyebrow">L&apos;équipe</p><h2 className="mt-3 font-serif text-4xl font-bold text-forest md:text-5xl">Des expertises réunies autour des apprenants.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Une équipe complémentaire qui veille à la qualité de chaque expérience au sein de Global Academy.</p></div><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{team.map((member) => <article key={member.role} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"><ProfilePlaceholder /><div className="p-6"><p className="text-sm font-bold uppercase tracking-[.15em] text-gold-dark">Global Academy</p><h3 className="mt-3 font-serif text-2xl font-bold text-forest">{member.role}</h3><p className="mt-3 leading-7 text-muted-foreground">{member.focus}</p></div></article>)}</div></div></section>
  </main><Footer /></div>
}
