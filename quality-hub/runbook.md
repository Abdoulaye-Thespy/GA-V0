# Runbook qualité

## Avant chaque merge

```bash
./scripts/quality-gate.sh quick
```

Si le changement touche une route, une intégration, le PDF, le SEO ou le responsive :

```bash
./scripts/quality-gate.sh full
```

## Avant production

1. Vérifier que la branche est propre.
2. Lancer la suite `full`.
3. Ouvrir la Preview Vercel.
4. Tester le parcours modifié sur mobile et desktop.
5. Vérifier les logs Vercel et les erreurs navigateur.
6. Merger dans `master`.
7. Vérifier le déploiement Production automatique.

## En cas d’échec

- **lint** : corriger la règle ou documenter une exception locale justifiée.
- **typecheck** : corriger le contrat de données ; ne pas masquer l’erreur avec `any`.
- **test** : reproduire avec le test le plus petit possible.
- **audit** : mettre à jour la dépendance ou créer une exception documentée et temporaire.
- **build** : vérifier les imports serveur/client et les variables d’environnement.
- **Preview** : lire les logs Vercel, puis reproduire localement.

## Environnement et données

Les tests locaux ne doivent pas modifier la base de production. Utiliser des mocks pour les tests unitaires et un projet Neon/Blob de test séparé pour les tests E2E et migrations.
