Write-Host "=== Vérification des ports 3000 et 3001 ===" -ForegroundColor Cyan

# Port 3000
Write-Host "`n1. Port 3000 (Frontend Next.js)..." -ForegroundColor Yellow
$port3000 = netstat -ano | Select-String ":3000"
if ($port3000) {
    Write-Host "   ⚠️  Le port 3000 est déjà utilisé" -ForegroundColor Red
    Write-Host "   $port3000"
} else {
    Write-Host "   ✅ Le port 3000 est libre" -ForegroundColor Green
}

# Port 3001
Write-Host "`n2. Port 3001 (Backend NestJS)..." -ForegroundColor Yellow
$port3001 = netstat -ano | Select-String ":3001"
if ($port3001) {
    Write-Host "   ⚠️  Le port 3001 est déjà utilisé" -ForegroundColor Red
    Write-Host "   $port3001"
} else {
    Write-Host "   ✅ Le port 3001 est libre" -ForegroundColor Green
}

Write-Host "`n=== Fin de la vérification ===" -ForegroundColor Cyan

