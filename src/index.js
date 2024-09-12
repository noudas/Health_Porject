// Imports
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

const cors = require("cors");


// MongoDB
const mongodbConnect = require('./mongodb/mongodb-client')
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
const dietaRoutes = require('./dietaRoutes');
router.use('/api/dietas', dietaRoutes);

// Medicamento
const medicamentoRoutes = require('./medicamentoRoutes');
router.use('/api/medicamentos', medicamentoRoutes);



// Initializador
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use("/healthcheck", async (req,res) =>{
    console.log("It just works")
    res.status(200).json({ message: "ok"})
});



module.exports = app;