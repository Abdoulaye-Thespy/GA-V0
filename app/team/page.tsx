import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Award, Quote, Users } from "lucide-react"

const team = [
  {
    name: "Njigouh Abdoulaye Razak",
    role: "Co-fondateur & Directeur",
    image: "/team/profiledirecteur.png",
    expertise: "Computer Science Engineer (Cloud & DevOps) | AI Safety & Red Teaming Practitioner | AI Trainer (Fine-Tuning, Safety…) & Technical Educator | Helping Teams Build & Learn with AI",
    linkedin: "https://www.linkedin.com/in/njigouh-abdoulaye-razak/",
  },
  {
    name: "Alhadji Ali Garba",
    role: "Responsable de suivi",
    image: "/team/suivi.png",
    expertise: "Développeur Cloud, avec une expertise en Excel et maintenance informatique. Un encadreur attentif, engagé dans le suivi et la réussite des apprenants.",
  },
  {
    role: "Responsable de communication",
    expertise: "Valorisation des initiatives de Global Academy, information de la communauté et rayonnement de nos actions.",
  },
]

function ProfileImage({ src, alt }: { src?: string, alt: string }) {
  if (src) return <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
  return <div className="flex aspect-[4/5] items-center justify-center bg-forest/10"><Users className="h-14 w-14 text-forest opacity-35" aria-hidden="true" /></div>
}

export default function TeamPage() {
  return <div className="min-h-screen bg-background"><Navigation /><main>
    <section className="bg-forest px-6 py-20 text-white md:py-28"><div className="container mx-auto lg:px-10"><p className="eyebrow text-gold">Les femmes et les hommes de Global Academy</p><h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold md:text-6xl">Une équipe engagée pour <span className="text-gold">faire grandir les talents.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Chaque jour, notre équipe met son expertise et son énergie au service d&apos;une formation exigeante, humaine et tournée vers l&apos;avenir.</p></div></section>

    <section className="container mx-auto px-6 py-20 lg:px-10"><div className="grid items-center gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-16"><div className="relative min-h-[430px] overflow-hidden rounded-2xl border-8 border-white bg-white shadow-xl md:min-h-[560px]"><img src="/team/promoteur.jpeg" alt="HC Nsangou Mbombo Zounedou, promoteur de Global Academy" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest via-forest/75 to-transparent p-7 pt-32"><p className="text-sm font-bold uppercase tracking-[.18em] text-gold">Le promoteur</p><p className="mt-2 font-serif text-3xl font-bold text-white">HC Nsangou Mbombo Zounedou</p></div></div><div><p className="eyebrow">Notre promoteur</p><h2 className="mt-3 font-serif text-4xl font-bold text-forest md:text-5xl">HC Nsangou Mbombo Zounedou</h2><p className="mt-3 text-lg font-semibold text-gold-dark">Promoteur de Global Academy</p><div className="mt-7 border-l-4 border-gold pl-6"><Quote className="h-7 w-7 text-gold-dark" /><p className="mt-4 text-lg leading-8 text-muted-foreground">Porter une ambition qui transforme : offrir à chaque apprenant un cadre solide, des repères justes et des opportunités concrètes pour s&apos;exprimer.</p></div><ul className="mt-8 grid gap-3 text-muted-foreground"><li className="flex gap-3"><Award className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />Honorary Consul of Bangladesh in Cameroon</li><li className="flex gap-3"><Award className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />Logistics Expert And International Trade</li><li className="flex gap-3"><Award className="mt-1 h-5 w-5 shrink-0 text-gold-dark" />Knight of the Order of Valour</li></ul></div></div></section>

    <section className="bg-cream"><div className="container mx-auto px-6 py-20 lg:px-10"><div className="max-w-2xl"><p className="eyebrow">L&apos;équipe</p><h2 className="mt-3 font-serif text-4xl font-bold text-forest md:text-5xl">Des expertises réunies autour des apprenants.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Une équipe complémentaire qui veille à la qualité de chaque expérience au sein de Global Academy.</p></div><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{team.map((member) => <article key={member.role} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"><div className="aspect-[4/5] overflow-hidden"><ProfileImage src={member.image} alt={member.name ? `Portrait de ${member.name}` : "Portrait du responsable de communication"} /></div><div className="p-6"><p className="text-sm font-bold uppercase tracking-[.15em] text-gold-dark">Global Academy</p><h3 className="mt-3 font-serif text-2xl font-bold text-forest">{member.name && <span className="block text-xl">{member.name}</span>}{member.role}</h3><p className="mt-3 leading-7 text-muted-foreground">{member.expertise}</p>{member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="mt-5 inline-flex font-bold text-forest transition hover:text-gold-dark">Voir le profil LinkedIn <span aria-hidden="true">↗</span></a>}</div></article>)}</div></div></section>
  </main><Footer /></div>
}
