//Dieta Schema

const { model, Schema } = require('mongoose');

const alimentoSchema = require('./alimento');
const pacienteSchema = require('../paciente');

const dietaSchema = new Schema({
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    horarios: [{
        tipo: {
            type: String,
            enum: ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia', 'Hidratação']
        },
        alimento: {
            type: Schema.Types.ObjectId,
            ref: 'Alimento'
        }
    }],
    rotina: {
        type: String,
        maxlength: 500
    }
});

const Dieta = model('Dieta', dietaSchema);
module.exports = Dieta;
