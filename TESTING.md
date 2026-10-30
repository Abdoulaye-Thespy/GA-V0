# Global Academy — stratégie de tests DevSecOps

## Architecture de livraison

Le pipeline utilise des gates progressives :

1. **Pré-commit/local** : formatage, lint, TypeScript et tests unitaires.
2. **Pull request** : installation reproductible avec le lockfile, lint, typecheck, tests, audit npm, build et Dependency Review.
3. **SAST** : CodeQL analyse JavaScript/TypeScript sur les PR, la branche principale et chaque semaine.
4. **Preview Vercel** : validation manuelle de l’UI sur la Preview générée par Vercel.
5. **Production** : déploiement seulement après les checks GitHub/Vercel requis.

## Commandes locales et Codex

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm audit --audit-level=high
pnpm build
```

Pour travailler rapidement :

```bash
pnpm test:watch
pnpm dev
```

## Pyramide de tests

- **Unitaires** : validation des noms, tokens, calculs de progression et fonctions de génération.
- **Intégration** : routes de certificats, persistance Neon mockée, Blob/PDF mocké, réponses 400/404/500.
- **Composants/UI** : checkboxes, état de progression, bouton de téléchargement et partage LinkedIn.
- **E2E recommandé ensuite** : Playwright sur la Preview Vercel : inscription, lab complet, génération, téléchargement, vérification valide/révoquée et responsive mobile.
- **Non-régression** : tests SEO sur metadata, sitemap, robots, canonical et JSON-LD.
- **Sécurité** : CodeQL SAST, Dependency Review, `pnpm audit`, validation serveur, absence de secrets dans le dépôt.

## Règles de merge

- Aucun merge si lint, typecheck, tests, audit ou build échoue.
- Toute nouvelle route API doit avoir des cas nominal, validation, accès refusé, absence de ressource et erreur interne.
- Toute modification de données doit avoir un test de migration et un test de régression.
- Les secrets restent dans Vercel/GitHub Actions secrets, jamais dans `.env` commité.

## Limites actuelles

Le pipeline ne simule pas encore les services Neon et Blob en environnement éphémère. Les tests d’intégration utilisent donc des mocks déterministes. La prochaine étape est d’ajouter Playwright contre une Preview Vercel et un environnement de test Neon/Blob séparé.
