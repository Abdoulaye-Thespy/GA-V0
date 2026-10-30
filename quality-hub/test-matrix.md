# Matrice des tests

| Domaine | Cas nominal | Cas d’erreur | Niveau | Outil |
|---|---|---|---|---|
| Certificat | nom valide crée un certificat | nom vide, trop court, trop long, HTML | Unitaire + intégration | Vitest |
| Lab | toutes les étapes activent le bouton | étape manquante bloque la génération | Composant + E2E | Testing Library + Playwright |
| PDF | PDF téléchargeable avec logo, signature, QR | Blob indisponible, certificat absent | Intégration | Vitest mock |
| Vérification | token valide affiche Valide | token inconnu affiche 404, certificat révoqué | Intégration + E2E | Vitest + Playwright |
| LinkedIn | URL publique partagée | jamais d’URL Blob privée | Unitaire | Vitest |
| SEO | metadata, sitemap, robots | route privée non indexée | Intégration | Playwright |
| Responsive | 375px, 768px, desktop | débordement horizontal | E2E visuel | Playwright |
| Sécurité | validation serveur et headers | injection, accès non autorisé | SAST + intégration | CodeQL + Vitest |
| Dépendances | lockfile reproductible | vulnérabilité high/critical | Supply chain | pnpm audit |
| Livraison | Preview Vercel fonctionnelle | build échoué | Smoke/E2E | Vercel + Playwright |
