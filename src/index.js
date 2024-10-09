// index.js (Back-End)
const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");

// MongoDB
const mongodbConnect = require('./mongodb/mongodb-client');
mongodbConnect();

const app = express();
const server = http.createServer(app); // Cria o servidor HTTP com suporte ao WebSocket
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Permite conexões do front-end React
  },
});

// Middleware
app.use(express.static(path.join(__dirname, 'public/cadastros')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Import Routes
const pacienteRoutes = require('./routes/pacienteRoutes');
const alergiaRoutes = require('./routes/alergiaRoutes');
const doencaRoutes = require('./routes/doencaRoutes');
const emocionalRoutes = require('./routes/emocionalRoutes');
const esporteRoutes = require('./routes/esporteRoutes');
const historicoFamiliarRoutes = require('./routes/historicoFamiliarRoutes');
const sintomaRoutes = require('./routes/sintomaRoutes');
const suplementoRoutes = require('./routes/suplementoRoutes');
const dietaRoutes = require('./routes/dietaRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const medicoRoutes = require('./routes/medicoRoute');
const atendimentoRoutes = require('./routes/atendimentoRoute');
const receitaRoutes = require('./routes/receitaRoutes');

// Apply routes
app.use('/api', pacienteRoutes);
app.use('/api', alergiaRoutes);
app.use('/api', doencaRoutes);
app.use('/api', emocionalRoutes);
app.use('/api', esporteRoutes);
app.use('/api', historicoFamiliarRoutes);
app.use('/api', sintomaRoutes);
app.use('/api', suplementoRoutes);
app.use('/api', dietaRoutes);
app.use('/api', medicamentoRoutes);
app.use('/api', medicoRoutes);
app.use('/api', atendimentoRoutes);
app.use('/api', receitaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Serve static files from the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Health check route
app.get("/healthcheck", (req, res) => {
  console.log("Health check successful");
  res.status(200).json({ message: "API is running" });
});

// Catch-all route for unknown endpoints
app.all('*', (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Configuração do WebSocket
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Enviar dados iniciais quando o cliente se conecta
  socket.on('join', (selectedType) => {
    console.log(`Cliente entrou na sala: ${selectedType}`);
    // Supondo que você tenha dados específicos para cada tipo
    // Enviar dados iniciais para o tipo selecionado
    // socket.emit(selectedType, seusDados[selectedType]); 
  });

  // Escutar eventos de atualização de dados do cliente
  socket.on('updateData', ({ type, newData }) => {
    console.log(`Atualizando dados para o tipo: ${type}`);
    // Atualize seus dados conforme necessário
    // Seus dados, como um banco de dados ou uma estrutura de dados em memória

    // Emite os dados atualizados para todos os clientes
    io.emit(type, newData);
  });

  // Remover cliente desconectado
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Inicializar o servidor na porta configurada
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket rodando em http://localhost:${PORT}`);
});