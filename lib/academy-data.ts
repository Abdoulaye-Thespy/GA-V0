export const academyPrograms = [
  { title: "Développeur d’Application (AWS)", diploma: "DQP — Diplôme de Qualification professionnelle", price: "250 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Développeur cloud junior", "Assistant DevOps", "Support applicatif à distance"] },
  { title: "Développeur Web", diploma: "DQP — Diplôme de Qualification professionnelle", price: "250 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Développeur front-end junior", "Intégrateur web", "Développeur freelance à distance"] },
  { title: "Graphiste de production", diploma: "DQP — Diplôme de Qualification professionnelle", price: "225 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Graphiste digital", "Designer de contenu", "Graphiste freelance à distance"] },
  { title: "Douane et Transit", diploma: "CQP — Certificat de Qualification professionnelle", price: "275 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Agent de transit", "Assistant import-export", "Coordinateur documentaire à distance"] },
  { title: "Transport et logistique", diploma: "CQP — Certificat de Qualification professionnelle", price: "175 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Assistant logistique", "Coordinateur transport", "Agent de suivi des expéditions"] },
  { title: "Secrétariat de Direction", diploma: "DQP — Diplôme de Qualification professionnelle", price: "165 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Assistant virtuel", "Office manager junior", "Assistant administratif à distance"] },
  { title: "Secrétariat de Bureautique", diploma: "DQP — Diplôme de Qualification professionnelle", price: "165 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Opérateur de saisie", "Assistant administratif", "Gestionnaire de documents à distance"] },
  { title: "Secrétariat Bilingue", diploma: "DQP — Diplôme de Qualification professionnelle", price: "165 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Assistant bilingue", "Customer support à distance", "Assistant de projet international"] },
] as const

export const academyAccreditation = "Arrêté/Order N° 000325 / MINFOP/SG/DFOP/SDGSF/CSACD/CBAC"

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

export const academyContact = { address: "920 Avenue de l’indépendance, Bonapriso, Douala, Cameroun BP 3861", email: "contact@globalacademy.freelanceconnect.cm", phone: "(+237) 693 526 747" }

export const dummyLearner = { email: "apprenant.demo@globalacademy.cm", password: "AI-Fluency-2026" }
