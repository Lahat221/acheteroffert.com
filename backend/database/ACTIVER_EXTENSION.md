# 🔧 Activer l'extension uuid-ossp dans votre base de données

> 📖 **Retour à l'index** : [README.md](./README.md)

---

## 🎯 Problème
Vous obtenez l'erreur : `ERROR: function uuid_generate_v4() does not exist`

Cela signifie que l'extension `uuid-ossp` n'est pas activée dans votre base de données.

---

## ✅ Solution : Activer l'extension

### Étape 1 : Vérifier quelle base de données vous utilisez

Dans pgAdmin, regardez l'onglet actif :
- Si vous voyez `postgres/postgres@ServeurSQL` → vous êtes dans la base `postgres`
- Si vous voyez `acheteroffert/postgres@ServeurSQL` → vous êtes dans la base `acheteroffert`

---

### Étape 2 : Créer la base de données `acheteroffert` (si elle n'existe pas)

1. Dans le panneau de gauche, **cliquez droit** sur **Databases**
2. Sélectionnez **Create** → **Database...**
3. Dans la fenêtre qui s'ouvre :
   - **Database** : tapez `acheteroffert`
   - **Owner** : laissez `postgres`
4. Cliquez sur **Save**

---

### Étape 3 : Activer l'extension dans la base `acheteroffert`

#### Méthode 1 : Via l'interface graphique (recommandé)

1. Dans le panneau de gauche, **développez** la base de données **acheteroffert** :
   - Cliquez sur la flèche à côté de **Databases**
   - Cliquez sur la flèche à côté de **acheteroffert**
   - Cliquez sur la flèche à côté de **Extensions**

2. **Cliquez droit** sur **Extensions** → **Create** → **Extension...**

3. Dans la fenêtre qui s'ouvre :
   - **Name** : tapez ou sélectionnez `uuid-ossp`
   - Laissez les autres options par défaut

4. Cliquez sur **Save**

✅ L'extension est maintenant activée !

---

#### Méthode 2 : Via Query Tool (alternative)

1. **Important** : Assurez-vous d'être connecté à la base `acheteroffert`
   - Dans le panneau de gauche, **cliquez droit** sur **acheteroffert**
   - Sélectionnez **Query Tool** (ou appuyez sur **Alt+Shift+Q**)

2. Dans l'éditeur SQL, tapez cette commande :
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

3. Cliquez sur le bouton **▶ Execute** (ou appuyez sur **F5**)

4. Vous devriez voir le message : **"Query returned successfully in X ms"**

✅ L'extension est maintenant activée !

---

### Étape 4 : Vérifier que l'extension fonctionne

Dans le **Query Tool** de la base `acheteroffert`, exécutez :

```sql
-- Vérifier que l'extension est installée
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';
```

Vous devriez voir une ligne avec `uuid-ossp`.

Puis testez la génération d'UUID :

```sql
-- Générer un UUID
SELECT uuid_generate_v4();
```

Vous devriez voir un UUID généré (ex: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

✅ **Si ça fonctionne, l'extension est correctement activée !**

---

## ⚠️ Important

- L'extension doit être activée **dans chaque base de données** où vous voulez l'utiliser
- Si vous activez l'extension dans `postgres`, elle ne sera **pas** disponible dans `acheteroffert`
- Vous devez activer l'extension **dans la base `acheteroffert`** pour que votre application fonctionne

---

## 🐛 Dépannage

### Erreur : "permission denied to create extension"
- Assurez-vous d'être connecté en tant que `postgres` (superutilisateur)
- Ou connectez-vous avec un utilisateur ayant les droits d'administration

### L'extension n'apparaît pas dans la liste
- Utilisez la **Méthode 2** (Query Tool) pour forcer la création
- Vérifiez que vous êtes bien dans la base `acheteroffert`

### La fonction uuid_generate_v4() ne fonctionne toujours pas
- Vérifiez que vous exécutez la requête **dans la base `acheteroffert`**
- Vérifiez que l'extension est bien activée avec : `SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';`

---

## 🚀 Prochaines étapes

Une fois l'extension activée, vous pouvez :
1. Créer le fichier `.env` dans `backend/` avec vos identifiants (voir `../CREER_ENV.md`)
2. Exécuter les migrations pour créer les tables : `npm run migration:run`
3. (Optionnel) Ajouter des données de test : voir [README_SEED.md](./README_SEED.md)
4. Lancer votre application NestJS : `npm run dev`

---

> 📖 **Retour à l'index** : [README.md](./README.md)

Bon courage ! 🎉





