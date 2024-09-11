//Horario Schema

const { model, Schema } = require('mongoose');
const alimentoSchema = require('./alimento');

const horarioSchema = new Schema({
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    hora: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia', 'Hidratação'],
        required: true
    },
    alimento: {
        type: Schema.Types.ObjectId,
        ref: 'Alimento'
    },
    observacoes: {
        type: String,
        maxlength: 100
    }
});

const Horario = model('Horario', horarioSchema);
module.exports = Horario;