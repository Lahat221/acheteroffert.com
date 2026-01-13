# Guide de Déploiement - Version Test

Ce guide vous permet de déployer votre projet en ligne pour que votre client puisse tester les fonctionnalités.

## Architecture de déploiement

- **Frontend (Next.js)** : Vercel (gratuit, facile)
- **Backend (NestJS)** : Railway ou Render (gratuit pour les tests)
- **Base de données PostgreSQL** : Supabase ou Railway PostgreSQL (gratuit)

---

## Étape 1 : Préparer la base de données PostgreSQL en ligne

### Option A : Supabase (Recommandé - Gratuit)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez les informations de connexion :
   - **Host** : `db.xxxxx.supabase.co`
   - **Port** : `5432`
   - **Database** : `postgres`
   - **User** : `postgres`
   - **Password** : (celui que vous avez défini)
   - **Connection String** : `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

### Option B : Railway PostgreSQL

1. Créez un compte sur [railway.app](https://railway.app)
2. Créez un nouveau projet
3. Ajoutez un service PostgreSQL
4. Récupérez les variables d'environnement depuis l'onglet "Variables"

---

## Étape 2 : Déployer le Backend (NestJS)

### Option A : Railway (Recommandé)

1. **Créer un compte Railway**
   - Allez sur [railway.app](https://railway.app)
   - Connectez-vous avec GitHub

2. **Créer un nouveau projet**
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Sélectionnez votre repository
   - Choisissez le dossier `backend`

3. **Configurer les variables d'environnement**
   - Dans votre projet Railway, allez dans "Variables"
   - Ajoutez les variables suivantes :

```env
NODE_ENV=production
PORT=3001

# Base de données PostgreSQL
DB_HOST=votre-host-supabase-ou-railway
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe
DB_DATABASE=postgres

# CORS - URL du frontend (sera mis à jour après déploiement du frontend)
FRONTEND_URL=https://votre-site-vercel.vercel.app

# JWT Secret (générez une clé aléatoire)
JWT_SECRET=votre-cle-secrete-aleatoire
```

4. **Déployer**
   - Railway détecte automatiquement que c'est un projet Node.js
   - Il va installer les dépendances et builder le projet
   - Le backend sera accessible sur une URL comme : `https://votre-backend.railway.app`

5. **Notez l'URL du backend** pour l'étape suivante

### Option B : Render

1. Créez un compte sur [render.com](https://render.com)
2. Créez un nouveau "Web Service"
3. Connectez votre repository GitHub
4. Configurez :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm run start:prod`
5. Ajoutez les mêmes variables d'environnement que ci-dessus
6. Déployez

---

## Étape 3 : Déployer le Frontend (Next.js) sur Vercel

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "Add New Project"
   - Sélectionnez votre repository
   - Configurez :
     - **Framework Preset** : Next.js
     - **Root Directory** : `frontend`
     - **Build Command** : `npm run build` (par défaut)
     - **Output Directory** : `.next` (par défaut)

3. **Configurer les variables d'environnement**
   - Dans "Environment Variables", ajoutez :

```env
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app
```

4. **Déployer**
   - Cliquez sur "Deploy"
   - Vercel va builder et déployer votre frontend
   - Vous obtiendrez une URL comme : `https://votre-projet.vercel.app`

5. **Mettre à jour le CORS du backend**
   - Retournez dans Railway/Render
   - Mettez à jour la variable `FRONTEND_URL` avec l'URL Vercel
   - Redéployez le backend

---

## Étape 4 : Mettre à jour les URLs dans le code

### Frontend - Créer un fichier de configuration

Créez `frontend/src/config/api.ts` :

```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

### Mettre à jour tous les appels API

Remplacez tous les `http://localhost:3001` par `API_URL` dans :
- `frontend/src/lib/api.ts`
- `frontend/src/app/vendeur/**/*.tsx`

---

## Étape 5 : Initialiser la base de données

1. **Se connecter à la base de données en ligne**
   - Utilisez un client PostgreSQL (pgAdmin, DBeaver, ou Supabase SQL Editor)

2. **Exécuter les migrations**
   - Soit via Railway/Render (terminal)
   - Soit manuellement en exécutant les scripts SQL

3. **Insérer les données de test**
   - Exécutez le script `backend/database/seed-offres-accueil.js` (adapté pour la base en ligne)

---

## Étape 6 : Tester le déploiement

1. **Tester le backend**
   - Visitez : `https://votre-backend.railway.app/offers`
   - Vous devriez voir une réponse JSON

2. **Tester le frontend**
   - Visitez : `https://votre-projet.vercel.app`
   - Vérifiez que les offres se chargent
   - Testez la connexion vendeur

3. **Vérifier les fonctionnalités**
   - ✅ Page d'accueil avec offres
   - ✅ Filtres et recherche
   - ✅ Espace vendeur (connexion)
   - ✅ Dashboard vendeur
   - ✅ Gestion des offres

---

## URLs importantes

- **Frontend** : `https://votre-projet.vercel.app`
- **Backend API** : `https://votre-backend.railway.app`
- **Base de données** : (gérée par Supabase/Railway)

---

## Dépannage

### Le frontend ne charge pas les offres

1. Vérifiez que `NEXT_PUBLIC_API_URL` est bien configuré dans Vercel
2. Vérifiez les logs Vercel pour les erreurs
3. Vérifiez que le backend est accessible depuis le navigateur

### Erreur CORS

1. Vérifiez que `FRONTEND_URL` dans le backend correspond exactement à l'URL Vercel
2. Redéployez le backend après modification

### Erreur de connexion à la base de données

1. Vérifiez les variables d'environnement dans Railway/Render
2. Vérifiez que la base de données est accessible depuis l'extérieur
3. Vérifiez les credentials

### Les images ne s'affichent pas

1. Vérifiez que le dossier `uploads` est bien configuré
2. Pour Railway/Render, utilisez un service de stockage (S3, Cloudinary) pour les images

---

## Coûts

- **Vercel** : Gratuit (plan Hobby)
- **Railway** : Gratuit (500h/mois, $5 crédit)
- **Render** : Gratuit (plan Free avec limitations)
- **Supabase** : Gratuit (500MB base de données)

---

## Prochaines étapes

1. ✅ Déployer la base de données
2. ✅ Déployer le backend
3. ✅ Déployer le frontend
4. ✅ Tester toutes les fonctionnalités
5. ✅ Partager l'URL avec votre client

---

## Support

En cas de problème, vérifiez :
- Les logs dans Railway/Render pour le backend
- Les logs dans Vercel pour le frontend
- La console du navigateur pour les erreurs frontend

