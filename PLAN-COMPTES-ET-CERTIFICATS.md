# Plan produit et TDD — Comptes Free/Pro et certificats

**Statut : proposition à relire avant implémentation.** Ce document est volontairement à la racine du dépôt pour être suivi par Git et disponible à Vercel lors du prochain déploiement. Aucun déploiement ni envoi GitHub n’a été effectué.

## Objectif

Permettre à chacun de créer un compte gratuit et de se connecter. Le blog public affiche sa liste et des aperçus; il faut un compte connecté pour lire un article complet. Le compte Free peut suivre les cours explicitement gratuits. Un compte Free peut obtenir un certificat précis pour **5 000 FCFA**, ou passer au compte **Pro à vie pour 15 000 FCFA**. Pro inclut les short courses et labs, présents et futurs, ainsi que la génération et le téléchargement des certificats admissibles. Les formations diplômantes avec examen (DQP/CQP) restent exclues de l’offre Pro et de l’achat de certificat unitaire.

## Règles métier à valider

| Ressource / action | Visiteur déconnecté | Compte Free | Compte Pro à vie |
| --- | --- | --- | --- |
| Voir la liste publique des articles du blog | Oui | Oui | Oui |
| Lire un article complet (texte, vidéo, lab détaillé) | Créer un compte / se connecter | Oui | Oui |
| Suivre les formations marquées gratuites | Oui, si le contenu est public | Oui | Oui |
| Suivre tous les short courses et labs (actuels et nouveaux) | Non / créer un compte | Non, proposer Pro | Oui |
| Formation avec examen DQP/CQP | Selon la politique actuelle d’inscription | Hors abonnement | Hors abonnement |
| Générer/télécharger un certificat de short course ou lab | Se connecter/créer un compte | Acheter ce certificat (5 000 FCFA) ou passer Pro | Inclus, sans nouveau paiement |
| Certificat d’une formation DQP/CQP | Parcours diplôme existant, à confirmer | Hors de cette offre | Hors de cette offre |

La liste `/blog` reste publique et peut afficher les titres, résumés et visuels d’aperçu. L’article complet (texte, vidéo, étapes du lab) exige une session. Si le visiteur clique sur un article, l’application l’envoie vers création de compte ou connexion, puis le ramène à l’article demandé. La page détail ne doit pas dévoiler son contenu complet avant l’authentification, y compris dans les métadonnées/API rendues côté serveur. Le prix unitaire est par certificat/parcours, payable une seule fois et rattaché au compte.

## Principes d’implémentation

1. **Autorité serveur.** Le navigateur ne décide jamais du niveau de compte, du paiement, de l’achèvement d’un cours ni du droit de télécharger un PDF. Chaque Server Action/API de génération et de téléchargement recharge la session et vérifie l’entitlement en base.
2. **Métadonnées explicites des cours.** Ajouter une catégorie stable (`free-course`, `short-course`, `lab`, `exam`) et le type de certification au catalogue. Ne pas inférer les droits à partir du titre, du prix affiché, d’un slug ou de tags éditoriaux. Les futurs cours doivent déclarer leur catégorie. Le contenu d’un article de blog suit une règle distincte : index public, détail authentifié.
3. **Compte et session.** Utiliser **NextAuth.js**, déjà choisi pour le projet, et reprendre sa configuration existante plutôt que d’ajouter un fournisseur d’authentification concurrent. Vérifier les providers, le stockage des sessions et les callbacks avant de les compléter. Couvrir création de compte, connexion, déconnexion, vérification email et récupération de mot de passe selon les capacités/configurations existantes. Chaque nouvel utilisateur reçoit `free`; aucun formulaire client ne peut créer un compte Pro.
4. **Entitlements persistants.** Versionner les migrations et enregistrer le niveau, l’origine, l’état et les références de paiement. Le Pro est lifetime (pas de date d’expiration), accordé une fois après confirmation serveur du paiement. Les achats unitaires sont uniques par compte et parcours. Les événements de paiement doivent être idempotents.
5. **Paiement en XAF.** Ne pas réutiliser aveuglément `/api/pay` : son code actuel parle de Chapa, ETB et d’un ancien site SGS. Vercel doit confirmer le fournisseur disponible qui accepte XAF (par exemple le prestataire réellement configuré pour le projet), puis vérifier côté serveur la signature/webhook et le statut, montant, devise et référence avant de donner un droit. Ne jamais accorder l’accès sur le retour navigateur seul.
6. **Achèvement et certificat.** Les cases actuelles du lab sont uniquement côté navigateur et l’API actuelle délivre un certificat à partir d’un nom fourni. Le plan doit persister/valider côté serveur l’achèvement requis avant émission. L’endpoint PDF doit aussi vérifier le propriétaire et le droit actif; le token public de vérification peut rester accessible sans révéler l’email.
7. **Compatibilité.** Les comptes et certificats déjà existants doivent être conservés. Prévoir une migration et un comportement explicite pour les certificats créés avant le lancement (aucune révocation implicite).

## Découpage TDD proposé

### Étape 1 — Règles et catalogue (préparée)

- Tests unitaires des droits Free/Pro, exception DQP/CQP, offre à 5 000 FCFA, accès inclus Pro, authentification requise et achat unitaire déjà payé.
- Exposer les règles métier dans un module pur partagé par UI et serveur.
- Ajouter les métadonnées d’accès structurées aux formations actuelles; les tests doivent refuser un cours sans catégorie/entitlement défini.

### Étape 2 — Authentification et compte Free

- Écrire les tests d’intégration : inscription valide, email déjà utilisé, mot de passe invalide, connexion valide/invalide, session requise, déconnexion, email non vérifié, niveau par défaut Free.
- Implémenter les pages `/signup`, `/login`, un menu de compte et les actions de session. Protéger les routes sensibles serveur.
- Garder `/blog` public avec ses aperçus; exiger une session sur les détails d’article et conserver l’URL demandée pour y revenir après inscription/connexion. Les formations explicitement gratuites restent accessibles selon le tableau.

### Étape 3 — Pro à vie et achats unitaires

- Tests paiement mocké : signature erronée, montant/devise inattendus, échec, doublon webhook, paiement confirmé, aucune attribution depuis un simple redirect, achat d’un même certificat en double.
- Tests de droits persistants : Pro actif inclus, achat unitaire valable seulement pour le compte et le parcours correspondants, examen toujours refusé.
- Implémenter le checkout XAF après validation du fournisseur, puis webhook idempotent et historique/audit des paiements.

### Étape 4 — Certificats et contenu

- Tests API : visiteur refusé avec invitation à se connecter; Free sans achat reçoit les deux options; Free payé peut émettre/télécharger; Pro peut émettre/télécharger; l’utilisateur ne peut pas télécharger le certificat d’un autre compte; DQP/CQP refusé; cours inachevé refusé.
- Persister l’achèvement du lab/cours et associer certificat, parcours et propriétaire.
- Conserver l’URL de vérification publique, protéger le PDF privé et ne jamais faire confiance à un token fourni sans vérification en base.

### Étape 5 — Interface et recette

- Afficher Free/Pro et les options de certificat dans blog/labs et tableau de bord.
- Présenter clairement les montants en FCFA, l’accès à vie, l’exclusion DQP/CQP et le reçu/état de paiement.
- Tests navigateur : visiteur → compte Free → cours gratuit; Free → option 5 000 ou Pro 15 000; paiement confirmé → PDF; Pro → nouveau lab → certificat inclus; DQP/CQP reste exclu. Tester mobile et desktop.

## Tests ajoutés dans cette première passe

- `tests/account-access.test.ts` contient les tests unitaires de contrat demandés.
- `lib/account-access.ts` est le module pur correspondant afin que les tests soient exécutables dès maintenant; il ne met pas encore en place l’authentification, le paiement, la persistance, le catalogue ou les pages.
- Les tests des étapes suivantes doivent être ajoutés avant chaque implémentation (red → green → refactor), avec fournisseurs de paiement, email et base simulés. Aucun appel de production ne doit être utilisé par les tests.

## Critères d’acceptation globaux

- Un compte créé est Free par défaut; seule une confirmation de paiement serveur peut lui donner Pro.
- Le droit Pro n’expire pas et couvre les short courses/labs actuels et futurs grâce à leurs métadonnées, jamais par liste figée de slugs.
- Liste et aperçus du blog visibles sans compte; le détail complet des articles (dont vidéo et lab) nécessite une session et redirige vers l’URL initiale après connexion.
- Contenus explicitement gratuits restent consultables sans abonnement selon leur règle d’accès.
- Un utilisateur connecté Free voit l’offre de 5 000 FCFA par certificat ou 15 000 FCFA pour Pro; un visiteur doit se connecter avant achat/génération.
- Un paiement unitaire est lié au compte et au certificat/parcours; un paiement Pro est durable et idempotent.
- La génération et le téléchargement sont refusés côté serveur sans session et droit valide.
- Les cours diplômants avec examen (DQP/CQP) ne sont pas débloqués par Pro ou achat unitaire.
- Aucun secret ni clé de production n’est envoyé au navigateur ou utilisé dans la suite de tests.

## Note d’intégration NextAuth.js

NextAuth.js est le choix d’authentification demandé pour ce projet. Lors de l’implémentation, conserver son instance/configuration existante et intégrer les droits Free/Pro aux callbacks/session ou à la couche de données appropriée. Ne pas remplacer NextAuth par Supabase Auth. Dans l’état du dépôt consulté le 31 octobre 2026, je n’ai pas retrouvé de référence `next-auth`/`NextAuth` dans les sources, `package.json` ou le lockfile ; il faudra donc localiser la configuration (ou la faire entrer dans le dépôt) avant de câbler l’inscription. La présence de `@supabase/supabase-js` comme dépendance ne signifie pas que Supabase Auth est configuré.
