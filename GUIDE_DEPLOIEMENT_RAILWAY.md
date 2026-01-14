# 🚂 Guide Complet - Déploiement Backend sur Railway

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Compte Railway (gratuit) : [railway.app](https://railway.app)
- ✅ Compte Supabase (gratuit) : [supabase.com](https://supabase.com)
- ✅ Projet Supabase créé avec base de données PostgreSQL
- ✅ Repository GitHub avec votre code backend
- ✅ Informations de connexion Supabase (Host, Port, Database, User, Password)

---

## 🎯 Étape 1 : Préparer le Repository GitHub

### 1.1 Vérifier que tout est commité

```powershell
git status
```

Si vous avez des modifications non commitées :

```powershell
git add .
git commit -m "Préparation déploiement Railway"
git push
```

### 1.2 Vérifier la structure

Votre repository doit avoir cette structure :
```
acheteroffert/
├── backend/           ← Dossier backend
│   ├── src/
│   ├── package.json
│   ├── railway.json  ← Configuration Railway
│   ├── nixpacks.toml ← Configuration Nixpacks
│   └── Dockerfile     ← Alternative Docker
└── ...
```

---

## 🎯 Étape 2 : Trouver les Informations Supabase

### 2.1 Aller sur Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous
3. Sélectionnez votre projet (ou créez-en un)

### 2.2 Trouver la Connection String

1. Dans votre projet Supabase, allez dans **Settings** (⚙️ en bas à gauche)
2. Cliquez sur **Database**
3. Faites défiler jusqu'à **"Connection string"** ou **"Connection info"**
4. Cliquez sur **"URI"** ou **"Session Pooler"**

Vous verrez quelque chose comme :
```
postgresql://postgres:[PASSWORD]@db.pdeeieqmgrjldwkkdzqy.supabase.co:5432/postgres
```

### 2.3 Extraire les Informations

De cette connection string, extrayez :

- **DB_HOST** : `db.pdeeieqmgrjldwkkdzqy.supabase.co`
- **DB_PORT** : `5432`
- **DB_USERNAME** : `postgres`
- **DB_PASSWORD** : `[PASSWORD]` (le mot de passe que vous avez créé)
- **DB_DATABASE** : `postgres`

**💡 Astuce :** Si vous avez oublié le mot de passe :
- Settings → Database → "Reset database password"

---

## 🎯 Étape 3 : Créer un Projet sur Railway

### 3.1 Aller sur Railway

1. Allez sur [railway.app](https://railway.app)
2. Connectez-vous avec GitHub
3. Cliquez sur **"New Project"**

### 3.2 Importer depuis GitHub

1. Sélectionnez **"Deploy from GitHub repo"**
2. Autorisez Railway à accéder à votre GitHub si demandé
3. Sélectionnez votre repository `acheteroffert`
4. Cliquez sur **"Deploy Now"**

**⚠️ ATTENTION :** Railway va essayer de déployer automatiquement, mais ça va échouer. C'est normal, on va corriger la configuration.

---

## 🎯 Étape 4 : Configurer Railway

### 4.1 Configurer le Root Directory

1. Dans Railway, ouvrez votre projet
2. Cliquez sur le service créé (probablement nommé "acheteroffert")
3. Allez dans l'onglet **"Settings"**
4. Faites défiler jusqu'à **"Root Directory"**
5. Cliquez sur **"Edit"**
6. Entrez : `backend`
7. Cliquez sur **"Save"**

**⚠️ CRITIQUE :** Sans cette configuration, Railway ne trouvera pas votre `package.json` !

### 4.2 Vérifier les Commandes de Build

Dans **Settings** → **Build & Deploy** :

- **Build Command** : `npm ci && npm run build`
- **Start Command** : `npm run start:prod`

Ces commandes sont déjà définies dans `railway.json`, mais vérifiez qu'elles sont correctes.

---

## 🎯 Étape 5 : Configurer les Variables d'Environnement

### 5.1 Aller dans Variables

1. Dans Railway, ouvrez votre service
2. Allez dans l'onglet **"Variables"**
3. Cliquez sur **"New Variable"**

### 5.2 Ajouter les Variables

Ajoutez ces variables une par une :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `NODE_ENV` | `production` | Environnement de production |
| `PORT` | `3001` | Port du serveur (Railway peut changer ça) |
| `DB_HOST` | `db.xxxxx.supabase.co` | Host Supabase (remplacez par le vôtre) |
| `DB_PORT` | `5432` | Port PostgreSQL |
| `DB_USERNAME` | `postgres` | Utilisateur PostgreSQL |
| `DB_PASSWORD` | `votre-mot-de-passe` | Mot de passe Supabase |
| `DB_DATABASE` | `postgres` | Nom de la base de données |
| `FRONTEND_URL` | `https://placeholder.vercel.app` | URL temporaire (à mettre à jour après Vercel) |
| `JWT_SECRET` | `votre-cle-secrete-longue` | Clé secrète JWT (générez-en une) |

### 5.3 Générer un JWT_SECRET

Pour générer un JWT_SECRET sécurisé, vous pouvez :

**Option 1 : En ligne**
- Allez sur [randomkeygen.com](https://randomkeygen.com)
- Utilisez une "CodeIgniter Encryption Keys" (256 bits)

**Option 2 : En PowerShell**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Option 3 : Simple**
Utilisez une longue chaîne aléatoire, par exemple :
```
acheteroffert-jwt-secret-2024-super-securise-xyz123456789
```

### 5.4 Exemple de Variables

```env
NODE_ENV=production
PORT=3001
DB_HOST=db.pdeeieqmgrjldwkkdzqy.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mon-mot-de-passe-supabase-123
DB_DATABASE=postgres
FRONTEND_URL=https://placeholder.vercel.app
JWT_SECRET=ma-cle-secrete-super-longue-et-aleatoire-123456789
```

**⚠️ IMPORTANT :**
- Remplacez `db.pdeeieqmgrjldwkkdzqy.supabase.co` par VOTRE host Supabase
- Remplacez `mon-mot-de-passe-supabase-123` par VOTRE mot de passe
- Remplacez `JWT_SECRET` par une clé que vous générez

---

## 🎯 Étape 6 : Déployer

### 6.1 Redéployer

1. Dans Railway, allez dans l'onglet **"Deployments"**
2. Cliquez sur **"Redeploy"** ou **"Deploy"**
3. Attendez que le déploiement se termine (2-5 minutes)

### 6.2 Vérifier les Logs

1. Pendant le déploiement, cliquez sur **"View Logs"**
2. Vérifiez qu'il n'y a pas d'erreurs :
   - ✅ `npm ci` se termine sans erreur
   - ✅ `npm run build` se termine sans erreur
   - ✅ `npm run start:prod` démarre le serveur
   - ✅ `Application demarree sur http://localhost:3001`

### 6.3 Vérifier l'URL du Service

1. Dans Railway, allez dans l'onglet **"Settings"**
2. Faites défiler jusqu'à **"Domains"**
3. Railway vous donne une URL : `https://votre-service.railway.app`
4. **Notez cette URL**, vous en aurez besoin pour Vercel !

---

## 🎯 Étape 7 : Tester le Backend

### 7.1 Tester l'API

Ouvrez votre navigateur et testez :

```
https://votre-service.railway.app/offers
```

Vous devriez voir une réponse JSON (liste d'offres ou tableau vide).

### 7.2 Tester avec curl (optionnel)

```powershell
curl https://votre-service.railway.app/offers
```

### 7.3 Vérifier les Logs

Dans Railway → **Logs**, vérifiez qu'il n'y a pas d'erreurs de connexion à la base de données.

---

## 🔧 Résolution de Problèmes

### ❌ Erreur : "Error creating build plan with Railpack"

**Cause :** Root Directory non configuré ou incorrect.

**Solution :**
1. Vérifiez que **Root Directory** est bien défini à `backend`
2. Vérifiez que `backend/package.json` existe
3. Redéployez

### ❌ Erreur : "Cannot find module"

**Cause :** Dépendances non installées.

**Solution :**
1. Vérifiez que `npm ci` s'exécute correctement dans les logs
2. Vérifiez que `backend/package-lock.json` existe
3. Si nécessaire, dans Railway → Settings → Build Command, utilisez : `npm install && npm run build`

### ❌ Erreur : "Connection refused" ou "Database connection failed"

**Cause :** Variables d'environnement incorrectes ou base de données inaccessible.

**Solutions :**
1. Vérifiez toutes les variables `DB_*` dans Railway → Variables
2. Vérifiez que le mot de passe Supabase est correct
3. Vérifiez que le host Supabase est correct (sans `https://` ou `http://`)
4. Dans Supabase, vérifiez que la base de données est active

### ❌ Erreur : "Port already in use"

**Cause :** Conflit de port.

**Solution :**
- Railway gère automatiquement le port via la variable `PORT`
- Vérifiez que `PORT=3001` est défini dans les variables
- Railway peut aussi utiliser `$PORT` automatiquement

### ❌ Erreur : "Build timeout"

**Cause :** Le build prend trop de temps.

**Solutions :**
1. Vérifiez que `npm ci` est utilisé (plus rapide que `npm install`)
2. Vérifiez que `backend/node_modules` n'est pas commité (dans `.gitignore`)
3. Si nécessaire, augmentez le timeout dans Railway Settings

---

## 📝 Checklist de Déploiement

Avant de dire que c'est terminé, vérifiez :

- [ ] Repository GitHub à jour
- [ ] Projet Railway créé
- [ ] Root Directory configuré sur `backend`
- [ ] Toutes les variables d'environnement configurées
- [ ] `DB_HOST`, `DB_PASSWORD` corrects
- [ ] `JWT_SECRET` généré et configuré
- [ ] Déploiement réussi (pas d'erreurs dans les logs)
- [ ] URL Railway notée (ex: `https://votre-service.railway.app`)
- [ ] API accessible (test avec `/offers`)
- [ ] Pas d'erreurs dans les logs Railway

---

## 🎉 C'est Terminé !

Une fois tout vérifié, votre backend est en ligne et accessible !

**URL du backend :** `https://votre-service.railway.app`

**Prochaine étape :** Déployer le frontend sur Vercel avec cette URL dans `NEXT_PUBLIC_API_URL`

---

## 🔄 Mises à Jour Futures

Pour mettre à jour le backend :

1. Faites vos modifications en local
2. Testez en local : `cd backend && npm run dev`
3. Commit et push :
   ```powershell
   git add .
   git commit -m "Description des modifications"
   git push
   ```
4. Railway déploiera automatiquement la nouvelle version

---

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans Railway (Deployments → View Logs)
2. Vérifiez que toutes les variables d'environnement sont correctes
3. Vérifiez que le Root Directory est bien `backend`
4. Vérifiez que Supabase est accessible

---

## 📚 Fichiers de Configuration

Votre projet contient déjà ces fichiers de configuration :

- `backend/railway.json` - Configuration Railway
- `backend/nixpacks.toml` - Configuration Nixpacks
- `backend/Dockerfile` - Alternative Docker

Ces fichiers sont déjà configurés correctement, vous n'avez qu'à suivre les étapes ci-dessus !

