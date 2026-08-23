import type { Metadata } from "next"
import "./globals.css"
import ChatbotWidget from "@/components/chatbot-widget"

export const metadata: Metadata = { title: "Global Academy | Former pour transformer", description: "Global Academy accompagne chaque apprenant vers l'excellence, l'autonomie et l'ouverture sur le monde." }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr" className="bg-background"><body>{children}<ChatbotWidget /></body></html> }
