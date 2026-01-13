Write-Host "=== Démarrage des serveurs ===" -ForegroundColor Cyan

# Vérifier les ports
Write-Host "`nVérification des ports..." -ForegroundColor Yellow
$port3000 = netstat -ano | Select-String ":3000"
$port3001 = netstat -ano | Select-String ":3001"

if ($port3000) {
    Write-Host "⚠️  Port 3000 déjà utilisé" -ForegroundColor Red
    Write-Host "   Utilisez: .\verifier-ports.ps1 pour plus de détails" -ForegroundColor Yellow
    $continue = Read-Host "   Voulez-vous continuer quand même ? (o/N)"
    if ($continue -ne "o" -and $continue -ne "O") {
        exit 1
    }
}

if ($port3001) {
    Write-Host "⚠️  Port 3001 déjà utilisé" -ForegroundColor Red
    Write-Host "   Utilisez: .\verifier-ports.ps1 pour plus de détails" -ForegroundColor Yellow
    $continue = Read-Host "   Voulez-vous continuer quand même ? (o/N)"
    if ($continue -ne "o" -and $continue -ne "O") {
        exit 1
    }
}

if (-not $port3000 -and -not $port3001) {
    Write-Host "✅ Ports libres" -ForegroundColor Green
}

# Vérifier que les dossiers existent
if (-not (Test-Path "backend")) {
    Write-Host "❌ Dossier 'backend' introuvable" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "frontend")) {
    Write-Host "❌ Dossier 'frontend' introuvable" -ForegroundColor Red
    exit 1
}

# Démarrer le backend
Write-Host "`nDémarrage du Backend (Port 3001)..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host '=== Backend (Port 3001) ===' -ForegroundColor Cyan; npm run dev"

# Attendre un peu pour que le backend démarre
Write-Host "   Attente du démarrage du backend..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# Démarrer le frontend
Write-Host "Démarrage du Frontend (Port 3000)..." -ForegroundColor Yellow
$frontendPath = Join-Path $PSScriptRoot "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host '=== Frontend (Port 3000) ===' -ForegroundColor Cyan; npm run dev"

Write-Host "`n✅ Serveurs démarrés !" -ForegroundColor Green
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`n   Les serveurs s'ouvrent dans de nouvelles fenêtres PowerShell." -ForegroundColor Gray
Write-Host "   Vous pouvez les fermer individuellement pour arrêter les serveurs." -ForegroundColor Gray

