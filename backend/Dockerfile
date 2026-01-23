# Dockerfile pour le backend NestJS
# Utilisé pour le déploiement sur Railway, Render, etc.

FROM node:18-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe TOUTES les dépendances (y compris devDependencies pour le build)
# npm install installe automatiquement toutes les dépendances (prod + dev)
RUN npm install

# Copie le reste du code
COPY . .

# Build l'application (nécessite ts-loader qui est dans devDependencies)
RUN npm run build

# Optionnel : Supprime les devDependencies pour réduire la taille de l'image
# RUN npm prune --production

# Copie le script de démarrage avec migrations
COPY scripts/start-with-migrations.sh ./
RUN chmod +x start-with-migrations.sh

# Expose le port
EXPOSE 3001

# Démarre l'application avec migrations automatiques
CMD ["./start-with-migrations.sh"]





