import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

// Métadonnées SEO pour le site
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" })

export const metadata: Metadata = {
  title: "Global Academy | École vocationnelle au Cameroun",
  description:
    "Global Academy, école vocationnelle avec accord du MINFOP, prépare les jeunes aux métiers du numérique, de la logistique et du travail à distance.",
  // Ajout d'options supplémentaires recommandées
  openGraph: {
    title: "Global Academy | Former pour transformer",
    description:
      "Global Academy accompagne chaque apprenant vers l'excellence, l'autonomie et l'ouverture sur le monde.",
    type: "website",
  },
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} bg-background`}>
      <body>
        {children}
      </body>
    </html>
  )
}
