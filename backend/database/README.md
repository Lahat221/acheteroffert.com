# 🗄️ Documentation Base de Données

Bienvenue dans la documentation pour configurer et utiliser la base de données PostgreSQL du projet **acheteroffert**.

---

## 📚 Guides Disponibles

### 🚀 Pour Démarrer

1. **[INSTALL_POSTGRESQL.md](./INSTALL_POSTGRESQL.md)** 
   - Installation de PostgreSQL sur Windows
   - Démarrer le service PostgreSQL
   - Réinitialiser le mot de passe

2. **[GUIDE_PGADMIN.md](./GUIDE_PGADMIN.md)**
   - Guide complet pour utiliser pgAdmin
   - Créer la base de données `acheteroffert`
   - Activer l'extension UUID
   - Vérifier que tout fonctionne

3. **[ACTIVER_EXTENSION.md](./ACTIVER_EXTENSION.md)**
   - Solution détaillée si vous obtenez l'erreur `uuid_generate_v4() does not exist`
   - Méthodes pour activer l'extension `uuid-ossp`
   - Dépannage des problèmes courants

### 📝 Scripts et Données

4. **[README_SEED.md](./README_SEED.md)**
   - Comment ajouter des données de test (seed)
   - Utiliser les fichiers `seed.sql` et `seed-admin.sql`
   - Vérifier que les données sont créées

5. **[README_SEED_COMPLET.md](./README_SEED_COMPLET.md)** ⭐ **NOUVEAU**
   - Script de seed complet avec des offres pour **toutes les catégories**
   - 21 offres réparties dans 9 catégories pour animer le site
   - Utiliser le fichier `seed-complet.sql`

6. **Fichiers SQL disponibles :**
   - `init.sql` : Script d'initialisation (créer la DB + extension UUID)
   - `seed.sql` : Données de test pour vendeurs et offres
   - `seed-complet.sql` : **Seed complet avec offres pour toutes les catégories** ⭐
   - `seed-admin.sql` : Créer un administrateur de test

### 🔧 Migrations

6. **Migrations TypeORM :**
   - `migrations/1700000000000-InitialSchema.ts` : Crée toutes les tables
   - Exécuter avec : `npm run migration:run`

---

## 🎯 Guide Rapide (Démarrage Express)

### Si PostgreSQL est déjà installé :

1. **Créer la base de données** → Suivez [GUIDE_PGADMIN.md](./GUIDE_PGADMIN.md)
2. **Activer l'extension UUID** → Suivez [ACTIVER_EXTENSION.md](./ACTIVER_EXTENSION.md)
3. **Configurer `.env`** dans `backend/` :
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=votre_mot_de_passe
   DB_DATABASE=acheteroffert
   ```
4. **Exécuter les migrations** :
   ```bash
   cd backend
   npm run migration:run
   ```
5. **(Optionnel) Ajouter des données de test** → Suivez [README_SEED.md](./README_SEED.md)

### Si PostgreSQL n'est pas installé :

1. **Installer PostgreSQL** → Suivez [INSTALL_POSTGRESQL.md](./INSTALL_POSTGRESQL.md)
2. Puis suivez les étapes ci-dessus

---

## 📋 Fichiers Disponibles

### Scripts SQL
- `init.sql` : Script d'initialisation de la base de données
- `seed.sql` : Données de test (vendeurs, offres)
- `seed-admin.sql` : Créer un administrateur

### Scripts Node.js
- `create-admin.js` : Script pour créer un administrateur via l'API

### Migrations TypeORM
- `migrations/1700000000000-InitialSchema.ts` : Migration initiale (crée toutes les tables)

---

## ✅ Vérification Rapide

Pour vérifier que tout est correctement configuré :

```sql
-- Se connecter à la base de données
\c acheteroffert

-- Vérifier l'extension UUID
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';

-- Lister toutes les tables
\dt

-- Voir la structure d'une table
\d vendors
\d offers
\d reservations
```

---

## 🐛 Problèmes Courants

### Erreur : "uuid_generate_v4() does not exist"
→ Consultez [ACTIVER_EXTENSION.md](./ACTIVER_EXTENSION.md)

### Erreur : "connection timeout"
→ PostgreSQL n'est pas démarré → Consultez [INSTALL_POSTGRESQL.md](./INSTALL_POSTGRESQL.md)

### Erreur : "password authentication failed"
→ Mot de passe incorrect → Consultez [INSTALL_POSTGRESQL.md](./INSTALL_POSTGRESQL.md)

### Erreur : "relation does not exist"
→ Les migrations n'ont pas été exécutées → `npm run migration:run`

---

## 📖 Documentation Complémentaire

Pour plus d'informations sur la configuration globale :
- `../SETUP_DATABASE.md` : Configuration complète de la base de données
- `../CREER_ENV.md` : Créer le fichier `.env`
- `../TROUBLESHOOTING.md` : Dépannage général

---

## 🎯 Prochaines Étapes

Une fois la base de données configurée :

1. ✅ Base de données créée
2. ✅ Extension UUID activée
3. ✅ Migrations exécutées
4. ✅ (Optionnel) Données de test ajoutées
5. 🚀 Lancer l'application : `npm run dev`

Bon développement ! 🎉







