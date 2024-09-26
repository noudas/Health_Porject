// Alimento Schema
const { model, Schema } = require('mongoose');

const vitaminasEnum = [
    'Vitamina A',
    'Vitamina D',
    'Vitamina E',
    'Vitamina K',
    'Vitamina C',
    'Tiamina (B1)',
    'Riboflavina (B2)',
    'Niacina (B3)',
    'Ácido Pantotênico (B5)',
    'Vitamina B6',
    'Biotina (B7)',
    'Ácido Fólico (B9)',
    'Vitamina B12'
];

const unidadesMedidaEnum = [
    'mcg', // microgramas
    'mg',  // miligramas
    'g',   // gramas
    'UI'   // Unidades Internacionais
];

const mineraisEnum = [
    'Sódio',
    'Potássio',
    'Fósforo',
    'Magnésio',
    'Cálcio',
    'Ferro',
    'Zinco',
    'Cobre',
    'Manganês',
    'Selênio',
    'Iodo',
    'Flúor'
];



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
        tipo: {
            type: String,
            enum: vitaminasEnum
        },
        quantidade: {
            type: Number,
        },
        unidadeMedida: {
            type: String,
            enum: unidadesMedidaEnum,
        }
    }],
    minerais: [{
        tipo: {
            type: String,
            enum: mineraisEnum
        },
        quantidade: {
            type: Number,
        },
        unidadeMedida: {
            type: String,
            enum: unidadesMedidaEnum,
        }
    }]
});

const Alimento = model('Alimento', alimentoSchema);
module.exports = { Alimento, vitaminasEnum, unidadesMedidaEnum, mineraisEnum };