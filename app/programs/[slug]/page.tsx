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
    : `Un parcours Global Academy conçu pour développer des compétences directement mobilisables en présentiel et à distance.`
  const diplomaDetails = !isFree
    ? course.diploma.startsWith("DQP")
      ? `Le DQP (Diplôme de Qualification Professionnelle) en ${course.title} est un diplôme national délivré au Cameroun sous la tutelle du Ministère de l’Emploi et de la Formation Professionnelle (MINEFOP).`
      : course.diploma.startsWith("CQP")
        ? `Le CQP (Certificat de Qualification Professionnelle) en ${course.title} est une certification professionnelle délivrée au Cameroun sous la tutelle du Ministère de l’Emploi et de la Formation Professionnelle (MINEFOP).`
        : null
    : null
  const shortCourseDetails = isFree
    ? `Engagement institutionnel. Les certifications sont signées par Global Academy, centre de formation professionnelle agréé par le MINEFOP — ${academyAccreditation}.`
    : null

  return <div className="min-h-screen bg-background"><Navigation /><main>
    <section className="bg-forest px-4 py-12 text-white sm:px-6 sm:py-16 md:py-24"><div className="container mx-auto max-w-5xl lg:px-10"><Link href="/programs" className="text-sm font-semibold text-gold hover:underline">← Retour aux formations</Link><p className="eyebrow mt-8 text-gold">{isFree ? course.format : course.diploma}</p><h1 className="mt-4 max-w-4xl break-words font-serif text-3xl font-bold sm:text-4xl md:text-6xl">{course.title}</h1><p className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">{description}</p><div className="mt-8 flex flex-wrap gap-3"><span className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-forest">{course.price}</span><span className="max-w-full break-words rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">{isFree ? "Certification Global Academy" : course.diploma}</span></div></div></section>
    {diplomaDetails && <section className="border-b border-border bg-white px-6 py-8"><div className="container mx-auto max-w-5xl rounded-xl border border-gold/30 bg-gold/10 p-6 lg:px-10"><p className="eyebrow text-gold-dark">Diplôme obtenu</p><p className="mt-3 max-w-4xl text-base leading-7 text-forest">{diplomaDetails}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">La formation comprend également les compléments pédagogiques indiqués dans le programme.</p></div></section>}
    <section className="container mx-auto grid min-w-0 gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 lg:grid-cols-[1.2fr_.8fr] lg:px-10 lg:py-16"><div className="min-w-0 rounded-xl border border-border bg-white p-5 shadow-sm sm:p-7 md:p-10"><p className="eyebrow text-gold-dark">Ce que vous allez apprendre</p><h2 className="mt-3 font-serif text-2xl font-bold text-forest sm:text-3xl">Un parcours concret et applicable</h2><ul className="mt-7 flex flex-col gap-4 text-muted-foreground">{(isFree ? [course.description, "Des méthodes simples à réutiliser dans vos études ou votre activité", "Une validation des acquis et une certification selon le format"] : ["Les fondamentaux et les outils du métier", "Des mises en pratique guidées et des situations professionnelles", "Les bonnes pratiques pour travailler en présentiel et à distance"]).map((item) => <li key={item} className="flex min-w-0 gap-3"><span className="mt-2 size-2 shrink-0 rounded-full bg-gold" /><span className="min-w-0 break-words">{item}</span></li>)}</ul></div><aside className="min-w-0 rounded-xl bg-sand p-5 sm:p-7 md:p-10"><p className="eyebrow text-gold-dark">Débouchés</p><h2 className="mt-3 font-serif text-xl font-bold text-forest sm:text-2xl">En présentiel et à distance</h2><ul className="mt-6 flex flex-col gap-4 text-sm leading-6 text-muted-foreground">{course.jobs.map((job) => <li key={job} className="break-words border-b border-forest/10 pb-3 font-semibold text-forest">{job}</li>)}</ul><div className="mt-8 border-t border-forest/15 pt-6"><p className="text-sm leading-6 text-muted-foreground">Vous souhaitez recevoir les prochaines dates et modalités ?</p><Link href={`/register?course=${encodeURIComponent(course.title)}`} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-forest px-4 py-3 text-center text-sm font-bold text-white hover:bg-forest-light">S’inscrire</Link></div></aside></section>
    {shortCourseDetails && <section className="border-t border-border bg-sand px-6 py-12"><div className="container mx-auto max-w-5xl lg:px-10"><p className="text-sm leading-7 text-forest">{shortCourseDetails}</p></div></section>}
  </main><Footer /></div>
}
