FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar solo los manifests primero para aprovechar cache
COPY package*.json ./
RUN npm install

# Copiar el resto del código del frontend
COPY . .

EXPOSE 3000

# Ejecutar Next en modo desarrollo dentro del contenedor
CMD ["npm", "run", "dev"]
