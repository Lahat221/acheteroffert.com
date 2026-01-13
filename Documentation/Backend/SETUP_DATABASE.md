# 🗄️ Configuration de la Base de Données

## ✅ Ce qui a été créé

### 1. Configuration NestJS
- ✅ `package.json` avec toutes les dépendances (NestJS, TypeORM, PostgreSQL, etc.)
- ✅ `tsconfig.json` pour TypeScript
- ✅ `nest-cli.json` pour la configuration NestJS
- ✅ `.gitignore` pour exclure les fichiers générés

### 2. Configuration Base de Données
- ✅ `src/config/database.config.ts` : Configuration TypeORM pour les migrations
- ✅ `src/config/database.module.ts` : Module NestJS pour la connexion DB
- ✅ `src/config/app.config.ts` : Configuration globale de l'application

### 3. Entités TypeORM (6 entités)
- ✅ `src/vendors/entities/vendor.entity.ts` : Vendeurs
- ✅ `src/products/entities/offer.entity.ts` : Offres
- ✅ `src/reservations/entities/reservation.entity.ts` : Réservations
- ✅ `src/qrcodes/entities/qrcode.entity.ts` : QR Codes
- ✅ `src/subscriptions/entities/subscription.entity.ts` : Abonnements
- ✅ `src/auth/entities/admin.entity.ts` : Administrateurs

### 4. Migration Initiale
- ✅ `database/migrations/1700000000000-InitialSchema.ts` : Crée toutes les tables

### 5. Module Principal
- ✅ `src/app.module.ts` : Module racine de l'application
- ✅ `src/main.ts` : Point d'entrée du serveur

## 🚀 Prochaines Étapes

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Créer le fichier .env

Créez un fichier `.env` dans le dossier `backend` avec ce contenu :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=acheteroffert

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h

PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**⚠️ Important :** Remplacez les valeurs par vos propres identifiants PostgreSQL.

### 3. Créer la base de données PostgreSQL

Connectez-vous à PostgreSQL (via psql, pgAdmin, ou un autre outil) et exécutez :

```sql
-- Créer la base de données
CREATE DATABASE acheteroffert;

-- Activer l'extension UUID (si nécessaire)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 4. Exécuter les migrations

```bash
npm run migration:run
```

Cette commande va créer toutes les tables dans votre base de données PostgreSQL.

### 5. Vérifier que tout fonctionne

```bash
npm run dev
```

Le serveur devrait démarrer sur `http://localhost:3001`.

## 📊 Structure des Tables

Une fois les migrations exécutées, vous aurez ces tables :

1. **vendors** - Vendeurs de la plateforme
2. **offers** - Offres proposées
3. **reservations** - Réservations clients
4. **qr_codes** - QR codes pour les réservations
5. **subscriptions** - Abonnements vendeurs
6. **admins** - Administrateurs

## 🔍 Vérification

Pour vérifier que les tables ont été créées, connectez-vous à PostgreSQL :

```sql
-- Lister toutes les tables
\dt

-- Voir la structure d'une table
\d vendors
\d offers
\d reservations
```

## 📝 Notes Importantes

- **Synchronisation automatique** : En développement (`NODE_ENV=development`), TypeORM synchronise automatiquement le schéma. En production, utilisez uniquement les migrations.
- **UUID** : Tous les IDs sont des UUID pour plus de sécurité.
- **Relations** : Les relations entre tables sont configurées (clés étrangères).
- **Index** : Des index ont été créés pour améliorer les performances des requêtes.

## 🐛 Dépannage

### Erreur : "relation does not exist"
- Vérifiez que les migrations ont été exécutées : `npm run migration:run`

### Erreur : "extension uuid-ossp does not exist"
- Exécutez : `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` dans PostgreSQL

### Erreur de connexion à la base de données
- Vérifiez les variables d'environnement dans `.env`
- Vérifiez que PostgreSQL est démarré
- Vérifiez que la base de données `acheteroffert` existe

## 🎯 Prochaines Étapes de Développement

Une fois la base de données configurée, vous pouvez :

1. Créer les modules NestJS (VendorsModule, ProductsModule, etc.)
2. Créer les services pour interagir avec la base de données
3. Créer les controllers pour exposer les endpoints API
4. Créer les DTOs pour valider les données
5. Implémenter l'authentification JWT








