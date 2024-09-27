//Horario Schema

const { model, Schema } = require('mongoose');
const alimentoSchema = require('./alimento');

const horarioSchema = new Schema({
    hora: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia', 'Hidratação'],
        required: true
    },
    observacoes: {
        type: String,
        maxlength: 100
    }
});

const Horario = model('Horario', horarioSchema);
module.exports = Horario;