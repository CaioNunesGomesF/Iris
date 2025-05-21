# Usa Node.js como base
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos para dentro do container
COPY package*.json ./
RUN npm install
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Inicia o app
CMD ["node", "server.js"]