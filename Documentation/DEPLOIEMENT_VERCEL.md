# 🚀 Déploiement avec Vercel (Vous avez déjà Vercel + GitHub)

## Vue d'ensemble rapide

Vous avez déjà :
- ✅ Vercel
- ✅ GitHub

Il vous faut :
- 🔲 Base de données PostgreSQL (Supabase - gratuit)
- 🔲 Backend déployé (Railway ou Render - gratuit)

---

## Étape 1 : Base de données PostgreSQL (5 min)

### Option A : Supabase (Recommandé - Gratuit)

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte (gratuit)
3. Cliquez sur "New Project"
4. Remplissez :
   - **Name** : `acheteroffert-test`
   - **Database Password** : (choisissez un mot de passe fort, notez-le !)
   - **Region** : Choisissez le plus proche (Europe)
5. Attendez 2-3 minutes que le projet soit créé
6. Allez dans **Settings** → **Database**
7. Notez ces informations :
   - **Host** : `db.xxxxx.supabase.co`
   - **Port** : `5432`
   - **Database** : `postgres`
   - **User** : `postgres`
   - **Password** : (celui que vous avez créé)

### Option B : Railway PostgreSQL

1. Allez sur [railway.app](https://railway.app)
2. Créez un compte avec GitHub
3. Créez un nouveau projet
4. Ajoutez un service **PostgreSQL**
5. Récupérez les variables d'environnement dans l'onglet "Variables"

---

## Étape 2 : Déployer le Backend (10 min)

### Option A : Railway (Recommandé - Gratuit)

1. Allez sur [railway.app](https://railway.app)
2. Connectez-vous avec GitHub (si pas déjà fait)
3. Cliquez sur **"New Project"**
4. Sélectionnez **"Deploy from GitHub repo"**
5. Sélectionnez votre repository `acheteroffert`
6. Railway va détecter automatiquement le projet
7. **IMPORTANT** : Dans les settings du service, changez le **Root Directory** en `backend`
8. Allez dans l'onglet **"Variables"** et ajoutez :

```env
NODE_ENV=production
PORT=3001

# Base de données (remplacez par vos valeurs Supabase)
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe-supabase
DB_DATABASE=postgres

# CORS - sera mis à jour après déploiement frontend
FRONTEND_URL=https://votre-projet.vercel.app

# JWT Secret (générez une clé aléatoire)
JWT_SECRET=changez-moi-par-une-cle-aleatoire-longue-et-secrete
```

9. Railway va automatiquement :
   - Installer les dépendances (`npm install`)
   - Builder le projet (`npm run build`)
   - Démarrer le serveur (`npm run start:prod`)

10. Une fois déployé, notez l'URL : `https://votre-backend.railway.app`

### Option B : Render (Alternative)

1. Allez sur [render.com](https://render.com)
2. Créez un compte avec GitHub
3. Cliquez sur **"New +"** → **"Web Service"**
4. Connectez votre repository GitHub
5. Configurez :
   - **Name** : `acheteroffert-backend`
   - **Root Directory** : `backend`
   - **Environment** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm run start:prod`
6. Ajoutez les mêmes variables d'environnement que ci-dessus
7. Cliquez sur **"Create Web Service"**

---

## Étape 3 : Déployer le Frontend sur Vercel (5 min)

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New Project"** (ou **"Import Project"**)
3. Sélectionnez votre repository GitHub `acheteroffert`
4. **Configuration du projet** :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `frontend` ⚠️ **IMPORTANT**
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)
5. Cliquez sur **"Environment Variables"**
6. Ajoutez cette variable :

```env
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app
```

⚠️ **Remplacez** `https://votre-backend.railway.app` par l'URL réelle de votre backend Railway/Render

7. Cliquez sur **"Deploy"**
8. Attendez 2-3 minutes
9. Une fois déployé, notez l'URL : `https://votre-projet.vercel.app`

---

## Étape 4 : Finaliser la configuration (2 min)

1. Retournez dans **Railway** ou **Render** (backend)
2. Allez dans les **Variables d'environnement**
3. Mettez à jour `FRONTEND_URL` avec l'URL Vercel exacte :

```env
FRONTEND_URL=https://votre-projet.vercel.app
```

4. Redéployez le backend (Railway le fait automatiquement, Render : cliquez sur "Manual Deploy")

---

## Étape 5 : Initialiser la base de données (5 min)

### Option A : Via Supabase SQL Editor

1. Allez dans votre projet Supabase
2. Cliquez sur **SQL Editor** dans le menu de gauche
3. Exécutez les scripts de création de tables (si vous en avez)
4. Exécutez le script de seed pour insérer les données de test

### Option B : Via Railway Terminal

1. Dans Railway, allez dans votre service backend
2. Cliquez sur l'onglet **"Deployments"**
3. Cliquez sur le dernier déploiement
4. Ouvrez le **Terminal**
5. Exécutez :

```bash
cd backend
node database/seed-offres-accueil.js
```

---

## ✅ Test du déploiement

### 1. Tester le Backend

Ouvrez dans votre navigateur :
```
https://votre-backend.railway.app/offers
```

Vous devriez voir une réponse JSON avec les offres.

### 2. Tester le Frontend

Ouvrez dans votre navigateur :
```
https://votre-projet.vercel.app
```

Vérifiez que :
- ✅ La page d'accueil se charge
- ✅ Les offres s'affichent
- ✅ Les filtres fonctionnent
- ✅ L'espace vendeur est accessible (`/vendeur/login`)
- ✅ La connexion fonctionne avec votre compte `lahat221@gmail.com`

---

## 🔧 Configuration des variables d'environnement

### Backend (Railway/Render)

```env
NODE_ENV=production
PORT=3001
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe
DB_DATABASE=postgres
FRONTEND_URL=https://votre-projet.vercel.app
JWT_SECRET=une-cle-aleatoire-longue-et-secrete
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app
```

---

## 🐛 Dépannage

### Le frontend ne charge pas les offres

1. Vérifiez que `NEXT_PUBLIC_API_URL` est bien configuré dans Vercel
2. Ouvrez la console du navigateur (F12) → onglet "Console"
3. Vérifiez les erreurs réseau dans l'onglet "Network"
4. Vérifiez les logs Vercel : Dashboard → Votre projet → "Functions" ou "Deployments"

### Erreur CORS

1. Vérifiez que `FRONTEND_URL` dans le backend correspond EXACTEMENT à l'URL Vercel
2. Pas de slash à la fin : `https://votre-projet.vercel.app` (pas `/`)
3. Redéployez le backend après modification

### Erreur de connexion à la base de données

1. Vérifiez les variables d'environnement dans Railway/Render
2. Vérifiez que le mot de passe Supabase est correct
3. Testez la connexion depuis Supabase SQL Editor

### Le backend ne démarre pas

1. Vérifiez les logs dans Railway/Render
2. Vérifiez que toutes les variables d'environnement sont définies
3. Vérifiez que le Root Directory est bien `backend`

---

## 📊 URLs importantes

Notez ces URLs après déploiement :

- **Frontend Vercel** : `https://votre-projet.vercel.app`
- **Backend Railway/Render** : `https://votre-backend.railway.app`
- **Base de données Supabase** : (gérée via Supabase Dashboard)

---

## 🎯 Checklist finale

- [ ] Base de données Supabase créée
- [ ] Backend déployé sur Railway/Render
- [ ] Variables d'environnement backend configurées
- [ ] Frontend déployé sur Vercel
- [ ] Variable `NEXT_PUBLIC_API_URL` configurée dans Vercel
- [ ] `FRONTEND_URL` mis à jour dans le backend
- [ ] Base de données initialisée (migrations + seed)
- [ ] Test du backend : `/offers` fonctionne
- [ ] Test du frontend : page d'accueil charge les offres
- [ ] Test de l'espace vendeur : connexion fonctionne

---

## 🚀 C'est prêt !

Une fois tout déployé, partagez l'URL Vercel avec votre client :
```
https://votre-projet.vercel.app
```

Ils pourront tester toutes les fonctionnalités en ligne !

---

## 💡 Astuces

- **Domaine personnalisé** : Vous pouvez ajouter un domaine personnalisé dans Vercel (Settings → Domains)
- **Environnements** : Vercel gère automatiquement Preview, Staging et Production
- **Logs** : Consultez les logs en temps réel dans Railway/Render et Vercel
- **Redéploiement** : Chaque push sur GitHub redéploie automatiquement


