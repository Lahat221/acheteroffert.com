# 📘 Guide pgAdmin - Création de la Base de Données

> 📖 **Retour à l'index** : [README.md](./README.md)

---

## 🎯 Objectif
Créer la base de données `acheteroffert` et activer l'extension UUID pour le projet.

---

## 📋 Étape 1 : Ouvrir pgAdmin

1. **Lancez pgAdmin** depuis le menu Démarrer Windows
2. À la première ouverture, on vous demandera un **mot de passe maître** pour pgAdmin
   - Choisissez un mot de passe et **retenez-le** (il sera demandé à chaque ouverture)
   - ⚠️ Ce mot de passe est différent de celui de PostgreSQL

---

## 📋 Étape 2 : Se connecter au serveur PostgreSQL

1. Dans le panneau de gauche, vous verrez **Servers**
2. Cliquez sur la flèche à côté de **Servers** pour l'étendre
3. Vous devriez voir un serveur (généralement nommé **PostgreSQL 14** ou similaire)
4. **Cliquez droit** sur le serveur → **Connect Server...**
5. Une fenêtre s'ouvre avec un champ **Password**
   - Entrez le mot de passe de l'utilisateur **postgres** (celui que vous avez défini lors de l'installation de PostgreSQL)
   - Cochez **Save password** si vous voulez éviter de le retaper
   - Cliquez sur **OK**

✅ **Si la connexion réussit**, le serveur s'ouvre et vous voyez :
- Databases
- Login/Group Roles
- Tablespaces

---

## 📋 Étape 3 : Créer la base de données

1. Dans le panneau de gauche, **cliquez droit** sur **Databases**
2. Sélectionnez **Create** → **Database...**
3. Une fenêtre **Create - Database** s'ouvre
4. Dans l'onglet **General** :
   - **Database** : tapez `acheteroffert`
   - **Owner** : laissez `postgres` (ou votre utilisateur)
   - **Comment** : (optionnel) "Base de données pour acheteroffert.com"
5. Cliquez sur **Save** en bas à droite

✅ **La base de données est créée !** Vous devriez la voir dans la liste sous **Databases**

---

## 📋 Étape 4 : Activer l'extension UUID

1. Dans le panneau de gauche, **cliquez sur la flèche** à côté de **Databases** pour l'étendre
2. **Cliquez sur la flèche** à côté de **acheteroffert** pour l'étendre
3. **Cliquez sur la flèche** à côté de **Extensions**
4. **Cliquez droit** sur **Extensions** → **Create** → **Extension...**
5. Une fenêtre s'ouvre :
   - Dans le champ **Name**, tapez ou sélectionnez : `uuid-ossp`
   - Laissez les autres options par défaut
   - Cliquez sur **Save**

✅ **Alternative (via Query Tool)** :
1. **Cliquez droit** sur la base de données **acheteroffert**
2. Sélectionnez **Query Tool** (ou appuyez sur **Alt+Shift+Q**)
3. Dans l'éditeur SQL, tapez :
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```
4. Cliquez sur le bouton **▶ Execute** (ou appuyez sur **F5**)
5. Vous devriez voir le message : **"Query returned successfully"**

---

## 📋 Étape 5 : Vérifier que tout fonctionne

1. Dans **Query Tool**, exécutez cette requête :
   ```sql
   SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';
   ```
2. Vous devriez voir une ligne avec `uuid-ossp` dans les résultats
3. Testez la génération d'UUID :
   ```sql
   SELECT uuid_generate_v4();
   ```
4. Vous devriez voir un UUID généré (ex: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

---

## ✅ Résumé

Vous avez maintenant :
- ✅ Une base de données `acheteroffert` créée
- ✅ L'extension `uuid-ossp` activée
- ✅ Tout est prêt pour exécuter les migrations

---

## 🚀 Prochaines Étapes

1. **Créer le fichier `.env`** dans `backend/` avec vos identifiants PostgreSQL :
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=votre_mot_de_passe_postgres
   DB_DATABASE=acheteroffert
   ```

2. **Exécuter les migrations** depuis le terminal :
   ```bash
   cd backend
   npm run migration:run
   ```

3. **Vérifier les tables** dans pgAdmin :
   - Dans **acheteroffert** → **Schemas** → **public** → **Tables**
   - Vous devriez voir 6 tables : `vendors`, `offers`, `reservations`, `qr_codes`, `subscriptions`, `admins`

---

## 🐛 Dépannage

### Erreur : "password authentication failed"
- Vérifiez que vous utilisez le bon mot de passe PostgreSQL (pas celui de pgAdmin)
- Le mot de passe par défaut est souvent celui que vous avez défini lors de l'installation

### Erreur : "could not connect to server"
- Vérifiez que le service PostgreSQL est démarré
- Dans Windows : Services → PostgreSQL → Démarrer

### L'extension uuid-ossp n'apparaît pas
- Utilisez la méthode **Query Tool** (Étape 4 - Alternative)
- Vérifiez que vous êtes bien connecté à la base `acheteroffert`

### Je ne vois pas le serveur PostgreSQL
- Cliquez droit sur **Servers** → **Register** → **Server**
- **General** : Nom = "PostgreSQL" (ou autre)
- **Connection** :
  - Host = `localhost`
  - Port = `5432`
  - Username = `postgres`
  - Password = votre mot de passe PostgreSQL

---

## 💡 Astuces

- **Sauvegarder le mot de passe** : Cochez "Save password" lors de la connexion pour éviter de le retaper
- **Query Tool** : Utilisez **Alt+Shift+Q** pour ouvrir rapidement l'éditeur SQL
- **Rafraîchir** : Clic droit → **Refresh** pour mettre à jour la liste des objets
- **Copier les résultats** : Clic droit sur les résultats → **Copy** → **Copy with headers**

---

---

> 📖 **Retour à l'index** : [README.md](./README.md)

Bon courage ! 🎉







