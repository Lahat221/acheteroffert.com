# Script PowerShell pour copier le logo dans le bon dossier

Write-Host "Recherche du fichier logo..." -ForegroundColor Yellow

# Cherche le fichier logo dans plusieurs emplacements
$logoPaths = @(
    "..\..\logo.jpeg",
    "..\..\logo.jpg",
    "..\..\logo.png",
    "..\logo.jpeg",
    "..\logo.jpg",
    "..\logo.png",
    "logo.jpeg",
    "logo.jpg",
    "logo.png"
)

$logoFound = $null

foreach ($path in $logoPaths) {
    $fullPath = Join-Path $PSScriptRoot $path
    if (Test-Path $fullPath) {
        $logoFound = Get-Item $fullPath
        Write-Host "Logo trouve: $($logoFound.FullName)" -ForegroundColor Green
        break
    }
}

if ($null -eq $logoFound) {
    Write-Host "Aucun fichier logo trouve. Placez manuellement votre logo dans ce dossier avec le nom 'logo.jpeg'" -ForegroundColor Red
    Write-Host "Dossier actuel: $PSScriptRoot" -ForegroundColor Cyan
    exit
}

# Copie le fichier avec le nom logo.jpeg
$destination = Join-Path $PSScriptRoot "logo.jpeg"
Copy-Item $logoFound.FullName -Destination $destination -Force

Write-Host "Logo copie avec succes dans: $destination" -ForegroundColor Green
Write-Host "Redemarrez le serveur Next.js si necessaire" -ForegroundColor Yellow

