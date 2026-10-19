import Link from "next/link"
import { notFound } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { academyAccreditation, academyPrograms, freeShortCourses } from "@/lib/academy-data"

const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export function generateStaticParams() {
  return [...academyPrograms, ...freeShortCourses].map((course) => ({ slug: slugify(course.title) }))
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = [...academyPrograms, ...freeShortCourses].find((item) => slugify(item.title) === slug)
  if (!course) notFound()

  const isFree = "description" in course
  const description = isFree
    ? course.description
    : `Un parcours Global Academy conçu pour développer des compétences directement mobilisables en présentiel et à distance, avec une certification signée par Global Academy, institution agréée par le MINEFOP.`
  const diplomaDetails = !isFree
    ? course.diploma.startsWith("DQP")
      ? `Le DQP (Diplôme de Qualification Professionnelle) en ${course.title} est un diplôme national délivré au Cameroun sous la tutelle du Ministère de l'Emploi et de la Formation Professionnelle (MINEFOP).`
      : course.diploma.startsWith("CQP")
        ? `Le CQP (Certificat de Qualification Professionnelle) en ${course.title} est une certification professionnelle délivrée au Cameroun sous la tutelle du Ministère de l'Emploi et de la Formation Professionnelle (MINEFOP).`
        : `Cette certification professionnelle est délivrée par Global Academy, institution agréée par le MINEFOP, pour attester les compétences acquises dans le parcours ${course.title}.`
    : null

  return <div className="min-h-screen bg-background"><Navigation /><main>
    <section className="bg-forest px-6 py-20 text-white md:py-28"><div className="container mx-auto max-w-5xl lg:px-10"><Link href="/programs" className="text-sm font-semibold text-gold hover:underline">← Retour aux formations</Link><p className="eyebrow mt-10 text-gold">{isFree ? course.format : course.diploma}</p><h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold md:text-6xl">{course.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{description}</p><div className="mt-8 flex flex-wrap gap-3"><span className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-forest">{course.price}</span><span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">Certification Global Academy</span></div></div></section>
    {diplomaDetails && <section className="border-b border-border bg-white px-6 py-8"><div className="container mx-auto max-w-5xl rounded-xl border border-gold/30 bg-gold/10 p-6 lg:px-10"><p className="eyebrow text-gold-dark">Diplôme obtenu</p><p className="mt-3 max-w-4xl text-base leading-7 text-forest">{diplomaDetails}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">La formation comprend également le prompt engineering comme compétence transversale, ainsi que les compléments pédagogiques indiqués dans le programme.</p></div></section>}
    <section className="container mx-auto grid gap-8 px-6 py-12 lg:grid-cols-[1.2fr_.8fr] lg:px-10 lg:py-16"><div className="rounded-xl border border-border bg-white p-7 shadow-sm md:p-10"><p className="eyebrow text-gold-dark">Ce que vous allez apprendre</p><h2 className="mt-3 font-serif text-3xl font-bold text-forest">Un parcours concret et applicable</h2><ul className="mt-7 flex flex-col gap-4 text-muted-foreground">{(isFree ? [course.description, "Des méthodes simples à réutiliser dans vos études ou votre activité", "Une validation des acquis et une certification selon le format"] : ["Les fondamentaux et les outils du métier", "Des mises en pratique guidées et des situations professionnelles", "Le prompt engineering, intégré comme compétence transversale", "Les bonnes pratiques pour travailler en présentiel et à distance", "Une certification signée par Global Academy, institution agréée par le MINEFOP"]).map((item) => <li key={item} className="flex gap-3"><span className="mt-2 size-2 shrink-0 rounded-full bg-gold" />{item}</li>)}</ul></div><aside className="rounded-xl bg-sand p-7 md:p-10"><p className="eyebrow text-gold-dark">Débouchés</p><h2 className="mt-3 font-serif text-2xl font-bold text-forest">En présentiel et à distance</h2><ul className="mt-6 flex flex-col gap-4 text-sm leading-6 text-muted-foreground">{course.jobs.map((job) => <li key={job} className="border-b border-forest/10 pb-3 font-semibold text-forest">{job}</li>)}</ul><div className="mt-8 border-t border-forest/15 pt-6"><p className="text-sm leading-6 text-muted-foreground">Vous souhaitez recevoir les prochaines dates et modalités ?</p><Link href="/register" className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-forest px-4 py-3 text-sm font-bold text-white hover:bg-forest-light">Demander des informations</Link></div></aside></section>
    <section className="bg-sand px-6 py-12"><div className="container mx-auto max-w-5xl lg:px-10"><p className="text-sm leading-7 text-forest"><strong>Engagement institutionnel.</strong> Les certifications sont signées par Global Academy, centre de formation professionnelle agréé par le MINEFOP — {academyAccreditation}.</p></div></section>
  </main><Footer /></div>
}
