# 🚀 Guide de Déploiement Vercel - Étape par Étape

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Compte Vercel (gratuit)
- ✅ Compte GitHub avec votre repository
- ✅ Backend déployé sur Railway (ou autre plateforme)
- ✅ URL du backend (ex: `https://votre-backend.railway.app`)

---

## 🎯 Étape 1 : Préparer le Repository GitHub

### 1.1 Vérifier que tout est commité

```powershell
git status
```

Si vous avez des modifications non commitées :

```powershell
git add .
git commit -m "Préparation déploiement Vercel"
git push
```

### 1.2 Vérifier la structure

Votre repository doit avoir cette structure :
```
acheteroffert/
├── frontend/          ← Dossier frontend
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/           ← Dossier backend (déployé ailleurs)
├── vercel.json        ← Configuration Vercel (à la racine)
└── ...
```

---

## 🎯 Étape 2 : Déployer le Backend sur Railway

**⚠️ IMPORTANT : Le backend DOIT être déployé AVANT le frontend !**

Si le backend n'est pas encore déployé, suivez d'abord le guide Railway.

Une fois déployé, notez l'URL du backend :
- Exemple : `https://acheteroffert-backend.railway.app`
- Ou : `https://votre-projet-production.up.railway.app`

---

## 🎯 Étape 3 : Connecter Vercel à GitHub

### 3.1 Aller sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur **"Add New Project"** ou **"Import Project"**

### 3.2 Sélectionner le Repository

1. Sélectionnez votre repository `acheteroffert`
2. Cliquez sur **"Import"**

---

## 🎯 Étape 4 : Configurer Vercel

### 4.1 Configuration du Projet

Dans la page de configuration Vercel :

**Root Directory :**
- Cliquez sur **"Edit"** à côté de "Root Directory"
- Sélectionnez : `frontend`
- Cliquez sur **"Continue"**

**Framework Preset :**
- Vercel devrait détecter automatiquement **Next.js**
- Si ce n'est pas le cas, sélectionnez **"Next.js"**

**Build Command :**
- Laissez par défaut : `npm run build`
- Ou utilisez : `cd frontend && npm run build` (si Root Directory n'est pas configuré)

**Output Directory :**
- Laissez par défaut : `.next`
- Ou : `frontend/.next` (si Root Directory n'est pas configuré)

**Install Command :**
- Laissez par défaut : `npm install`
- Ou : `cd frontend && npm install` (si Root Directory n'est pas configuré)

### 4.2 Variables d'Environnement

**⚠️ CRITIQUE : Configurez cette variable !**

Cliquez sur **"Environment Variables"** et ajoutez :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `NEXT_PUBLIC_API_URL` | `https://votre-backend.railway.app` | Production, Preview, Development |

**Exemple :**
```
NEXT_PUBLIC_API_URL = https://acheteroffert-backend.railway.app
```

**⚠️ Remplacez `votre-backend.railway.app` par l'URL RÉELLE de votre backend !**

### 4.3 Déployer

1. Cliquez sur **"Deploy"**
2. Attendez que le déploiement se termine (2-5 minutes)

---

## 🎯 Étape 5 : Vérifier le Déploiement

### 5.1 Vérifier les Logs

1. Dans Vercel, allez dans votre projet
2. Cliquez sur l'onglet **"Deployments"**
3. Cliquez sur le dernier déploiement
4. Vérifiez les logs pour voir s'il y a des erreurs

### 5.2 Tester le Site

1. Vercel vous donnera une URL : `https://votre-projet.vercel.app`
2. Ouvrez cette URL dans votre navigateur
3. Testez les fonctionnalités :
   - Page d'accueil
   - Liste des offres
   - Connexion vendeur
   - Dashboard vendeur

### 5.3 Vérifier la Connexion Backend

Ouvrez la console du navigateur (F12) et vérifiez :
- ❌ Pas d'erreurs CORS
- ❌ Pas d'erreurs "Failed to fetch"
- ✅ Les appels API fonctionnent

---

## 🔧 Résolution de Problèmes

### ❌ Erreur : "Failed to fetch"

**Cause :** Le frontend ne peut pas joindre le backend.

**Solutions :**
1. Vérifiez que `NEXT_PUBLIC_API_URL` est bien configurée dans Vercel
2. Vérifiez que l'URL du backend est correcte (sans `/` à la fin)
3. Vérifiez que le backend est bien déployé et accessible
4. Testez l'URL du backend directement dans le navigateur

### ❌ Erreur : "CORS policy"

**Cause :** Le backend n'accepte pas les requêtes depuis Vercel.

**Solution :** Dans le backend (`backend/src/main.ts`), vérifiez que CORS accepte votre domaine Vercel :

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://votre-projet.vercel.app',  // ← Ajoutez votre URL Vercel
    'https://*.vercel.app'  // ← Ou utilisez le wildcard
  ],
  // ...
});
```

Puis redéployez le backend.

### ❌ Erreur : "Build failed"

**Cause :** Erreur lors de la compilation.

**Solutions :**
1. Vérifiez les logs de build dans Vercel
2. Testez en local : `cd frontend && npm run build`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### ❌ Erreur : "Root Directory not found"

**Cause :** Vercel ne trouve pas le dossier `frontend`.

**Solution :** 
1. Dans Vercel → Settings → General
2. Vérifiez que "Root Directory" est bien défini à `frontend`
3. Ou utilisez `./frontend`

---

## 📝 Checklist de Déploiement

Avant de dire que c'est terminé, vérifiez :

- [ ] Backend déployé sur Railway et accessible
- [ ] Repository GitHub à jour
- [ ] Vercel connecté au repository
- [ ] Root Directory configuré sur `frontend`
- [ ] Variable `NEXT_PUBLIC_API_URL` configurée dans Vercel
- [ ] Déploiement réussi (pas d'erreurs dans les logs)
- [ ] Site accessible sur l'URL Vercel
- [ ] Page d'accueil s'affiche correctement
- [ ] Les offres se chargent depuis le backend
- [ ] La connexion vendeur fonctionne
- [ ] Le dashboard vendeur fonctionne
- [ ] Pas d'erreurs dans la console du navigateur

---

## 🎉 C'est Terminé !

Une fois tout vérifié, votre site est en ligne et accessible à votre client !

**URL du site :** `https://votre-projet.vercel.app`

**Pour partager avec votre client :**
- Envoyez simplement l'URL Vercel
- Le site est accessible 24/7
- Les mises à jour se font automatiquement à chaque `git push`

---

## 🔄 Mises à Jour Futures

Pour mettre à jour le site :

1. Faites vos modifications en local
2. Testez en local : `cd frontend && npm run dev`
3. Commit et push :
   ```powershell
   git add .
   git commit -m "Description des modifications"
   git push
   ```
4. Vercel déploiera automatiquement la nouvelle version

---

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans Vercel (Deployments → Voir les logs)
2. Vérifiez la console du navigateur (F12)
3. Vérifiez que le backend est bien accessible
4. Vérifiez les variables d'environnement dans Vercel

