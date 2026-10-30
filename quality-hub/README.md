# Quality Hub — Test Architecture

`quality-hub` est la référence centrale pour la qualité, les tests et la sécurité de Global Academy.

## Lancer toute la validation

Depuis la racine du projet :

```bash
chmod +x scripts/quality-gate.sh
./scripts/quality-gate.sh full
```

Variantes utiles :

```bash
./scripts/quality-gate.sh quick     # lint + TypeScript + tests
./scripts/quality-gate.sh security  # audit des dépendances
./scripts/quality-gate.sh build     # build Next.js production
```

Le script s’arrête dès qu’une gate échoue. Il utilise `pnpm` par défaut ; vous pouvez changer le gestionnaire avec `PACKAGE_MANAGER=npm` si nécessaire.

## Pyramide de tests

### 1. Tests unitaires

Cible : fonctions pures et règles métier.

- validation et nettoyage du nom du certificat ;
- génération et format des tokens ;
- calcul de progression ;
- règles de statut `valid` / `revoked` ;
- format des numéros de certificats.

Commande : `pnpm test`.

### 2. Tests d’intégration

Cible : routes API et frontières avec les services.

- création d’un certificat après validation du lab ;
- rejet des données invalides ;
- gestion du JSON malformé ;
- lecture du certificat par token ;
- génération, stockage privé et téléchargement du PDF ;
- QR code et URL de vérification ;
- réponses 404, 400 et 500 ;
- mocks déterministes de Neon et Vercel Blob.

Les tests présents utilisent des mocks afin de ne pas créer de données réelles pendant les tests locaux.

### 3. Tests composants/UI

À ajouter avec Testing Library :

- chaque checkbox de leçon ;
- progression 0–100 % ;
- activation du bouton de certificat uniquement quand toutes les étapes sont terminées ;
- états loading/error/success ;
- téléchargement PDF et partage LinkedIn ;
- responsive mobile.

### 4. Tests end-to-end

À ajouter avec Playwright sur une Preview Vercel :

1. ouvrir le cours ;
2. cocher toutes les leçons ;
3. générer un certificat ;
4. ouvrir l’aperçu ;
5. télécharger le PDF ;
6. scanner/ouvrir la vérification ;
7. vérifier les états valide, révoqué et introuvable ;
8. vérifier les largeurs mobile et desktop.

## Quality gates

Toutes les gates doivent passer avant un merge vers `master` :

1. lint ESLint ;
2. typecheck TypeScript ;
3. Vitest unitaires/intégration ;
4. `pnpm audit --audit-level=high` ;
5. build Next.js ;
6. validation de la Preview Vercel ;
7. déploiement Production automatique depuis `master`.

## DevSecOps

- Ne jamais commiter `.env`, token, clé API ou fichier contenant un secret.
- Ne jamais utiliser les URLs privées Blob dans LinkedIn ou dans la page publique.
- Valider toutes les entrées côté serveur, même si l’UI les valide déjà.
- Vérifier les permissions avant chaque accès à un certificat privé.
- Garder les dépendances et le lockfile synchronisés.
- Traiter tout audit high/critical avant la mise en production.
- Ajouter SAST CodeQL et Dependency Review GitHub lorsque les permissions GitHub Workflows seront activées.

## Vercel et Codex

- **Codex/local** : lancer `./scripts/quality-gate.sh quick` avant de demander une review.
- **Vercel Preview** : tester les parcours visibles, les routes, le SEO et le responsive.
- **Vercel Production** : déployer uniquement depuis `master` après validation de la Preview.
- Les tests avec Neon/Blob utilisent des mocks localement ; les tests E2E doivent utiliser un environnement de test séparé.

## Structure de référence

```text
quality-hub/
├── README.md                 # stratégie et règles
├── test-matrix.md            # matrice des cas d’usage
└── runbook.md                # procédure avant merge/deploiement
scripts/
└── quality-gate.sh           # commande unique de validation
```
