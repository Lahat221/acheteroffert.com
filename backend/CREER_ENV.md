# 📝 Créer le fichier .env

## 🎯 Objectif
Créer le fichier `.env` avec vos identifiants PostgreSQL pour que le backend puisse se connecter à la base de données.

---

## ✅ Étapes

### 1. Créer le fichier .env

Dans le dossier `backend/`, créez un fichier nommé `.env` (avec le point au début).

**Méthode 1 : Via l'éditeur de code**
1. Dans votre éditeur (VS Code, etc.), créez un nouveau fichier
2. Nommez-le `.env`
3. Collez le contenu ci-dessous

**Méthode 2 : Via PowerShell**
```powershell
cd backend
New-Item -Path .env -ItemType File
```

---

### 2. Contenu du fichier .env

Copiez ce contenu dans votre fichier `.env` et **remplacez** `votre_mot_de_passe_postgres` par votre vrai mot de passe PostgreSQL :

```env
# Configuration de la base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe_postgres
DB_DATABASE=acheteroffert

# Environnement (development, production)
NODE_ENV=development

# Configuration JWT (pour l'authentification - à configurer plus tard)
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRES_IN=24h
```

---

### 3. Remplacer les valeurs

**Important** : Remplacez ces valeurs :

- `votre_mot_de_passe_postgres` → Le mot de passe que vous avez défini pour l'utilisateur `postgres` dans PostgreSQL
- `votre_secret_jwt_tres_securise` → Un secret aléatoire pour JWT (vous pouvez générer un mot de passe aléatoire)

**Exemple** :
```env
DB_PASSWORD=MonMotDePasse123!
JWT_SECRET=MaCleSecreteSuperSecurisee2024!
```

---

### 4. Vérifier que le fichier est bien créé

Le fichier `.env` doit être dans : `backend/.env`

⚠️ **Important** : Le fichier `.env` est dans `.gitignore`, donc il ne sera **pas** commité dans Git (c'est normal pour la sécurité).

---

## ✅ Vérification

Une fois le fichier `.env` créé avec le bon mot de passe, vous pouvez tester la connexion en exécutant les migrations :

```bash
cd backend
npm run migration:run
```

Si tout fonctionne, vous verrez :
- Les migrations s'exécuter
- Les tables créées dans la base de données `acheteroffert`

---

## 🐛 Dépannage

### Erreur : "password authentication failed"
- Vérifiez que le mot de passe dans `.env` correspond bien à celui de PostgreSQL
- Testez la connexion dans pgAdmin avec les mêmes identifiants

### Erreur : "database does not exist"
- Vérifiez que la base `acheteroffert` existe dans pgAdmin
- Vérifiez que `DB_DATABASE=acheteroffert` dans le fichier `.env`

### Le fichier .env n'est pas reconnu
- Vérifiez que le fichier s'appelle bien `.env` (avec le point au début)
- Vérifiez qu'il est dans le dossier `backend/`
- Redémarrez votre terminal/éditeur

---

Une fois le fichier `.env` créé, vous pouvez exécuter les migrations ! 🚀





