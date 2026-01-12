# 🌐 Partager le site avec un collègue distant

Il existe plusieurs méthodes pour permettre à un collègue de voir votre site en développement local.

## 🚀 Méthode 1 : ngrok (Recommandé - Le plus simple)

### Installation

1. **Télécharger ngrok** : https://ngrok.com/download
2. **Créer un compte gratuit** : https://dashboard.ngrok.com/signup
3. **Installer ngrok** :
   - Windows : Dézippez le fichier téléchargé
   - Ou via package manager : `choco install ngrok` (si Chocolatey est installé)

### Configuration

1. **Obtenir votre token d'authentification** :
   - Allez sur https://dashboard.ngrok.com/get-started/your-authtoken
   - Copiez votre token

2. **Configurer ngrok** :
   ```bash
   ngrok config add-authtoken VOTRE_TOKEN_ICI
   ```

### Utilisation

#### Pour le Frontend (Next.js sur le port 3000)

Dans un terminal séparé :
```bash
ngrok http 3000
```

Vous obtiendrez une URL comme : `https://xxxx-xx-xx-xxx-xxx.ngrok-free.app`

#### Pour le Backend (NestJS sur le port 3001)

Dans un autre terminal :
```bash
ngrok http 3001
```

Vous obtiendrez une autre URL comme : `https://yyyy-yy-yy-yyy-yyy.ngrok-free.app`

### Configuration du Frontend pour utiliser le Backend distant

Une fois que vous avez l'URL du backend ngrok, vous devez mettre à jour le frontend pour utiliser cette URL au lieu de `localhost:3001`.

**Option 1 : Variable d'environnement (Recommandé)**

Créez un fichier `.env.local` dans `frontend/` :
```env
NEXT_PUBLIC_API_URL=https://yyyy-yy-yy-yyy-yyy.ngrok-free.app
```

Puis modifiez `frontend/src/lib/api.ts` pour utiliser cette variable :
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

**Option 2 : Modifier directement le code**

Temporairement, vous pouvez remplacer `http://localhost:3001` par l'URL ngrok dans `frontend/src/lib/api.ts`.

### ⚠️ Notes importantes

1. **L'URL ngrok change à chaque démarrage** (sauf version payante)
2. **Il faut redémarrer le frontend** après avoir changé l'URL de l'API
3. **Le backend doit être démarré** pour que ngrok fonctionne
4. **Les deux services (frontend et backend) doivent être démarrés**

---

## 🔄 Méthode 2 : localtunnel (Alternative gratuite)

### Installation

```bash
npm install -g localtunnel
```

### Utilisation

#### Frontend
```bash
lt --port 3000 --print-requests
```

#### Backend
```bash
lt --port 3001 --print-requests
```

**Note :** Localtunnel est plus simple mais peut être moins stable que ngrok.

---

## ☁️ Méthode 3 : Déploiement Cloud (Solution permanente)

Pour un partage plus permanent, vous pouvez déployer sur des services cloud gratuits :

### Frontend (Next.js)
- **Vercel** (recommandé) : https://vercel.com
- **Netlify** : https://netlify.com

### Backend (NestJS + PostgreSQL)
- **Railway** : https://railway.app (gratuit avec limitations)
- **Render** : https://render.com (gratuit avec limitations)
- **Fly.io** : https://fly.io (gratuit avec limitations)

### Base de données
- **Supabase** : https://supabase.com (PostgreSQL gratuit)
- **Railway** : PostgreSQL inclus
- **Neon** : https://neon.tech (PostgreSQL serverless)

---

## 📋 Guide rapide : Utiliser ngrok (Étape par étape)

### Étape 1 : Installer ngrok

1. Téléchargez depuis https://ngrok.com/download
2. Créez un compte gratuit
3. Dézippez et placez `ngrok.exe` dans un dossier accessible (ex: `C:\ngrok\`)

### Étape 2 : Configurer ngrok

1. Ouvrez un terminal
2. Allez sur https://dashboard.ngrok.com/get-started/your-authtoken
3. Copiez votre token
4. Exécutez : `ngrok config add-authtoken VOTRE_TOKEN`

### Étape 3 : Démarrer les services

1. **Démarrez le backend** :
   ```bash
   cd backend
   npm run dev
   ```

2. **Démarrez le frontend** :
   ```bash
   cd frontend
   npm run dev
   ```

3. **Exposez le backend avec ngrok** (nouveau terminal) :
   ```bash
   ngrok http 3001
   ```
   Copiez l'URL HTTPS (ex: `https://abc123.ngrok-free.app`)

4. **Exposez le frontend avec ngrok** (nouveau terminal) :
   ```bash
   ngrok http 3000
   ```
   Copiez l'URL HTTPS (ex: `https://xyz789.ngrok-free.app`)

### Étape 4 : Configurer le frontend pour utiliser le backend ngrok

1. Créez `frontend/.env.local` :
   ```env
   NEXT_PUBLIC_API_URL=https://abc123.ngrok-free.app
   ```

2. Modifiez `frontend/src/lib/api.ts` :
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
   
   export async function getOffers(): Promise<Offer[]> {
     try {
       const response = await fetch(`${API_URL}/offers?active=true`, {
         cache: 'no-store',
       });
       // ... reste du code
     }
   }
   ```

3. **Redémarrez le frontend** (Ctrl+C puis `npm run dev`)

### Étape 5 : Partager avec votre collègue

Envoyez-lui l'URL du frontend ngrok : `https://xyz789.ngrok-free.app`

**⚠️ Important :**
- Les URLs ngrok changent à chaque démarrage (gratuit)
- Gardez les terminaux ngrok ouverts
- Votre ordinateur doit être allumé et connecté à Internet

---

## 🔧 Solution : URL fixe avec ngrok (Payant)

Si vous avez besoin d'une URL fixe, ngrok propose un plan payant qui permet d'avoir une URL personnalisée qui ne change pas.

---

## ✅ Résumé - Quelle méthode choisir ?

| Méthode | Avantages | Inconvénients | Quand l'utiliser |
|---------|-----------|---------------|------------------|
| **ngrok** | Simple, fiable, gratuit | URL change à chaque démarrage | Démo rapide, test temporaire |
| **localtunnel** | Très simple, gratuit | Moins stable | Alternative rapide à ngrok |
| **Cloud (Vercel/Railway)** | URL fixe, permanent, gratuit | Configuration plus complexe | Partage long terme, démo permanente |

**Pour votre cas (partage rapide avec collègue)** : Utilisez **ngrok** 🚀

