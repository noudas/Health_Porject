// Alimento Schema
const { model, Schema } = require('mongoose');

const alimentoSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100
    },
    tipo: {
        type: String,
        enum: ['Carboidrato', 'Proteína', 'Gordura', 'Fruta', 'Vegetal', 'Laticínio', 'Bebida'],
        required: true
    },
    porcao: {
        type: String,
        maxlength: 50
    },
    calorias: {
        type: Number,
        min: 0
    },
    vitaminas: [{
        tipo: String,
        quantidade: Number
    }],
    minerais: [{
        tipo: String,
        quantidade: Number
    }]
});

const Alimento = model('Alimento', alimentoSchema);
module.exports = Alimento;