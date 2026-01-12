# 🚀 Déploiement avec GitHub

Plusieurs options pour partager votre site via GitHub et permettre à votre collègue de le voir.

## 📋 Options disponibles

### 1. 🟢 Vercel (Recommandé pour Next.js)

**Pourquoi Vercel ?**
- ✅ Gratuit et optimisé pour Next.js
- ✅ Déploiement automatique depuis GitHub
- ✅ URL publique permanente
- ✅ Facile à configurer

**Comment faire :**

1. **Poussez votre code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE_USERNAME/acheteroffert.git
   git push -u origin main
   ```

2. **Connectez Vercel à GitHub**
   - Allez sur https://vercel.com
   - Créez un compte (gratuit)
   - Cliquez sur "Import Project"
   - Connectez votre dépôt GitHub
   - Sélectionnez le dossier `frontend`

3. **Configurez les variables d'environnement**
   - Dans Vercel, allez dans Settings → Environment Variables
   - Ajoutez `NEXT_PUBLIC_API_URL` avec l'URL de votre backend

4. **Déployez !**
   - Vercel déploiera automatiquement
   - Vous obtiendrez une URL publique (ex: `acheteroffert.vercel.app`)

**Résultat :** Votre collègue pourra voir le site à l'URL fournie par Vercel !

---

### 2. 🟡 Netlify (Alternative)

**Pourquoi Netlify ?**
- ✅ Gratuit
- ✅ Facile à configurer
- ✅ Support Next.js

**Comment faire :**

1. **Poussez votre code sur GitHub**

2. **Connectez Netlify à GitHub**
   - Allez sur https://www.netlify.com
   - Créez un compte (gratuit)
   - Cliquez sur "Add new site" → "Import an existing project"
   - Connectez GitHub
   - Sélectionnez votre dépôt et le dossier `frontend`

3. **Configurez**
   - Build command : `npm run build`
   - Publish directory : `.next`

**Résultat :** URL publique Netlify (ex: `acheteroffert.netlify.app`)

---

### 3. 🔵 GitHub Pages (Limité)

**⚠️ Limitation :** GitHub Pages ne supporte pas Next.js directement (statique seulement).

**Solution :** Export statique Next.js OU utiliser une autre option.

---

### 4. 🟣 Déploiement complet (Frontend + Backend)

Pour déployer aussi le backend :

#### Option A : Railway (Recommandé)

**Frontend (Vercel) + Backend + Database (Railway)**

1. **Backend sur Railway**
   - Allez sur https://railway.app
   - Créez un compte (gratuit avec $5 de crédit/mois)
   - Cliquez sur "New Project" → "Deploy from GitHub repo"
   - Sélectionnez votre repo
   - Railway détectera automatiquement NestJS

2. **Base de données PostgreSQL sur Railway**
   - Dans Railway, ajoutez "PostgreSQL"
   - Railway créera automatiquement la base
   - Configurez les variables d'environnement dans votre backend

3. **Frontend sur Vercel**
   - Utilisez l'URL Railway pour `NEXT_PUBLIC_API_URL`

**Résultat :** Site complet en ligne !

#### Option B : Render

**Frontend + Backend + Database sur Render**

1. **Allez sur https://render.com**
2. **Créez un compte gratuit**
3. **Déployez le backend** :
   - New → Web Service
   - Connectez GitHub
   - Build Command : `cd backend && npm install && npm run build`
   - Start Command : `cd backend && npm run start:prod`

4. **Déployez la base de données** :
   - New → PostgreSQL
   - Render créera automatiquement la base

5. **Déployez le frontend** :
   - New → Static Site
   - Build Command : `cd frontend && npm install && npm run build`
   - Publish Directory : `frontend/.next`

---

### 5. 🔵 GitHub Codespaces (Pour travailler ensemble)

**Pourquoi Codespaces ?**
- ✅ Environnement de développement dans le cloud
- ✅ Accessible depuis n'importe où
- ✅ Partageable avec votre collègue
- ✅ Gratuit avec limites

**Comment faire :**

1. **Activez GitHub Codespaces** sur votre repo
   - Allez dans Settings → Codespaces

2. **Créez un codespace**
   - Ouvrez votre repo sur GitHub
   - Cliquez sur "Code" → "Codespaces" → "Create codespace"

3. **Partagez avec votre collègue**
   - Invitez-le comme collaborateur sur le repo
   - Il pourra créer son propre codespace

**Résultat :** Vous travaillez tous les deux sur le même code dans le cloud !

---

## 📊 Comparaison rapide

| Solution | Type | Gratuit | Difficulté | Idéal pour |
|----------|------|---------|------------|------------|
| **Vercel** | Frontend | ✅ Oui | ⭐ Facile | Next.js, démo rapide |
| **Railway** | Backend + DB | ✅ Limité | ⭐⭐ Moyen | Backend complet |
| **Render** | Full Stack | ✅ Limité | ⭐⭐ Moyen | Full stack simple |
| **Netlify** | Frontend | ✅ Oui | ⭐ Facile | Frontend statique |
| **GitHub Pages** | Static | ✅ Oui | ⭐ Facile | Sites statiques uniquement |
| **Codespaces** | Dev Env | ✅ Limité | ⭐⭐⭐ Avancé | Travail collaboratif |

---

## 🚀 Guide rapide : Vercel (Recommandé pour commencer)

### Étape 1 : Préparer le code

1. **Créer un fichier `.gitignore`** (si pas déjà présent) :
```
node_modules/
.env
.env.local
.next/
dist/
*.log
```

2. **Initialiser Git** (si pas déjà fait) :
```bash
git init
git add .
git commit -m "Initial commit"
```

### Étape 2 : Pousser sur GitHub

1. **Créez un repo sur GitHub** : https://github.com/new
2. **Nommez-le** : `acheteroffert` (ou autre)
3. **Poussez votre code** :
```bash
git remote add origin https://github.com/VOTRE_USERNAME/acheteroffert.git
git branch -M main
git push -u origin main
```

### Étape 3 : Déployer sur Vercel

1. **Allez sur** : https://vercel.com/signup
2. **Créez un compte** (gratuit)
3. **Cliquez sur** : "Import Project"
4. **Sélectionnez** : Votre repo GitHub
5. **Configurez** :
   - Framework Preset : Next.js
   - Root Directory : `frontend`
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)

6. **Variables d'environnement** (si vous avez un backend en ligne) :
   - `NEXT_PUBLIC_API_URL` = URL de votre backend
   - Sinon, laissez vide pour utiliser `localhost:3001`

7. **Déployez !**
   - Cliquez sur "Deploy"
   - Attendez quelques minutes
   - Vous obtiendrez une URL (ex: `acheteroffert.vercel.app`)

### Étape 4 : Partager avec votre collègue

Envoyez-lui l'URL Vercel ! 🎉

---

## ⚙️ Configuration recommandée (Frontend + Backend)

### Architecture suggérée :

```
Frontend (Vercel) 
    ↓ API calls
Backend (Railway ou Render)
    ↓ Database
PostgreSQL (Railway ou Render)
```

### Variables d'environnement à configurer :

**Frontend (Vercel) :**
- `NEXT_PUBLIC_API_URL` = URL du backend (Railway/Render)

**Backend (Railway/Render) :**
- `DB_HOST` = Host de la base de données
- `DB_PORT` = Port (généralement 5432)
- `DB_USERNAME` = Utilisateur PostgreSQL
- `DB_PASSWORD` = Mot de passe PostgreSQL
- `DB_DATABASE` = Nom de la base
- `FRONTEND_URL` = URL du frontend (Vercel)

---

## 📝 Notes importantes

1. **Pour un partage rapide** : Utilisez Vercel (frontend seulement)
2. **Pour un déploiement complet** : Vercel (frontend) + Railway (backend + DB)
3. **Pour travailler ensemble** : GitHub Codespaces
4. **Les services gratuits ont des limitations** (trafic, temps de build, etc.)
5. **Vérifiez les quotas gratuits** avant de déployer

---

## 🎯 Recommandation finale

**Pour votre cas (partager avec un collègue) :**

1. **Option rapide** : Vercel (frontend) - 5 minutes
2. **Option complète** : Vercel + Railway - 15-20 minutes
3. **Option temporaire** : ngrok (voir PARTAGE_DISTANT.md) - 2 minutes

**Commencez par Vercel, c'est le plus simple !** 🚀

