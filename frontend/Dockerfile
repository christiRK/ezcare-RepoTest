# Utilise une image Node officielle légère
FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de configuration NPM
COPY package.json package-lock.json* ./

# Installation des dépendances
RUN npm install

# Copie le reste du projet
COPY . .

# Expose le port utilisé par Vite (par défaut 5173)
EXPOSE 5173

# Commande pour lancer le serveur de dev
CMD ["npm", "run", "dev", "--", "--host"]