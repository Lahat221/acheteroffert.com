# Script PowerShell pour démarrer le backend
# Usage: .\demarrer-backend.ps1

Write-Host "🚀 Démarrage du backend NestJS..." -ForegroundColor Cyan

# Vérifie si le port 3001 est déjà utilisé
$port3001 = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($port3001) {
    Write-Host "⚠️  Le port 3001 est déjà utilisé. Arrêt du processus..." -ForegroundColor Yellow
    $process = Get-Process -Id $port3001.OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
        Stop-Process -Id $process.Id -Force
        Start-Sleep -Seconds 2
    }
}

# Change vers le dossier backend (depuis la racine du projet)
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath
Set-Location backend

# Vérifie si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm install
}

# Démarre le backend en mode développement
Write-Host "▶️  Démarrage du serveur backend sur http://localhost:3001..." -ForegroundColor Green
npm run dev

