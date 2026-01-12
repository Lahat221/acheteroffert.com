# Script de test pour diagnostiquer le problème de démarrage du serveur

Write-Host "=== Diagnostic du serveur NestJS ===" -ForegroundColor Cyan
Write-Host ""

# Arrêter tous les processus Node.js
Write-Host "1. Arrêt des processus Node.js existants..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Vérifier le port 3001
Write-Host "2. Vérification du port 3001..." -ForegroundColor Yellow
$portCheck = netstat -ano | Select-String ":3001"
if ($portCheck) {
    Write-Host "   ⚠️  Le port 3001 est déjà utilisé" -ForegroundColor Red
    Write-Host "   $portCheck"
} else {
    Write-Host "   ✅ Le port 3001 est libre" -ForegroundColor Green
}

# Vérifier le fichier .env
Write-Host "3. Vérification du fichier .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   ✅ Le fichier .env existe" -ForegroundColor Green
    $envContent = Get-Content .env | Select-String -Pattern "DB_"
    Write-Host "   Configuration DB:"
    $envContent | ForEach-Object { Write-Host "     $_" }
} else {
    Write-Host "   ❌ Le fichier .env n'existe pas" -ForegroundColor Red
}

# Compiler le projet
Write-Host "4. Compilation du projet..." -ForegroundColor Yellow
npm run build 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Compilation réussie" -ForegroundColor Green
} else {
    Write-Host "   ❌ Erreur de compilation" -ForegroundColor Red
    exit 1
}

# Démarrer le serveur et capturer les erreurs
Write-Host "5. Démarrage du serveur (attente 15 secondes)..." -ForegroundColor Yellow
$job = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev 2>&1
}

Start-Sleep -Seconds 15

# Vérifier si le serveur répond
Write-Host "6. Test de connexion au serveur..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -TimeoutSec 3
    Write-Host "   ✅ Serveur accessible (Status: $($response.StatusCode))" -ForegroundColor Green
    Write-Host "   Réponse: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Serveur non accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Afficher les logs du serveur
Write-Host ""
Write-Host "7. Logs du serveur (dernières 30 lignes):" -ForegroundColor Yellow
$logs = Receive-Job -Job $job
$logs | Select-Object -Last 30 | ForEach-Object { Write-Host "   $_" }

# Arrêter le job
Stop-Job -Job $job
Remove-Job -Job $job

Write-Host ""
Write-Host "=== Fin du diagnostic ===" -ForegroundColor Cyan




