# Etapa de build base para instalar dependências e preparar o ambiente
FROM node:lts as build

# Definir o diretório de trabalho como /app
WORKDIR /app

# Copiar arquivos de dependências e instalar
COPY package.json package-lock.json ./
RUN npm install

# Copiar o código-fonte do backend
COPY ./src ./src

# Etapa de desenvolvimento para o backend
FROM build as dev

# Instalar ferramentas adicionais para desenvolvimento (como Nodemon)
RUN npm install --save-dev nodemon
CMD ["npx", "nodemon", "src/index.js"]

# Etapa para React no ambiente de desenvolvimento
FROM build as react-dev

# Instalar as dependências do React
RUN npm install --save react react-dom @babel/core babel-loader @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server css-loader style-loader html-webpack-plugin

# Iniciar o servidor de desenvolvimento do React
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/
RUN npm install
CMD ["npm", "start"]

# Etapa de produção para o backend
FROM build as prod

# Executar o backend em modo de produção
CMD ["node", "src/index.js"]
