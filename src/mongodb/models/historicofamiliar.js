//Historico Familiar Schema

const { model, Schema } = require('mongoose');
const pacienteSchema = require('./paciente'); // Assuming you have the Paciente schema defined
const doencaSchema = require('./doenca'); // Assuming you have the Doenca schema defined

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

module.exports = historicoFamiliarSchema;