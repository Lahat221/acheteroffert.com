# Backend API - acheteroffert.com

Backend NestJS avec PostgreSQL pour la marketplace acheteroffert.com.

## 📋 Prérequis

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configuration de la base de données

Créez un fichier `.env` à la racine du dossier `backend` :

```env
# Configuration de la base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=acheteroffert

# Configuration JWT pour l'authentification
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# Configuration du serveur
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Créer la base de données PostgreSQL

Connectez-vous à PostgreSQL et créez la base de données :

```sql
CREATE DATABASE acheteroffert;
```

**Important :** Activez l'extension UUID si nécessaire :

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 4. Exécuter les migrations

```bash
# Exécuter toutes les migrations
npm run migration:run
```

### 5. Démarrer le serveur

```bash
# Mode développement (avec hot-reload)
npm run dev

# Mode production
npm run build
npm run start:prod
```

Le serveur sera accessible sur `http://localhost:3001`

## 📁 Structure du Projet

```
backend/
├── src/
│   ├── config/              # Configuration (DB, app)
│   ├── vendors/             # Module vendeurs
│   │   └── entities/        # Entité Vendor
│   ├── products/            # Module produits/offres
│   │   └── entities/        # Entité Offer
│   ├── reservations/        # Module réservations
│   │   └── entities/        # Entité Reservation
│   ├── qrcodes/             # Module QR codes
│   │   └── entities/        # Entité QRCode
│   ├── subscriptions/       # Module abonnements
│   │   └── entities/        # Entité Subscription
│   ├── auth/                # Module authentification
│   │   └── entities/        # Entité Admin
│   ├── common/              # Code partagé
│   ├── app.module.ts        # Module principal
│   └── main.ts              # Point d'entrée
├── database/
│   └── migrations/          # Migrations TypeORM
└── package.json
```

## 🗄️ Base de Données

### Schéma

Le schéma de base de données est documenté dans `database/SCHEMA.md`.

### Tables

- **vendors** : Vendeurs de la plateforme
- **offers** : Offres proposées par les vendeurs
- **reservations** : Réservations effectuées par les clients
- **qr_codes** : QR codes générés pour les réservations
- **subscriptions** : Abonnements des vendeurs
- **admins** : Administrateurs de la plateforme

### Migrations

```bash
# Générer une nouvelle migration
npm run migration:generate -- -n NomDeLaMigration

# Exécuter les migrations
npm run migration:run

# Annuler la dernière migration
npm run migration:revert
```

## 🔧 Commandes Disponibles

```bash
# Développement
npm run dev              # Démarre le serveur en mode watch
npm run start:debug      # Démarre avec debugger

# Build
npm run build            # Compile TypeScript
npm run start:prod      # Démarre en production

# Tests
npm run test            # Tests unitaires
npm run test:watch     # Tests en mode watch
npm run test:cov       # Tests avec couverture

# Linting
npm run lint           # Vérifie le code
npm run format         # Formate le code

# Migrations
npm run migration:generate  # Génère une migration
npm run migration:run       # Exécute les migrations
npm run migration:revert    # Annule la dernière migration
```

## 📝 Notes

- Les migrations sont dans `database/migrations/`
- Les entités TypeORM sont dans `src/**/entities/`
- La configuration de la base de données est dans `src/config/`
- Le mode `synchronize` est activé uniquement en développement (désactivé en production)

## 🔐 Sécurité

- Les mots de passe sont hashés avec bcrypt
- JWT pour l'authentification
- Validation des données avec class-validator
- CORS configuré pour le frontend

## 📚 Documentation API

La documentation de l'API sera disponible une fois les endpoints créés.







