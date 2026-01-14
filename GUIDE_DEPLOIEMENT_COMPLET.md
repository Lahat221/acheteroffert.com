# 🚀 Guide Complet - Déploiement Backend + Frontend

## 📋 Vue d'Ensemble

Ce guide vous accompagne pour déployer :
- **Backend** (NestJS) → Railway
- **Frontend** (Next.js) → Vercel
- **Base de données** → Supabase

**Temps estimé :** 30-45 minutes

---

## 🎯 Partie 1 : Déployer le Backend sur Railway

### Étape 1.1 : Préparer GitHub

```powershell
git add .
git commit -m "Préparation déploiement"
git push
```

### Étape 1.2 : Trouver les Infos Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Projet → Settings → Database
3. Connection string : `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
4. Notez :
   - **Host** : `db.xxxxx.supabase.co`
   - **Port** : `5432`
   - **User** : `postgres`
   - **Password** : (votre mot de passe)
   - **Database** : `postgres`

### Étape 1.3 : Créer Projet Railway

1. [railway.app](https://railway.app) → New Project
2. Deploy from GitHub repo
3. Sélectionnez votre repository

### Étape 1.4 : Configurer Railway

**Root Directory :**
- Settings → Root Directory : `backend`

**Variables d'Environnement :**
Dans Railway → Variables, ajoutez :

```env
NODE_ENV=production
PORT=3001
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe
DB_DATABASE=postgres
FRONTEND_URL=https://placeholder.vercel.app
JWT_SECRET=votre-cle-secrete-longue
```

**Générer JWT_SECRET :**
- Allez sur [randomkeygen.com](https://randomkeygen.com)
- Utilisez une "CodeIgniter Encryption Keys" (256 bits)

### Étape 1.5 : Déployer

1. Deployments → Redeploy
2. Attendez 2-5 minutes
3. Vérifiez les logs (pas d'erreurs)

### Étape 1.6 : Noter l'URL Backend

1. Settings → Domains
2. Notez l'URL : `https://votre-backend.railway.app`
3. **⚠️ IMPORTANT :** Vous en aurez besoin pour Vercel !

### Étape 1.7 : Tester le Backend

Ouvrez dans votre navigateur :
```
https://votre-backend.railway.app/offers
```

Vous devriez voir une réponse JSON.

---

## 🎯 Partie 2 : Déployer le Frontend sur Vercel

### Étape 2.1 : Aller sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Add New Project

### Étape 2.2 : Importer le Repository

1. Sélectionnez votre repository `acheteroffert`
2. Cliquez sur "Import"

### Étape 2.3 : Configurer Vercel

**Root Directory :**
- Cliquez sur "Edit" à côté de "Root Directory"
- Sélectionnez : `frontend`
- Cliquez sur "Continue"

**Framework :**
- Vercel devrait détecter automatiquement "Next.js"

### Étape 2.4 : Variable d'Environnement ⚠️ CRITIQUE

Dans "Environment Variables", ajoutez :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | `https://votre-backend.railway.app` |

**⚠️ Remplacez `votre-backend.railway.app` par l'URL RÉELLE de votre backend Railway !**

### Étape 2.5 : Déployer

1. Cliquez sur "Deploy"
2. Attendez 2-5 minutes
3. Vercel vous donnera une URL : `https://votre-projet.vercel.app`

---

## 🎯 Partie 3 : Connecter Backend et Frontend

### Étape 3.1 : Mettre à jour FRONTEND_URL dans Railway

1. Retournez sur Railway
2. Variables → Modifiez `FRONTEND_URL`
3. Remplacez `https://placeholder.vercel.app` par votre URL Vercel réelle
4. Exemple : `https://votre-projet.vercel.app`

### Étape 3.2 : Redéployer le Backend

1. Railway → Deployments → Redeploy
2. Cela met à jour la configuration CORS pour accepter Vercel

---

## 🎯 Partie 4 : Vérifier que Tout Fonctionne

### Checklist de Vérification

- [ ] Backend accessible : `https://votre-backend.railway.app/offers`
- [ ] Frontend accessible : `https://votre-projet.vercel.app`
- [ ] Page d'accueil s'affiche
- [ ] Les offres se chargent (appel API au backend)
- [ ] Connexion vendeur fonctionne
- [ ] Dashboard vendeur fonctionne
- [ ] Pas d'erreurs dans la console (F12)

### Tests à Faire

1. **Page d'accueil :**
   - Ouvrez `https://votre-projet.vercel.app`
   - Vérifiez que les offres s'affichent

2. **Connexion vendeur :**
   - Allez sur `/vendeur/login`
   - Connectez-vous avec vos identifiants
   - Vérifiez que le dashboard s'affiche

3. **Console du navigateur :**
   - Appuyez sur F12
   - Onglet "Console"
   - Vérifiez qu'il n'y a pas d'erreurs "Failed to fetch" ou CORS

---

## 🔧 Résolution de Problèmes

### ❌ Frontend : "Failed to fetch"

**Cause :** Le frontend ne peut pas joindre le backend.

**Solutions :**
1. Vérifiez que `NEXT_PUBLIC_API_URL` est bien configurée dans Vercel
2. Vérifiez que l'URL du backend est correcte (sans `/` à la fin)
3. Vérifiez que le backend est accessible : `https://votre-backend.railway.app/offers`

### ❌ Frontend : "CORS policy"

**Cause :** Le backend n'accepte pas les requêtes depuis Vercel.

**Solution :**
1. Dans Railway, vérifiez que `FRONTEND_URL` contient votre URL Vercel
2. Redéployez le backend
3. Le CORS devrait maintenant accepter votre domaine Vercel

### ❌ Backend : "Database connection failed"

**Cause :** Variables d'environnement incorrectes.

**Solutions :**
1. Vérifiez toutes les variables `DB_*` dans Railway
2. Vérifiez que le mot de passe Supabase est correct
3. Vérifiez que le host Supabase est correct (sans `https://`)

### ❌ Railway : "Error creating build plan"

**Cause :** Root Directory non configuré.

**Solution :**
1. Settings → Root Directory : `backend`
2. Redéployez

---

## 📝 Résumé des URLs

Après le déploiement, vous aurez :

- **Backend :** `https://votre-backend.railway.app`
- **Frontend :** `https://votre-projet.vercel.app`
- **Base de données :** Supabase (gérée automatiquement)

---

## 🎉 C'est Terminé !

Votre site est maintenant en ligne et accessible à votre client !

**Pour partager avec votre client :**
- Envoyez simplement l'URL Vercel : `https://votre-projet.vercel.app`
- Le site est accessible 24/7
- Les mises à jour se font automatiquement à chaque `git push`

---

## 🔄 Mises à Jour Futures

Pour mettre à jour le site :

1. Faites vos modifications en local
2. Testez en local
3. Commit et push :
   ```powershell
   git add .
   git commit -m "Description des modifications"
   git push
   ```
4. Railway et Vercel déploieront automatiquement

---

## 📚 Guides Détaillés

Si vous avez besoin de plus de détails :

- **Backend Railway :** `GUIDE_DEPLOIEMENT_RAILWAY.md`
- **Frontend Vercel :** `GUIDE_DEPLOIEMENT_VERCEL.md`
- **Guides rapides :** `DEPLOIEMENT_RAILWAY_RAPIDE.md` et `DEPLOIEMENT_VERCEL_RAPIDE.md`

