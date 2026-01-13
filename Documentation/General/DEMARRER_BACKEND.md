# Guide : Démarrer le Backend

## Problème "Failed to fetch"

Si vous voyez l'erreur **"Failed to fetch"** lors de l'accès à l'espace vendeur, cela signifie que le backend n'est pas démarré.

## Solution rapide

### Option 1 : Script PowerShell (Recommandé)

```powershell
.\demarrer-backend.ps1
```

### Option 2 : Commande manuelle

1. Ouvrez un terminal dans le dossier `backend`
2. Exécutez :

```bash
npm run dev
```

Le backend devrait démarrer sur **http://localhost:3001**

## Vérification

Une fois le backend démarré, vous devriez voir dans le terminal :

```
Application demarree sur http://localhost:3001
Environnement : development
```

## Ports utilisés

- **Frontend (Next.js)** : Port **3000** → http://localhost:3000
- **Backend (NestJS)** : Port **3001** → http://localhost:3001

## Dépannage

### Le port 3001 est déjà utilisé

Si vous voyez une erreur indiquant que le port 3001 est déjà utilisé :

1. **Windows PowerShell** :
   ```powershell
   # Trouve le processus utilisant le port 3001
   Get-NetTCPConnection -LocalPort 3001 | Select-Object OwningProcess
   
   # Arrête le processus (remplacez PID par l'ID trouvé)
   Stop-Process -Id PID -Force
   ```

2. **Ou utilisez le script** :
   ```powershell
   .\demarrer-backend.ps1
   ```
   Le script arrête automatiquement le processus existant.

### Le backend ne démarre pas

1. Vérifiez que vous êtes dans le dossier `backend`
2. Installez les dépendances si nécessaire :
   ```bash
   npm install
   ```
3. Vérifiez que PostgreSQL est démarré
4. Vérifiez les variables d'environnement dans `.env`

## Test de connexion

Une fois le backend démarré, testez l'API :

```bash
# Test de l'endpoint de santé (si disponible)
curl http://localhost:3001

# Test de l'endpoint des offres
curl http://localhost:3001/offers
```

## Commandes utiles

- **Démarrer en mode développement** : `npm run dev`
- **Démarrer en mode production** : `npm run start:prod`
- **Compiler le projet** : `npm run build`

