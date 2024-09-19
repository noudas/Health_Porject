const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

// MongoDB
const mongodbConnect = require('./mongodb/mongodb-client');
mongodbConnect();

const app = express();

// Middleware
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
