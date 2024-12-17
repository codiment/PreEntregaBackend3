# Usa una versión LTS de Node.js
FROM node

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos de dependencias
COPY package*.json ./

# Instala dependencias en el contenedor
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto de la aplicación
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "start"]