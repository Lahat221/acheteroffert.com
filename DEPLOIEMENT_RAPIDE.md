# ⚡ Déploiement Rapide - Vous avez déjà Vercel + GitHub

## 🎯 En 3 étapes simples

### 1️⃣ Base de données (5 min) - Supabase

1. Allez sur [supabase.com](https://supabase.com) → Créez un compte
2. **New Project** → Nom : `acheteroffert-test`
3. Notez le mot de passe (important !)
4. Pour trouver le Host :
   - Allez dans **Settings** (⚙️) → **Database**
   - Cherchez la section **"Connection string"** ou **"Connection info"**
   - Vous verrez une URL comme : `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
   - Le **Host** est la partie `db.xxxxx.supabase.co`
   - Notez aussi : Port `5432`, Database `postgres`, User `postgres`

### 2️⃣ Backend (10 min) - Railway

1. Allez sur [railway.app](https://railway.app) → Connectez-vous avec GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Sélectionnez votre repo `acheteroffert`
4. ⚠️ **Settings** → Changez **Root Directory** en `backend`
5. **Variables** → Ajoutez :

```env
NODE_ENV=production
PORT=3001
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe-supabase
DB_DATABASE=postgres
FRONTEND_URL=https://votre-projet.vercel.app
JWT_SECRET=changez-moi-par-une-cle-aleatoire
```

6. Notez l'URL : `https://votre-backend.railway.app`

### 3️⃣ Frontend (5 min) - Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. **Add New Project** → Sélectionnez votre repo
3. ⚠️ **Root Directory** : `frontend`
4. **Environment Variables** → Ajoutez :

```env
NEXT_PUBLIC_API_URL=https://votre-backend.railway.app
```

5. **Deploy** → Notez l'URL : `https://votre-projet.vercel.app`
6. Retournez dans Railway → Mettez à jour `FRONTEND_URL` avec l'URL Vercel

---

## ✅ Test

- Backend : `https://votre-backend.railway.app/offers`
- Frontend : `https://votre-projet.vercel.app`

---

## 📝 Checklist

- [ ] Supabase créé
- [ ] Railway backend déployé
- [ ] Vercel frontend déployé
- [ ] Variables configurées
- [ ] Test réussi

---

**Guide détaillé** : Voir `DEPLOIEMENT_VERCEL.md`

