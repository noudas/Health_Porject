// medicamento.js
const { model, Schema } = require('mongoose');
const detalhesSchema = require('./detalhe');
const posologiaSchema = require('./posologia');

const medicamentoSchema = new Schema({
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    detalhes: detalhesSchema,
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

module.exports = model('Medicamento', medicamentoSchema);
