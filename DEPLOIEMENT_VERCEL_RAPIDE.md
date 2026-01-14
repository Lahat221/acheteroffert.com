# ⚡ Déploiement Vercel - Guide Rapide

## 🎯 En 5 Étapes

### 1️⃣ Backend déployé ? ✅
- Le backend DOIT être déployé sur Railway AVANT
- Notez l'URL : `https://votre-backend.railway.app`

### 2️⃣ Vercel → Import Project
- Allez sur [vercel.com](https://vercel.com)
- Cliquez "Add New Project"
- Sélectionnez votre repository GitHub

### 3️⃣ Configuration
- **Root Directory** : `frontend`
- **Framework** : Next.js (auto-détecté)

### 4️⃣ Variable d'Environnement ⚠️ CRITIQUE
Dans "Environment Variables", ajoutez :

```
NEXT_PUBLIC_API_URL = https://votre-backend.railway.app
```

**⚠️ Remplacez par l'URL RÉELLE de votre backend !**

### 5️⃣ Déployer
- Cliquez "Deploy"
- Attendez 2-5 minutes
- Testez l'URL fournie par Vercel

---

## ❌ Problèmes Courants

### "Failed to fetch"
→ Vérifiez que `NEXT_PUBLIC_API_URL` est bien configurée dans Vercel

### "CORS error"
→ Vérifiez que le backend accepte votre domaine Vercel (déjà configuré dans `main.ts`)

### "Build failed"
→ Vérifiez les logs dans Vercel → Deployments → Logs

---

## 📝 Checklist

- [ ] Backend déployé sur Railway
- [ ] URL backend notée
- [ ] Vercel connecté à GitHub
- [ ] Root Directory = `frontend`
- [ ] `NEXT_PUBLIC_API_URL` configurée
- [ ] Déploiement réussi
- [ ] Site accessible et fonctionnel

---

## 🎉 C'est Tout !

Votre site est maintenant en ligne : `https://votre-projet.vercel.app`

