// Sintomas Schema

const { model, Schema } = require('mongoose');

const sintomaSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100
    },
    descricao: {
        type: String
    },
    gravidade: {
        type: String,
        enum: ['Leve', 'Moderada', 'Grave']
    },
    duracao: {
        type: String,
        maxlength: 50
    },
    categoria: {
        type: String,
        maxlength: 100
    },
    dataInicio: {
        type: Date
    },
    dataFim: {
        type: Date
    }
}, { timestamps: true });

const Sintoma = model('Sintoma', sintomaSchema);
module.exports = Sintoma;
