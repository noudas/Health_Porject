//Medicamento Schema

const { model, Schema } = require('mongoose');
const detalheSchema = require('./detalhe'); 
const posologiaSchema = require('./posologia');

const medicamentoSchema = new Schema({
    detalhes: detalheSchema,
    posologia: posologiaSchema,
    duracaoEfeito: {
        type: String,
        maxlength: 50
    },
    tempoParaUso: {
        type: String,
        maxlength: 50
    },
    dataInicioIngestao: {
        type: Date
    },
    dataFimIngestao: {
        type: Date
    },
    observacoes: {
        type: String,
        maxlength: 200
    }
}, { timestamps: true });

module.exports = medicamentoSchema;
