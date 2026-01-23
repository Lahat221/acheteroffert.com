# Dockerfile pour le backend NestJS
# Utilisé pour le déploiement sur Railway, Render, etc.

FROM node:18-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe TOUTES les dépendances (y compris devDependencies pour le build)
RUN npm ci

# Copie le reste du code
COPY . .

# Build l'application (nécessite ts-loader qui est dans devDependencies)
RUN npm run build

# Optionnel : Supprime les devDependencies pour réduire la taille de l'image
# RUN npm prune --production

# Expose le port
EXPOSE 3001

# Démarre l'application
CMD ["npm", "run", "start:prod"]





