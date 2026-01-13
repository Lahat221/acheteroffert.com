# Structure du Projet acheteroffert.com

## 📁 Structure des Dossiers

```
acheteroffert/
├── frontend/                    # Application Next.js (App Router, TypeScript)
│   ├── src/
│   │   ├── app/                 # Routes et layouts Next.js App Router
│   │   ├── components/          # Composants React réutilisables
│   │   ├── lib/                 # Bibliothèques et configurations (API client, etc.)
│   │   ├── types/               # Définitions TypeScript (interfaces, types)
│   │   ├── hooks/               # Hooks React personnalisés
│   │   └── utils/               # Fonctions utilitaires
│   └── public/                  # Assets statiques (images, icônes, etc.)
│
├── backend/                     # API NestJS
│   ├── src/
│   │   ├── auth/                # Module d'authentification (vendeur/admin)
│   │   ├── users/               # Module utilisateurs (clients - sans auth)
│   │   ├── vendors/             # Module vendeurs (CRUD, gestion)
│   │   ├── products/            # Module produits (catalogue marketplace)
│   │   ├── reservations/        # Module réservations (création, gestion)
│   │   ├── qrcodes/             # Module QR codes (génération, validation)
│   │   ├── subscriptions/       # Module abonnements (un seul type vendeur)
│   │   ├── common/              # Code partagé (guards, decorators, pipes)
│   │   └── config/              # Configurations (DB, env, etc.)
│   └── database/
│       └── migrations/          # Migrations PostgreSQL
│
└── database/                    # Scripts et schémas de base de données
```

## 📝 Description des Dossiers

### Frontend (`frontend/`)

- **`src/app/`** : Routes Next.js App Router (pages publiques, dashboard vendeur/admin)
- **`src/components/`** : Composants UI réutilisables (cartes produits, formulaires, etc.)
- **`src/lib/`** : Configuration et clients (API client, configurations)
- **`src/types/`** : Types TypeScript partagés (interfaces produits, réservations, etc.)
- **`src/hooks/`** : Hooks React personnalisés (data fetching, state management)
- **`src/utils/`** : Fonctions utilitaires (formatage, validation, helpers)
- **`public/`** : Assets statiques (images, QR codes générés, etc.)

### Backend (`backend/`)

- **`src/auth/`** : Authentification JWT pour vendeurs et admins (guards, strategies)
- **`src/users/`** : Gestion des utilisateurs clients (sans authentification)
- **`src/vendors/`** : CRUD vendeurs, gestion de profil, abonnement
- **`src/products/`** : Catalogue produits (CRUD, recherche, filtres)
- **`src/reservations/`** : Création et gestion des réservations (liées aux produits)
- **`src/qrcodes/`** : Génération et validation des QR codes pour réservations
- **`src/subscriptions/`** : Gestion de l'abonnement unique vendeur (paiement, statut)
- **`src/common/`** : Code partagé (guards, decorators, interceptors, exceptions)
- **`src/config/`** : Configurations (database, JWT, variables d'environnement)
- **`database/migrations/`** : Migrations TypeORM/Prisma pour PostgreSQL

### Database (`database/`)

- **`database/`** : Scripts SQL, seeds, schémas de base de données








