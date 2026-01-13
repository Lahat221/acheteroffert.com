# 🔧 Guide de Dépannage - Frontend Next.js

## 🎯 Problème : Le serveur ne démarre pas sur http://localhost:3000

### ✅ Vérification rapide

1. **Vérifier que le port 3000 est en écoute** :
   ```powershell
   netstat -ano | findstr :3000
   ```

2. **Tester si le serveur répond** :
   ```powershell
   Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing
   ```

3. **Vérifier les processus Node.js** :
   ```powershell
   Get-Process -Name node
   ```

---

## 🔍 Solutions selon le problème

### Le serveur ne démarre pas du tout

**Symptômes** : Aucun processus Node.js, le port 3000 n'est pas en écoute

**Solutions** :

1. **Vérifier que vous êtes dans le bon dossier** :
   ```powershell
   cd frontend
   ```

2. **Installer les dépendances** :
   ```powershell
   npm install
   ```

3. **Démarrer le serveur** :
   ```powershell
   npm run dev
   ```

4. **Vérifier les erreurs dans le terminal** :
   - Cherchez les messages d'erreur en rouge
   - Le serveur devrait afficher : `Ready on http://localhost:3000`

---

### Le serveur démarre mais crash immédiatement

**Symptômes** : Le serveur démarre puis s'arrête avec une erreur

**Solutions** :

1. **Erreur de compilation TypeScript** :
   ```powershell
   # Nettoyer le cache Next.js
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

2. **Erreur de port déjà utilisé** :
   ```powershell
   # Trouver le processus qui utilise le port 3000
   netstat -ano | findstr :3000
   # Notez le PID (dernier nombre)
   # Arrêter le processus
   taskkill /PID <PID> /F
   ```

3. **Erreur de dépendances manquantes** :
   ```powershell
   # Supprimer node_modules et réinstaller
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   npm install
   ```

4. **Erreur de syntaxe dans le code** :
   - Vérifiez les fichiers `.tsx` et `.ts` pour des erreurs de syntaxe
   - Vérifiez les imports manquants
   - Vérifiez les erreurs TypeScript : `npm run lint`

---

### Le serveur fonctionne mais le navigateur ne peut pas y accéder

**Symptômes** : Le serveur répond à `curl` mais pas dans le navigateur

**Solutions** :

1. **Vérifier l'URL** :
   - Utilisez exactement : `http://localhost:3000` (pas `https://`)
   - Vérifiez qu'il n'y a pas de proxy ou de VPN qui bloque

2. **Vérifier le firewall Windows** :
   - Le firewall peut bloquer Node.js
   - Autorisez Node.js dans le pare-feu Windows

3. **Vérifier les extensions du navigateur** :
   - Désactivez temporairement les extensions (adblockers, etc.)
   - Essayez en navigation privée

4. **Tester avec un autre navigateur** :
   - Essayez Chrome, Firefox, Edge

5. **Vérifier les erreurs dans la console du navigateur** :
   - Ouvrez les outils de développement (F12)
   - Regardez l'onglet Console pour les erreurs
   - Regardez l'onglet Network pour les requêtes qui échouent

---

### Erreur : "Module not found" ou "Cannot find module"

**Solutions** :

1. **Réinstaller les dépendances** :
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

2. **Vérifier les imports** :
   - Vérifiez que les chemins d'import sont corrects
   - Vérifiez que les fichiers existent

3. **Nettoyer le cache Next.js** :
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

---

### Erreur : "Port 3000 is already in use"

**Solutions** :

1. **Trouver et arrêter le processus** :
   ```powershell
   # Trouver le processus
   netstat -ano | findstr :3000
   # Notez le PID (dernier nombre)
   # Arrêter le processus
   taskkill /PID <PID> /F
   ```

2. **Utiliser un autre port** :
   ```powershell
   # Démarrer sur le port 3001 (si disponible)
   $env:PORT=3001; npm run dev
   ```

---

### Erreur de connexion à l'API backend

**Symptômes** : Le frontend démarre mais ne peut pas communiquer avec l'API

**Solutions** :

1. **Vérifier que le backend est démarré** :
   - Le backend doit être accessible sur `http://localhost:3001`
   - Testez : `Invoke-WebRequest -Uri http://localhost:3001 -UseBasicParsing`

2. **Vérifier la configuration de l'API** :
   - Vérifiez le fichier `src/lib/api.ts`
   - Vérifiez que l'URL de l'API est correcte : `http://localhost:3001`

3. **Vérifier CORS** :
   - Le backend doit autoriser les requêtes depuis `http://localhost:3000`
   - Vérifiez la configuration CORS dans `backend/src/main.ts`

---

### Erreur : "Hydration failed" ou erreurs de rendu

**Solutions** :

1. **Vérifier les différences entre serveur et client** :
   - Évitez d'utiliser `window` ou `document` dans les Server Components
   - Utilisez `'use client'` pour les composants qui ont besoin du client

2. **Nettoyer le cache** :
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

---

## 📋 Checklist de dépannage

Si le serveur ne fonctionne pas, suivez cette checklist :

- [ ] Les dépendances sont installées : `npm install`
- [ ] Le port 3000 n'est pas utilisé par un autre processus
- [ ] Aucune erreur dans les logs du terminal
- [ ] Le cache Next.js est nettoyé (supprimer `.next`)
- [ ] Les fichiers TypeScript/TSX n'ont pas d'erreurs de syntaxe
- [ ] Le backend est démarré sur `http://localhost:3001`
- [ ] Le firewall Windows autorise Node.js
- [ ] Aucune erreur dans la console du navigateur (F12)

---

## 🚀 Commandes utiles

```powershell
# Installer les dépendances
cd frontend
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Démarrer en mode production
npm run start

# Vérifier les erreurs de lint
npm run lint

# Nettoyer le cache Next.js
Remove-Item -Recurse -Force .next

# Vérifier le port 3000
netstat -ano | findstr :3000

# Tester le serveur
Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing

# Arrêter tous les processus Node.js
Get-Process -Name node | Stop-Process -Force

# Arrêter un processus spécifique (remplacez <PID> par le numéro)
taskkill /PID <PID> /F
```

---

## ✅ Vérification que le serveur fonctionne

Si le serveur fonctionne correctement, vous devriez pouvoir :

1. **Accéder à la page d'accueil** :
   - Ouvrez : `http://localhost:3000`
   - Vous devriez voir la page d'accueil d'AcheterOffert

2. **Voir les logs dans le terminal** :
   - Le terminal devrait afficher : `Ready on http://localhost:3000`
   - Pas d'erreurs en rouge

3. **Voir les requêtes dans la console** :
   - Ouvrez les outils de développement (F12)
   - L'onglet Network devrait montrer les requêtes réussies

---

## 🐛 Problèmes courants

### Le serveur démarre mais la page est blanche

- Vérifiez la console du navigateur (F12) pour les erreurs JavaScript
- Vérifiez les logs du terminal pour les erreurs de compilation
- Vérifiez que tous les composants sont correctement importés

### Les styles ne s'appliquent pas

- Vérifiez que `globals.css` est importé dans `layout.tsx`
- Vérifiez que les classes CSS sont correctement écrites
- Vérifiez que Tailwind CSS est configuré (si utilisé)

### Les images ne s'affichent pas

- Vérifiez que les images sont dans le dossier `public/`
- Utilisez le composant `Image` de Next.js pour les images optimisées
- Vérifiez les chemins des images

---

## 📖 Documentation supplémentaire

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Bon développement ! 🎉

