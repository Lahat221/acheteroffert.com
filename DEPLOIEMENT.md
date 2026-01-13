# 🚀 Guide de Déploiement - Version Test

## Vue d'ensemble

Ce guide vous permet de déployer votre projet en ligne pour que votre client puisse tester les fonctionnalités.

**Architecture :**
- Frontend (Next.js) → **Vercel** (gratuit)
- Backend (NestJS) → **Railway** ou **Render** (gratuit)
- Base de données PostgreSQL → **Supabase** (gratuit)

---

## 📋 Checklist de déploiement

### Étape 1 : Base de données PostgreSQL (5 min)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez les informations de connexion :
   - Host : `db.xxxxx.supabase.co`
   - Port : `5432`
   - Database : `postgres`
   - User : `postgres`
   - Password : (celui que vous avez défini)

### Étape 2 : Déployer le Backend (10 min)

#### Option A : Railway (Recommandé)

1. Allez sur [railway.app](https://railway.app) et connectez-vous avec GitHub
2. Créez un nouveau projet → "Deploy from GitHub repo"
3. Sélectionnez votre repository et le dossier `backend`
4. Configurez les variables d'environnement :

```env
NODE_ENV=production
PORT=3001
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe
DB_DATABASE=postgres
FRONTEND_URL=https://votre-site.vercel.app (à mettre après déploiement frontend)
JWT_SECRET=une-cle-aleatoire-secrete-longue
```

5. Railway va automatiquement builder et déployer
6. Notez l'URL : `https://votre-backend.railway.app`

#### Option B : Render

1. Créez un compte sur [render.com](https://render.com)
2. Créez un nouveau "Web Service"
3. Connectez votre repository GitHub
4. Configurez :
   - Root Directory : `backend`
   - Build Command : `npm install && npm run build`
   - Start Command : `npm run start:prod`
5. Ajoutez les mêmes variables d'environnement
6. Déployez

### Étape 3 : Déployer le Frontend (5 min)

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub
2. Cliquez sur "Add New Project"
3. Sélectionnez votre repository
4. Configurez :
   - Framework Preset : Next.js
   - Root Directory : `frontend`
5. Ajoutez la variable d'environnement :

```env
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app
```

6. Cliquez sur "Deploy"
7. Notez l'URL : `https://votre-projet.vercel.app`

### Étape 4 : Finaliser la configuration (2 min)

1. Retournez dans Railway/Render
2. Mettez à jour `FRONTEND_URL` avec l'URL Vercel exacte
3. Redéployez le backend

### Étape 5 : Initialiser la base de données (5 min)

1. Connectez-vous à votre base de données Supabase
2. Exécutez les migrations SQL (si vous en avez)
3. Exécutez le script de seed pour insérer les données de test

---

## 🔧 Fichiers de configuration créés

- ✅ `frontend/src/config/api.ts` - Configuration centralisée de l'API
- ✅ `backend/Dockerfile` - Pour le déploiement Docker
- ✅ `backend/railway.json` - Configuration Railway
- ✅ `vercel.json` - Configuration Vercel (optionnel)
- ✅ `.env.example` - Exemple de variables d'environnement

---

## ✅ Test du déploiement

### Backend
- Visitez : `https://votre-backend.railway.app/offers`
- Vous devriez voir une réponse JSON avec les offres

### Frontend
- Visitez : `https://votre-projet.vercel.app`
- Vérifiez que :
  - ✅ La page d'accueil se charge
  - ✅ Les offres s'affichent
  - ✅ Les filtres fonctionnent
  - ✅ L'espace vendeur est accessible
  - ✅ La connexion vendeur fonctionne

---

## 🐛 Dépannage

### Le frontend ne charge pas les offres

1. Vérifiez la variable `NEXT_PUBLIC_API_URL` dans Vercel
2. Vérifiez les logs Vercel (onglet "Functions")
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

### Erreur CORS

1. Vérifiez que `FRONTEND_URL` dans le backend correspond EXACTEMENT à l'URL Vercel
2. Redéployez le backend après modification

### Erreur de connexion à la base de données

1. Vérifiez les variables d'environnement dans Railway/Render
2. Vérifiez que la base de données Supabase accepte les connexions externes
3. Testez la connexion avec un client PostgreSQL

### Les images ne s'affichent pas

1. Les images uploadées nécessitent un service de stockage (S3, Cloudinary)
2. Pour l'instant, utilisez des URLs d'images externes (Unsplash, etc.)

---

## 📊 Coûts

- **Vercel** : Gratuit (plan Hobby)
- **Railway** : Gratuit (500h/mois, $5 crédit)
- **Render** : Gratuit (plan Free avec limitations)
- **Supabase** : Gratuit (500MB base de données)

---

## 🔗 URLs importantes

Après déploiement, notez ces URLs :

- **Frontend** : `https://votre-projet.vercel.app`
- **Backend API** : `https://votre-backend.railway.app`
- **Base de données** : (gérée par Supabase)

---

## 📝 Prochaines étapes

1. ✅ Déployer la base de données
2. ✅ Déployer le backend
3. ✅ Déployer le frontend
4. ✅ Tester toutes les fonctionnalités
5. ✅ Partager l'URL avec votre client

---

## 📚 Documentation complète

Pour plus de détails, consultez :
- `Documentation/Deploiement/GUIDE_DEPLOIEMENT_TEST.md` - Guide détaillé
- `Documentation/Deploiement/QUICK_START.md` - Guide express

---

## 🆘 Support

En cas de problème :
1. Vérifiez les logs dans Railway/Render (backend)
2. Vérifiez les logs dans Vercel (frontend)
3. Vérifiez la console du navigateur (F12)
4. Vérifiez que toutes les variables d'environnement sont correctes

