const express = require("express");
const router = express.Router();
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

// MongoDB
const mongodbConnect = require('./mongodb/mongodb-client');
mongodbConnect();

// Import Rotas
// Paciente
const pacienteRoutes = require('./routes/pacienteRoutes');
app.use('/api', pacienteRoutes);

// Alergia
const alergiaRoutes = require('./routes/alergiaRoutes');
app.use('/api', alergiaRoutes);

// Doenca
const doencaRoutes = require('./routes/doencaRoutes');
app.use('/api', doencaRoutes);

// Emocional
const emocionalRoutes = require('./routes/emocionalRoutes');
app.use('/api', emocionalRoutes);

// Esporte
const esporteRoutes = require('./routes/esporteRoutes');
app.use('/api', esporteRoutes);

// Historico Familiar
const historicoFamiliarRoutes = require('./routes/historicoFamiliarRoutes');
app.use('/api', historicoFamiliarRoutes);

// Sintoma
const sintomaRoutes = require('./routes/sintomaRoutes');
app.use('/api', sintomaRoutes);

// Suplemento
const suplementoRoutes = require('./routes/suplementoRoutes');
app.use('/api', suplementoRoutes);

// Dieta
const dietaRoutes = require('./routes/dietaRoutes');
app.use('/api/dietas', dietaRoutes);

// Medicamento
const medicamentoRoutes = require('./routes/medicamentoRoutes');
app.use('/api/medicamentos', medicamentoRoutes);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serve static files from the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Health check route
app.use("/healthcheck", async (req,res) =>{
    console.log("It just works")
    res.status(200).json({ message: "ok"})
});

module.exports = app;