#!/bin/sh

echo "🚀 Démarrage de l'application..."

# Exécute les migrations
echo "📦 Exécution des migrations de base de données..."
npm run migration:run || echo "⚠️  Les migrations ont déjà été exécutées ou ont échoué (c'est peut-être normal)"

# Démarre l'application
echo "✅ Démarrage du serveur..."
npm run start:prod

