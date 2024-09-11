//detalhe Schema

const { Schema } = require('mongoose');

const detalheSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100
    },
    marca: {
        type: String,
        maxlength: 100
    },
    composicao: {
        type: String,
        maxlength: 300
    },
    dosagem: {
        type: String,
        maxlength: 100
    }
}, { _id: false }); // Não cria um id separado para este subdocumento

module.exports = detalheSchema; // Export just the schema, not the model