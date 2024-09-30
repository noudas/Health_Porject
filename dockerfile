# Importar imagem
FROM node:lts as build

# Escolher o diretorio da base da aplicacao
WORKDIR /app

# Copiar as dependencias
COPY package.json .

# Instalar as dependencias
RUN npm install

# Copiar o codigo fonte
COPY src src

# Rodar com Nodemon
FROM build as dev

# Instalar o React
RUN npm install --save-dev react react-dom @babel/core babel-loader @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server css-loader style-loader html-webpack-plugin
CMD ["npm","run","dev"]

# Rodar com Node
FROM build as prod
CMD ["npm","start"]