//Emocional Schema

const { model, Schema } = require('mongoose');

const emocionalSchema = new Schema({
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    dataRegistro: {
        type: Date,
        default: Date.now
    },
    espectro: {
        type: String,
        enum: ['positivo', 'negativo', 'neutro'],
        required: true
    }
}, { timestamps: true });

const Emocional = model('Emocional', emocionalSchema);
module.exports = Emocional;