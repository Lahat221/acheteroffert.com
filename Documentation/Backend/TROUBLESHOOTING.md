# Guide de dépannage - Backend NestJS

## Problème : "Unable to connect to the database"

### Solutions possibles :

#### 1. Vérifier que PostgreSQL est démarré

**Option A : Via les Services Windows**
1. Appuyez sur `Win + R`
2. Tapez `services.msc` et appuyez sur Entrée
3. Cherchez un service nommé "postgresql" ou "PostgreSQL"
4. Si le statut n'est pas "En cours d'exécution", cliquez dessus et cliquez sur "Démarrer"

**Option B : Via pgAdmin**
1. Ouvrez pgAdmin
2. Si vous pouvez vous connecter au serveur, PostgreSQL est démarré
3. Si vous ne pouvez pas, PostgreSQL n'est pas démarré

**Option C : Vérifier manuellement**
- Allez dans le dossier d'installation de PostgreSQL (généralement `C:\Program Files\PostgreSQL\XX\bin`)
- Cherchez `pg_ctl.exe`
- Ouvrez PowerShell en tant qu'administrateur et exécutez :
  ```powershell
  cd "C:\Program Files\PostgreSQL\XX\bin"
  .\pg_ctl.exe status -D "C:\Program Files\PostgreSQL\XX\data"
  ```

#### 2. Vérifier les paramètres de connexion dans `.env`

Assurez-vous que votre fichier `backend/.env` contient :
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe_postgres
DB_DATABASE=acheteroffert
```

**Important** : Remplacez `votre_mot_de_passe_postgres` par le mot de passe que vous avez défini lors de l'installation de PostgreSQL.

#### 3. Tester la connexion manuellement

Ouvrez pgAdmin et essayez de vous connecter avec :
- Host: `localhost`
- Port: `5432`
- Username: `postgres`
- Password: (votre mot de passe)

Si la connexion échoue dans pgAdmin, elle échouera aussi dans NestJS.

#### 4. Vérifier que la base de données existe

Dans pgAdmin, vérifiez que la base de données `acheteroffert` existe :
1. Connectez-vous au serveur PostgreSQL
2. Développez "Databases"
3. Vérifiez que `acheteroffert` est présent

Si elle n'existe pas, créez-la :
```sql
CREATE DATABASE acheteroffert;
```

#### 5. Vérifier que l'extension UUID est activée

Dans pgAdmin, connectez-vous à la base `acheteroffert` et exécutez :
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

#### 6. Redémarrer PostgreSQL

Si rien ne fonctionne, redémarrez le service PostgreSQL :
1. Ouvrez `services.msc`
2. Trouvez le service PostgreSQL
3. Cliquez droit → Redémarrer

## Problème : "SyntaxError: Invalid or unexpected token"

Cette erreur peut être causée par :
1. Des fichiers compilés corrompus
2. Des problèmes d'encodage dans les fichiers source

**Solution** :
```powershell
cd backend
Remove-Item -Recurse -Force dist
npm run build
npm run dev
```

## Problème : Le serveur ne se lance pas ou n'est pas accessible sur localhost:3001

### Vérification rapide

1. **Vérifier que le serveur est démarré** :
   ```powershell
   # Vérifier si le port 3001 est en écoute
   netstat -ano | findstr :3001
   
   # Vérifier les processus Node.js
   Get-Process -Name node
   ```

2. **Tester si le serveur répond** :
   ```powershell
   # Via PowerShell
   Invoke-WebRequest -Uri http://localhost:3001 -UseBasicParsing
   
   # Ou via curl (si disponible)
   curl http://localhost:3001
   ```

3. **Vérifier les logs du serveur** :
   - Ouvrez le terminal où vous avez lancé `npm run dev`
   - Cherchez les messages d'erreur en rouge
   - Le serveur devrait afficher : `Application demarree sur http://localhost:3001`

### Solutions selon le problème

#### Le serveur ne démarre pas du tout

**Symptômes** : Aucun processus Node.js, le port 3001 n'est pas en écoute

**Solutions** :
1. Vérifiez que vous êtes dans le bon dossier :
   ```powershell
   cd backend
   ```

2. Vérifiez que les dépendances sont installées :
   ```powershell
   npm install
   ```

3. Vérifiez le fichier `.env` existe et est bien configuré (voir section "Unable to connect to the database")

4. Essayez de démarrer avec plus de détails :
   ```powershell
   npm run start:debug
   ```

#### Le serveur démarre mais crash immédiatement

**Symptômes** : Le serveur démarre puis s'arrête avec une erreur

**Solutions** :
1. **Erreur de connexion à la base de données** :
   - Vérifiez que PostgreSQL est démarré (voir section "Unable to connect to the database")
   - Vérifiez les identifiants dans `.env`

2. **Erreur de port déjà utilisé** :
   ```powershell
   # Trouver le processus qui utilise le port 3001
   netstat -ano | findstr :3001
   # Notez le PID (dernier nombre)
   # Arrêter le processus
   taskkill /PID <PID> /F
   ```

3. **Erreur de compilation TypeScript** :
   ```powershell
   # Nettoyer et reconstruire
   Remove-Item -Recurse -Force dist
   npm run build
   npm run dev
   ```

#### Le serveur fonctionne mais le navigateur ne peut pas y accéder

**Symptômes** : Le serveur répond à `curl` mais pas dans le navigateur

**Solutions** :
1. **Vérifier l'URL** :
   - Utilisez exactement : `http://localhost:3001` (pas `https://`)
   - Vérifiez qu'il n'y a pas de proxy ou de VPN qui bloque

2. **Vérifier le firewall Windows** :
   - Le firewall peut bloquer Node.js
   - Autorisez Node.js dans le pare-feu Windows

3. **Vérifier les extensions du navigateur** :
   - Désactivez temporairement les extensions (adblockers, etc.)
   - Essayez en navigation privée

4. **Tester avec un autre navigateur** :
   - Essayez Chrome, Firefox, Edge

#### Le serveur répond mais avec des erreurs

**Symptômes** : Le serveur répond mais retourne des erreurs 500 ou des messages d'erreur

**Solutions** :
1. **Erreur de base de données** :
   - Vérifiez que la base `acheteroffert` existe
   - Vérifiez que les migrations ont été exécutées : `npm run migration:run`
   - Vérifiez que l'extension UUID est activée

2. **Erreur de configuration** :
   - Vérifiez le fichier `.env`
   - Vérifiez que toutes les variables sont définies

## ✅ Vérification que le serveur fonctionne

Si le serveur fonctionne correctement, vous devriez pouvoir :

1. **Accéder à la route principale** :
   - Ouvrez : `http://localhost:3001`
   - Vous devriez voir : `{"message":"Bienvenue sur l'API AcheterOffert.com","status":"OK",...}`

2. **Accéder à la route de santé** :
   - Ouvrez : `http://localhost:3001/health`
   - Vous devriez voir : `{"status":"healthy","service":"acheteroffert-api",...}`

3. **Voir les logs dans le terminal** :
   - Le terminal devrait afficher les requêtes entrantes
   - Pas d'erreurs en rouge

## Commandes utiles

```powershell
# Nettoyer et reconstruire
cd backend
Remove-Item -Recurse -Force dist
npm run build

# Démarrer le serveur
npm run dev

# Démarrer avec debug (plus de détails)
npm run start:debug

# Vérifier les processus Node.js
Get-Process -Name node

# Vérifier le port 3001
netstat -ano | findstr :3001

# Tester le serveur
Invoke-WebRequest -Uri http://localhost:3001 -UseBasicParsing

# Arrêter tous les processus Node.js
Get-Process -Name node | Stop-Process -Force

# Arrêter un processus spécifique (remplacez <PID> par le numéro)
taskkill /PID <PID> /F
```

## 📋 Checklist de dépannage

Si le serveur ne fonctionne pas, suivez cette checklist :

- [ ] PostgreSQL est démarré (Services Windows → PostgreSQL)
- [ ] Le fichier `.env` existe dans `backend/`
- [ ] Les identifiants dans `.env` sont corrects
- [ ] La base de données `acheteroffert` existe
- [ ] L'extension `uuid-ossp` est activée
- [ ] Les migrations ont été exécutées : `npm run migration:run`
- [ ] Les dépendances sont installées : `npm install`
- [ ] Le port 3001 n'est pas utilisé par un autre processus
- [ ] Le firewall Windows autorise Node.js
- [ ] Aucune erreur dans les logs du terminal




