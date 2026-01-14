# ⚡ Déploiement Railway - Guide Rapide

## 🎯 En 7 Étapes

### 1️⃣ Préparer GitHub
```powershell
git add .
git commit -m "Préparation déploiement"
git push
```

### 2️⃣ Trouver Infos Supabase
- Supabase → Settings → Database
- Connection string : `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
- Notez : Host, Port, User, Password, Database

### 3️⃣ Créer Projet Railway
- [railway.app](https://railway.app) → New Project
- Deploy from GitHub repo
- Sélectionnez votre repository

### 4️⃣ Configurer Root Directory ⚠️ CRITIQUE
- Settings → Root Directory : `backend`
- Sauvegardez

### 5️⃣ Variables d'Environnement
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

**⚠️ Remplacez par vos vraies valeurs !**

### 6️⃣ Déployer
- Deployments → Redeploy
- Attendez 2-5 minutes
- Vérifiez les logs

### 7️⃣ Noter l'URL
- Settings → Domains
- Notez l'URL : `https://votre-service.railway.app`
- **Cette URL sera utilisée dans Vercel !**

---

## ❌ Problèmes Courants

### "Error creating build plan"
→ Vérifiez que Root Directory = `backend`

### "Database connection failed"
→ Vérifiez toutes les variables `DB_*`

### "Build failed"
→ Vérifiez les logs, souvent c'est `npm ci` qui échoue

---

## 📝 Checklist

- [ ] GitHub à jour
- [ ] Infos Supabase notées
- [ ] Railway projet créé
- [ ] Root Directory = `backend`
- [ ] Toutes les variables configurées
- [ ] Déploiement réussi
- [ ] URL Railway notée

---

## 🎉 C'est Terminé !

Backend en ligne : `https://votre-service.railway.app`

**Prochaine étape :** Déployer le frontend sur Vercel

