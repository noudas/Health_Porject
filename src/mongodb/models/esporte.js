const { model, Schema } = require('mongoose');

const esporteSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100
    },
    categoria: {
        type: String,
        enum: ['Aeróbico', 'Anaeróbico', 'Flexibilidade', 'Força', 'Resistência'],
        required: true
    },
    intensidade: {
        type: String,
        enum: ['Baixa', 'Moderada', 'Alta'],
        required: true
    },
    duracaoMedia: {
        type: Number,
        min: 0
    },
    caloriasQueimadasPorHora: {
        type: Number,
        min: 0
    },
    localizacao: {
        type: String,
        maxlength: 100
    }
}, { timestamps: true });

const Esporte = model('Esporte', esporteSchema);
module.exports = Esporte;
