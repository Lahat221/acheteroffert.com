Write-Host "=== Test des ports 3000 et 3001 ===" -ForegroundColor Cyan

# Test Backend (Port 3001)
Write-Host "`n1. Test du Backend (Port 3001)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -TimeoutSec 3
    Write-Host "   ✅ Backend accessible sur http://localhost:3001" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend non accessible sur http://localhost:3001" -ForegroundColor Red
    Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Vérifiez que le backend est lancé avec: cd backend && npm run dev" -ForegroundColor Yellow
}

# Test Frontend (Port 3000)
Write-Host "`n2. Test du Frontend (Port 3000)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 3
    Write-Host "   ✅ Frontend accessible sur http://localhost:3000" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Frontend non accessible sur http://localhost:3000" -ForegroundColor Red
    Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Vérifiez que le frontend est lancé avec: cd frontend && npm run dev" -ForegroundColor Yellow
}

# Test API Backend
Write-Host "`n3. Test de l'API Backend (/offers)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/offers" -UseBasicParsing -TimeoutSec 3
    Write-Host "   ✅ API /offers accessible" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  API /offers non accessible (peut être normal si la base de données n'est pas configurée)" -ForegroundColor Yellow
}

Write-Host "`n=== Fin des tests ===" -ForegroundColor Cyan

