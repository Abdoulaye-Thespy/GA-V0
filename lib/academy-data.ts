export const academyPrograms = [
  { title: "Développeur d’Application (AWS)", diploma: "DQP — Diplôme de Qualification professionnelle", price: "250 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Développeur cloud junior", "Assistant DevOps", "Support applicatif à distance"] },
  { title: "Développeur Web", diploma: "DQP — Diplôme de Qualification professionnelle", price: "250 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Développeur front-end junior", "Intégrateur web", "Développeur freelance à distance"] },
  { title: "Graphiste de production", diploma: "DQP — Diplôme de Qualification professionnelle", price: "225 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Graphiste digital", "Designer de contenu", "Graphiste freelance à distance"] },
  { title: "Douane et Transit", diploma: "CQP — Certificat de Qualification professionnelle", price: "275 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Agent de transit", "Assistant import-export", "Coordinateur documentaire à distance"] },
  { title: "Transport et logistique", diploma: "CQP — Certificat de Qualification professionnelle", price: "175 000 CFA", mode: "Présentiel, live ou à la demande", jobs: ["Assistant logistique", "Coordinateur transport", "Agent de suivi des expéditions"] },
  { title: "AI Fluency pour étudiants", diploma: "Short course gratuit — Culture et usages responsables de l’IA", price: "Gratuit", mode: "En ligne, à la demande", jobs: ["Assistant de recherche augmenté par l’IA", "Créateur de contenu junior", "Assistant virtuel freelance"] },
  { title: "AI Fluency pour dirigeants", diploma: "Short course — IA pour la stratégie et la productivité", price: "45 000 CFA", mode: "En ligne, live ou à la demande", jobs: ["Consultant en transformation numérique", "Chef de projet IA", "Opérateur de productivité augmentée"] },
  { title: "AI Fluency pour enseignants", diploma: "Short course gratuit — Pédagogie et IA générative", price: "Gratuit", mode: "En ligne, live ou à la demande", jobs: ["Concepteur de ressources pédagogiques", "Formateur digital", "Tuteur en ligne augmenté par l’IA"] },
  { title: "AI Fluency pour entreprises", diploma: "Short course — Déployer l’IA au travail", price: "Sur devis", mode: "En entreprise ou à distance", jobs: ["Référent IA en entreprise", "Consultant en adoption des outils IA", "Coordinateur de transformation digitale"] },
  { title: "AI-Driven Development pour développeurs juniors", diploma: "Short course — Développement logiciel assisté par l’IA", price: "75 000 CFA", mode: "En ligne, live ou à la demande", jobs: ["Développeur full-stack junior augmenté", "Assistant développeur IA", "Développeur freelance à distance"] },
  { title: "AI Trainer — former et entraîner les modèles d’IA", diploma: "Short course — En collaboration avec FreelanceConnect", price: "125 000 CFA", mode: "En ligne, live ou à la demande", jobs: ["AI trainer freelance", "Spécialiste de l’annotation de données", "Consultant en formation IA" ] },
  { title: "Automatiser son activité avec l’IA", diploma: "Short course — Workflows, données et outils no-code", price: "40 000 CFA", mode: "En ligne, live ou à la demande", jobs: ["Assistant automatisation", "Consultant no-code junior", "Coordinateur opérations à distance"] },
  { title: "IA, données et cybersécurité au quotidien", diploma: "Short course — Protection, vérification et conformité", price: "35 000 CFA", mode: "En ligne, à la demande", jobs: ["Assistant conformité numérique", "Analyste qualité des données junior", "Support cybersécurité sensibilisation"] },
] as const

export const freeShortCourses = [
  { title: "Le 4D Framework — version française", format: "Short course", price: "Gratuit", description: "Une méthode inspirée des recherches d’Anthropic pour déléguer, décrire, faire preuve de diligence et exercer son discernement face à une demande IA.", tags: ["short-course", "certifiante", "lab"], jobs: ["Assistant IA", "Créateur de contenu junior"] },
  { title: "Les capacités et limites de l’intelligence artificielle", format: "Short course", price: "Gratuit", description: "Comprendre ce que l’IA sait faire, ce qu’elle ne sait pas faire et quand garder une validation humaine.", tags: ["short-course", "certifiante"], jobs: ["Référent IA", "Assistant qualité numérique"] },
  { title: "Premiers prompts pour apprendre avec l’IA", format: "Short course", price: "Gratuit", description: "Des consignes accessibles pour réviser, rechercher, synthétiser et progresser avec responsabilité.", tags: ["short-course", "certifiante", "lab"], jobs: ["Assistant de recherche", "Tuteur en ligne"] },
  { title: "Lab : créer son premier workflow IA", format: "Lab à reprendre", price: "Gratuit", description: "Un atelier pratique reproductible pour construire, tester et améliorer un workflow IA du quotidien.", tags: ["lab", "short-course"], jobs: ["Assistant automatisation", "Opérateur digital"] },
  { title: "IA pour les entreprises : premier cas d’usage", format: "Short course entreprise", price: "Gratuit", description: "Identifier un cas d’usage concret, mesurer sa valeur et préparer une adoption progressive en équipe.", tags: ["entreprise", "short-course", "certifiante"], jobs: ["Référent IA en entreprise", "Chef de projet digital"] },
  { title: "Réussir une veille avec l’IA", format: "Short course", price: "Gratuit", description: "Apprendre à questionner, comparer et vérifier les informations produites ou résumées par l’IA.", tags: ["short-course", "certifiante"], jobs: ["Analyste veille junior", "Assistant documentation"] },
] as const

export const academyAccreditation = "Arrêté/Order N° 000325 / MINFOP/SG/DFOP/SDGSF/CSACD/CBAC"

export const partners = [
  { name: "FreelanceConnect", href: "https://freelanceconnect.cm", text: "Préparation au freelance, au travail à distance et à la relation client en ligne." },
  { name: "Global Logistics LTD", href: "https://globallogistics.cm", text: "Un partenaire métier pour rapprocher la formation des réalités de la logistique." },
  { name: "Anthropic Academy", href: "https://www.anthropic.com", text: "Formation partenaire autour de l’AI Fluency et de l’usage responsable de l’IA." },
] as const

export const aiFluencyLessons = [
  { id: "lesson-1", title: "Comprendre l’intelligence artificielle", description: "Capacités, limites et bons réflexes pour commencer.", videoId: "aqz-KE-bpKQ", quiz: [{ question: "Que faut-il vérifier avant de faire confiance à une réponse IA ?", options: ["La source et le contexte", "La couleur de l’interface", "Le nombre de mots"], answer: 0 }] },
  { id: "lesson-2", title: "Formuler une demande efficace", description: "Donner un rôle, un objectif et un contexte utiles.", videoId: "M7lc1UVf-VE", quiz: [{ question: "Quel élément rend une consigne plus utile ?", options: ["Un objectif clair", "Plus de majuscules", "Un texte très vague"], answer: 0 }] },
  { id: "lesson-3", title: "L’IA avec responsabilité", description: "Confidentialité, vérification et décision humaine.", videoId: "ScMzIvxBSi4", quiz: [{ question: "Quelle pratique est recommandée ?", options: ["Partager des données sensibles", "Vérifier les résultats", "Automatiser chaque décision"], answer: 1 }] },
  { id: "lesson-4", title: "IA pour étudier et apprendre", description: "Réviser, synthétiser et progresser sans déléguer sa réflexion.", videoId: "aqz-KE-bpKQ", quiz: [{ question: "Comment utiliser l’IA pour apprendre ?", options: ["Demander des explications et vérifier", "Copier sans comprendre", "Éviter toute source"], answer: 0 }] },
  { id: "lesson-5", title: "IA pour les enseignants", description: "Préparer des activités, différencier les supports et garder le contrôle pédagogique.", videoId: "M7lc1UVf-VE", quiz: [{ question: "Qui reste responsable de la décision pédagogique ?", options: ["L’outil IA", "L’enseignant", "Le moteur de recherche"], answer: 1 }] },
  { id: "lesson-6", title: "IA pour les entreprises", description: "Identifier des cas d’usage concrets et accompagner l’adoption en équipe.", videoId: "ScMzIvxBSi4", quiz: [{ question: "Quelle est une bonne première étape en entreprise ?", options: ["Choisir un cas d’usage mesurable", "Automatiser tout le métier", "Ignorer les risques"], answer: 0 }] },
  { id: "lesson-7", title: "AI-Driven Development", description: "Utiliser l’IA pour explorer, coder, tester et documenter avec méthode.", videoId: "aqz-KE-bpKQ", quiz: [{ question: "Que doit faire un développeur avant d’intégrer du code généré ?", options: ["Le relire et le tester", "Le déployer directement", "Supprimer les tests"], answer: 0 }] },
  { id: "lesson-8", title: "Construire son workflow IA", description: "Relier prompts, outils et validation humaine pour gagner en qualité.", videoId: "M7lc1UVf-VE", quiz: [{ question: "Quel principe protège la qualité d’un workflow IA ?", options: ["Une validation humaine", "Aucune vérification", "Des données confidentielles partout"], answer: 0 }] },
] as const

export const academyContact = { address: "920 Avenue de l’indépendance, Bonapriso, Douala, Cameroun BP 3861", email: "contact@globalacademy.freelanceconnect.cm", phone: "(+237) 693 526 747" }

export const dummyLearner = { email: "apprenant.demo@globalacademy.cm", password: "AI-Fluency-2026" }
