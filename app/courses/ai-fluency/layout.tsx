import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Fluency | Cours en ligne | Global Academy",
  description: "Parcours en ligne pratique pour comprendre l’intelligence artificielle, vérifier ses résultats et l’utiliser avec responsabilité.",
  alternates: { canonical: "/courses/ai-fluency" },
  openGraph: { title: "AI Fluency | Global Academy", description: "Un parcours pratique pour mieux comprendre et utiliser l’IA.", type: "article", url: "/courses/ai-fluency" },
}

export default function AiFluencyLayout({ children }: { children: React.ReactNode }) {
  return children
}
