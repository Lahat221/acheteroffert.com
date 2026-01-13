# Dockerfile pour le backend NestJS
# Utilisé pour le déploiement sur Railway, Render, etc.

FROM node:18-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm ci --only=production

# Copie le reste du code
COPY . .

# Build l'application
RUN npm run build

# Expose le port
EXPOSE 3001

# Démarre l'application
CMD ["npm", "run", "start:prod"]

