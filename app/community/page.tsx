import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const communities = [
  { name: "Slack", description: "Échangez avec les apprenants, formateurs et professionnels de Global Academy.", label: "Rejoindre Slack" },
  { name: "Discord", description: "Participez aux discussions techniques, labs et sessions d’entraide.", label: "Rejoindre Discord" },
  { name: "WhatsApp", description: "Recevez les annonces et échangez rapidement avec la communauté.", label: "Rejoindre WhatsApp" },
]

export default function CommunityPage() {
  return <div className="min-h-screen bg-background"><Navigation /><main><section className="bg-forest px-6 py-16 text-white lg:px-10"><div className="container mx-auto max-w-5xl"><p className="eyebrow text-gold">Global Academy · Communauté</p><h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold sm:text-5xl">Rejoignez notre communauté</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Apprenez ensemble, reprenez les labs et échangez avec des personnes qui construisent leur avenir dans le numérique et l’intelligence artificielle.</p></div></section><section className="container mx-auto grid gap-5 px-6 py-12 sm:grid-cols-3 lg:px-10">{communities.map((community) => <article key={community.name} className="rounded-2xl border border-border bg-white p-6 shadow-sm"><div className="flex size-12 items-center justify-center rounded-xl bg-gold font-serif text-lg font-bold text-forest">{community.name[0]}</div><h2 className="mt-5 font-serif text-2xl font-bold text-forest">{community.name}</h2><p className="mt-3 leading-7 text-muted-foreground">{community.description}</p><button type="button" className="mt-6 w-full rounded-md border border-forest px-4 py-3 text-sm font-bold text-forest">{community.label}</button></article>)}</section></main><Footer /></div>
}
