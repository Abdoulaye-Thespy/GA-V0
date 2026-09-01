export const academyPrograms = [
  { title: "Développeur d’Application (AWS)", price: "250 000 CFA", mode: "Présentiel, live ou à la demande" },
  { title: "Développeur Web", price: "250 000 CFA", mode: "Présentiel, live ou à la demande" },
  { title: "Graphiste de production", price: "225 000 CFA", mode: "Présentiel, live ou à la demande" },
  { title: "Douane et Transit", price: "275 000 CFA", mode: "Présentiel, live ou à la demande" },
  { title: "Transport et logistique", price: "175 000 CFA", mode: "Présentiel, live ou à la demande" },
  { title: "Secrétariat de Direction", price: "165 000 CFA", mode: "Présentiel, live ou à la demande" },
  { title: "Secrétariat de Bureautique", price: "165 000 CFA", mode: "Présentiel, live ou à la demande" },
  { title: "Secrétariat Bilingue", price: "165 000 CFA", mode: "Présentiel, live ou à la demande" },
] as const

export const partners = [
  { name: "FreelanceConnect", href: "https://freelanceconnect.cm", text: "Préparation au freelance, au travail à distance et à la relation client en ligne." },
  { name: "Global Logistics LTD", href: "https://globallogistics.cm", text: "Un partenaire métier pour rapprocher la formation des réalités de la logistique." },
  { name: "Anthropic Academy", href: "https://www.anthropic.com", text: "Formation partenaire autour de l’AI Fluency et de l’usage responsable de l’IA." },
] as const

export const aiFluencyLessons = [
  { id: "lesson-1", title: "Comprendre l’intelligence artificielle", description: "Capacités, limites et bons réflexes pour commencer.", videoId: "aqz-KE-bpKQ", quiz: [{ question: "Que faut-il vérifier avant de faire confiance à une réponse IA ?", options: ["La source et le contexte", "La couleur de l’interface", "Le nombre de mots"], answer: 0 }] },
  { id: "lesson-2", title: "Formuler une demande efficace", description: "Donner un rôle, un objectif et un contexte utiles.", videoId: "ScMz Ivory", quiz: [{ question: "Quel élément rend une consigne plus utile ?", options: ["Un objectif clair", "Plus de majuscules", "Un texte très vague"], answer: 0 }] },
  { id: "lesson-3", title: "L’IA avec responsabilité", description: "Confidentialité, vérification et décision humaine.", videoId: "M7lc1UVf-VE", quiz: [{ question: "Quelle pratique est recommandée ?", options: ["Partager des données sensibles", "Vérifier les résultats", "Automatiser chaque décision"], answer: 1 }] },
] as const

export const academyContact = { address: "920 Avenue de l’indépendance, Bonapriso, Douala, Cameroun", email: "contact@globalacademy.cm", phone: "(+237) 620 224 288" }

export const dummyLearner = { email: "apprenant.demo@globalacademy.cm", password: "AI-Fluency-2026" }
