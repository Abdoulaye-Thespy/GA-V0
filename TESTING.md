# Global Academy — stratégie de tests DevSecOps

## Architecture de livraison

Le pipeline utilise des gates progressives :

1. **Pré-commit/local** : formatage, lint, TypeScript et tests unitaires.
2. **Vercel Preview** : chaque Pull Request ou branche de travail génère une Preview automatiquement.
3. **Validation Preview** : smoke tests, responsive checks et validation manuelle de l’UI sur la Preview Vercel.
4. **Production** : déploiement automatique depuis `master` après validation de la Preview.
5. **SAST/Dependency Review** : à ajouter plus tard dans GitHub Actions lorsque le dépôt autorisera les permissions `workflows`.

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

- Aucun merge vers `master` si lint, typecheck, tests, audit ou build échoue localement.
- La Preview Vercel doit être consultée avant le merge.
- La Production reste pilotée exclusivement par le déploiement automatique Vercel depuis `master`.
- Toute nouvelle route API doit avoir des cas nominal, validation, accès refusé, absence de ressource et erreur interne.
- Toute modification de données doit avoir un test de migration et un test de régression.
- Les secrets restent dans Vercel/GitHub Actions secrets, jamais dans `.env` commité.

## Limites actuelles

Le pipeline ne simule pas encore les services Neon et Blob en environnement éphémère. Les tests d’intégration utilisent donc des mocks déterministes. La prochaine étape est d’ajouter Playwright contre une Preview Vercel et un environnement de test Neon/Blob séparé.
