const { model, Schema } = require('mongoose');
const pacienteSchema = require('./paciente'); // Ensure these paths are correct
const doencaSchema = require('./doenca');

const historicoFamiliarSchema = new Schema({
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    doenca: {
        type: Schema.Types.ObjectId,
        ref: 'Doenca',
        required: true
    },
    relacaoFamiliar: {
        type: String,
        maxlength: 100,
        required: true
    }
}, { timestamps: true });

const HistoricoFamiliar = model('HistoricoFamiliar', historicoFamiliarSchema);
module.exports = HistoricoFamiliar;
