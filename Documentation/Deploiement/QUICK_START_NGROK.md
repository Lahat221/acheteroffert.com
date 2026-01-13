# 🚀 Guide Rapide : Partager le site avec ngrok

## 📋 Étapes rapides

### 1️⃣ Installer ngrok

1. **Téléchargez** : https://ngrok.com/download
2. **Créez un compte gratuit** : https://dashboard.ngrok.com/signup
3. **Obtenez votre token** : https://dashboard.ngrok.com/get-started/your-authtoken

### 2️⃣ Configurer ngrok

Ouvrez un terminal et exécutez :
```bash
ngrok config add-authtoken VOTRE_TOKEN_ICI
```

### 3️⃣ Démarrer les services

**Terminal 1 - Backend** :
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend** :
```bash
cd frontend
npm run dev
```

**Terminal 3 - ngrok Backend** :
```bash
ngrok http 3001
```
➡️ **Copiez l'URL HTTPS** (ex: `https://abc123.ngrok-free.app`)

**Terminal 4 - ngrok Frontend** :
```bash
ngrok http 3000
```
➡️ **Copiez l'URL HTTPS** (ex: `https://xyz789.ngrok-free.app`)

### 4️⃣ Configurer le frontend

1. Créez `frontend/.env.local` :
```env
NEXT_PUBLIC_API_URL=https://abc123.ngrok-free.app
```
*(Remplacez par votre URL ngrok backend)*

2. **Redémarrez le frontend** (Ctrl+C puis `npm run dev`)

### 5️⃣ Partager avec votre collègue

Envoyez-lui l'URL du frontend ngrok : `https://xyz789.ngrok-free.app`

---

## ⚠️ Notes importantes

1. **Les URLs ngrok changent à chaque démarrage** (version gratuite)
2. **Gardez tous les terminaux ouverts**
3. **Votre ordinateur doit être allumé et connecté à Internet**
4. **Si vous redémarrez ngrok**, mettez à jour `.env.local` avec la nouvelle URL

---

## 🔧 Pour une URL fixe

Si vous avez besoin d'une URL qui ne change pas, utilisez ngrok avec un domaine réservé (plan payant) ou déployez sur Vercel/Railway.

---

**Besoin d'aide ?** Consultez [PARTAGE_DISTANT.md](./PARTAGE_DISTANT.md) pour plus de détails.

