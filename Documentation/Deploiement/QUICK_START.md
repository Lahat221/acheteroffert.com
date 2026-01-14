# Déploiement Rapide - Guide Express

## 🚀 Déploiement en 15 minutes

### 1. Base de données (5 min)

**Option Supabase (Recommandé)**
1. Créez un compte sur [supabase.com](https://supabase.com)
2. Nouveau projet → Notez les credentials
3. Connection String : `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

### 2. Backend Railway (5 min)

1. **Railway.app** → New Project → Deploy from GitHub
2. Sélectionnez le dossier `backend`
3. **Variables d'environnement** :
```env
NODE_ENV=production
PORT=3001
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe
DB_DATABASE=postgres
FRONTEND_URL=https://votre-site.vercel.app (à mettre après)
JWT_SECRET=une-cle-aleatoire-secrete
```
4. Notez l'URL : `https://votre-backend.railway.app`

### 3. Frontend Vercel (5 min)

1. **Vercel.com** → Add New Project → GitHub
2. Root Directory : `frontend`
3. **Environment Variable** :
```env
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app
```
4. Déployez → Notez l'URL : `https://votre-projet.vercel.app`

### 4. Finaliser

1. Retournez dans Railway
2. Mettez à jour `FRONTEND_URL` avec l'URL Vercel
3. Redéployez le backend

### 5. Base de données

Exécutez les migrations et seed depuis Railway terminal ou Supabase SQL Editor.

## ✅ Test

- Frontend : `https://votre-projet.vercel.app`
- Backend : `https://votre-backend.railway.app/offers`

## 📝 Checklist

- [ ] Base de données créée (Supabase)
- [ ] Backend déployé (Railway)
- [ ] Frontend déployé (Vercel)
- [ ] Variables d'environnement configurées
- [ ] CORS mis à jour
- [ ] Base de données initialisée
- [ ] Test des fonctionnalités


