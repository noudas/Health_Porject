# Stage 1: Build base for installing dependencies and preparing the environment
FROM node:lts as build

# Set working directory to /app
WORKDIR /app

# Copy dependency files and install
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project directory (only once) to ensure both frontend and backend are available
COPY . .

# Stage 2: Backend development
FROM build as dev

# Install additional tools for backend development (like Nodemon)
RUN npm install --save-dev nodemon
CMD ["npx", "nodemon", "src/index.js"]

# Stage 3: React development environment
FROM build as react-dev

# Set working directory to /app/frontend (inside the copied directory)
WORKDIR /app/src/public/frontend
RUN npm install
CMD ["npm", "start"]

# Stage 4: Production for backend
FROM build as prod

# Run the backend in production mode
CMD ["node", "src/index.js"]
