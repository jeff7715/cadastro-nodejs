# Usa a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para dentro do container
COPY . .

# Expõe a porta que o servidor usa (3000)
EXPOSE 3000

# Define o comando para iniciar o app
CMD ["node", "app.js"]
