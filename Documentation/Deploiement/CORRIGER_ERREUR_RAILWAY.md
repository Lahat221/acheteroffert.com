# 🔧 Corriger l'erreur Railway "Error creating build plan with Railpack"

## Problème identifié

L'erreur "Error creating build plan with Railpack" indique que Railway a du mal à détecter le type de projet ou la configuration.

## ✅ Solutions

### Solution 1 : Vérifier le Root Directory (Le plus important)

1. Dans Railway, allez dans votre service "acheteroffert.com"
2. Cliquez sur l'onglet **"Settings"**
3. Vérifiez que **"Root Directory"** est bien défini à : `backend`
4. Si ce n'est pas le cas, changez-le et sauvegardez
5. Redéployez

### Solution 2 : Créer un fichier railway.json

Le fichier `backend/railway.json` existe déjà, mais vérifions qu'il est correct.

### Solution 3 : Utiliser Nixpacks explicitement

1. Dans Railway, allez dans **Settings**
2. Cherchez **"Build Command"** et **"Start Command"**
3. Configurez explicitement :
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm run start:prod`

### Solution 4 : Vérifier package.json

Assurez-vous que `backend/package.json` contient bien :
- `"start:prod": "node dist/main"`

---

## 🚀 Étapes de correction rapide

1. **Dans Railway** :
   - Settings → Root Directory : `backend`
   - Settings → Build Command : `npm install && npm run build`
   - Settings → Start Command : `npm run start:prod`

2. **Vérifiez les variables d'environnement** :
   - Toutes les variables DB_* sont bien définies
   - NODE_ENV=production

3. **Redéployez** :
   - Cliquez sur "Redeploy" ou faites un nouveau commit

---

## 🔍 Vérification

Après correction, le déploiement devrait :
- ✅ Passer l'étape "Initialization"
- ✅ Passer l'étape "Build > Build image"
- ✅ Passer l'étape "Deploy"
- ✅ Le service devrait être "Active"

---

## 📝 Si ça ne fonctionne toujours pas

1. Vérifiez les logs détaillés dans Railway
2. Vérifiez que le dossier `backend` contient bien un `package.json`
3. Vérifiez que toutes les dépendances sont dans `package.json`


