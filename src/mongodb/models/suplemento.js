const { model, Schema } = require('mongoose');

const suplementoSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100
    },
    descricao: {
        type: String
    },
    dosagem: {
        type: String,
        required: true,
        maxlength: 50
    },
    tipo: {
        type: String,
        enum: ['Vitamina', 'Mineral', 'Aminoácido', 'Fitoterápico', 'Proteína', 'Enzima', 'Probiótico', 'Ácido Graxo', 'Antioxidante', 'Carboidrato', 'Fibras', 'Outros'],
        required: true
    },    
    forma: {
        type: String,
        enum: ['Comprimido', 'Cápsula', 'Pó', 'Líquido', 'Gel', 'Goma', 'Spray', 'Tablete', 'Pastilha', 'Sachê', 'Injetável', 'Outros'],
        required: true
    }    
}, { timestamps: true });

const Suplemento = model('Suplemento', suplementoSchema);
module.exports = Suplemento;
