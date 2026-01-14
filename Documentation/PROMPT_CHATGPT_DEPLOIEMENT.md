# 🤖 Prompt pour ChatGPT - Guide de Déploiement

## Copiez ce prompt et collez-le dans ChatGPT :

```
Je veux déployer mon projet web en ligne pour permettre à mon client de tester les fonctionnalités. Peux-tu me guider étape par étape ?

## Contexte du projet

**Architecture :**
- Frontend : Next.js 14 (React) dans le dossier `frontend/`
- Backend : NestJS (Node.js) dans le dossier `backend/`
- Base de données : PostgreSQL
- Déploiement prévu :
  - Frontend → Vercel (j'ai déjà un compte Vercel et GitHub)
  - Backend → Railway ou Render (gratuit)
  - Base de données → Supabase (gratuit)

**Structure du projet :**
```
acheteroffert/
├── frontend/          # Next.js app
│   ├── src/
│   │   ├── app/       # Pages Next.js
│   │   ├── components/
│   │   └── lib/       # API client
│   └── package.json
├── backend/           # NestJS API
│   ├── src/
│   │   ├── products/  # Module offres
│   │   ├── vendors/   # Module vendeurs
│   │   └── main.ts
│   └── package.json
└── Documentation/
```

**Fonctionnalités principales :**
- Site vitrine avec liste d'offres
- Espace vendeur (connexion, dashboard, gestion d'offres)
- API REST pour les offres et vendeurs
- Base de données PostgreSQL avec TypeORM

**Fichiers de configuration existants :**
- `backend/railway.json` - Configuration Railway
- `backend/nixpacks.toml` - Configuration Nixpacks
- `backend/Dockerfile` - Pour déploiement Docker
- `frontend/src/config/api.ts` - Configuration API centralisée
- Tous les appels API utilisent `API_URL` depuis la config

**Variables d'environnement nécessaires :**

Backend :
- NODE_ENV=production
- PORT=3001
- DB_HOST=db.xxxxx.supabase.co
- DB_PORT=5432
- DB_USERNAME=postgres
- DB_PASSWORD=...
- DB_DATABASE=postgres
- FRONTEND_URL=https://votre-projet.vercel.app
- JWT_SECRET=...

Frontend :
- NEXT_PUBLIC_API_URL=https://votre-backend.railway.app

**Problèmes rencontrés :**
- J'ai créé un projet Supabase mais je ne trouve pas facilement le Host dans l'interface
- J'ai essayé de déployer sur Railway mais j'ai eu l'erreur "Error creating build plan with Railpack"
- Je ne suis pas sûr de la configuration exacte pour Railway

**Ce que j'ai déjà :**
- ✅ Compte Vercel
- ✅ Compte GitHub avec le repository
- ✅ Projet Supabase créé (acheteroffert-test)
- ✅ Connection string Supabase visible dans la modal "Connect to your project"

**Ce dont j'ai besoin :**
1. Guide étape par étape pour trouver les bonnes informations Supabase
2. Guide étape par étape pour configurer Railway correctement
3. Guide étape par étape pour déployer sur Vercel
4. Vérification que tout fonctionne ensemble
5. Aide pour résoudre les erreurs si elles surviennent

Peux-tu me guider étape par étape, en me demandant les informations au fur et à mesure et en vérifiant que chaque étape fonctionne avant de passer à la suivante ?
```

---

## 📋 Instructions d'utilisation

1. **Copiez le prompt ci-dessus** (tout le contenu entre les ```)
2. **Collez-le dans ChatGPT**
3. **ChatGPT vous guidera** étape par étape en vous posant des questions
4. **Répondez aux questions** au fur et à mesure
5. **Suivez les instructions** données par ChatGPT

---

## 💡 Informations à avoir sous la main

Avant de commencer, préparez :

1. **Supabase** :
   - Connection string (visible dans la modal "Connect to your project")
   - Mot de passe de la base de données

2. **GitHub** :
   - URL de votre repository
   - Accès en écriture

3. **Vercel** :
   - Compte connecté à GitHub

4. **Railway** :
   - Compte (à créer si nécessaire)

---

## 🎯 Ce que ChatGPT va vous aider à faire

1. ✅ Trouver les bonnes informations Supabase
2. ✅ Configurer Railway correctement
3. ✅ Déployer le backend
4. ✅ Déployer le frontend sur Vercel
5. ✅ Connecter tout ensemble
6. ✅ Résoudre les erreurs
7. ✅ Tester que tout fonctionne

---

## 📝 Note

Ce prompt donne à ChatGPT tout le contexte nécessaire pour vous guider efficacement. Il comprend :
- La structure de votre projet
- Les technologies utilisées
- Les fichiers de configuration existants
- Les problèmes que vous avez rencontrés
- Ce que vous avez déjà fait

ChatGPT pourra ainsi vous donner des instructions précises et adaptées à votre situation.


