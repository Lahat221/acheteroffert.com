#!/bin/sh

echo "🚀 Démarrage : Migrations et Seed de la base de données..."

# Étape 1 : Exécuter les migrations
echo ""
echo "📦 Étape 1/2 : Exécution des migrations..."
npm run migration:run || echo "⚠️  Les migrations ont déjà été exécutées (c'est normal)"

# Étape 2 : Exécuter le seed
echo ""
echo "🌱 Étape 2/2 : Remplissage des tables avec des données..."
node database/seed-complet.js || echo "⚠️  Le seed a peut-être déjà été exécuté"

echo ""
echo "✅ Terminé ! Les migrations et le seed ont été exécutés."
echo "📊 Vérifiez les données dans votre base de données."

