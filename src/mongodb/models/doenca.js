//Doenca Schema

const { model, Schema } = require('mongoose');
const sintomaSchema = require('./sintoma')

const doencaSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100
    },
    descricao: {
        type: String
    },
    tipo: {
        type: String,
        enum: ['Infecciosa', 'Genética', 'Crônica', 'Aguda', 'Degenerativa', 'Autoimune', 'Outros'],
        required: true
    },
    cid10: {
        type: String,
        required: true,
        maxlength: 10
    },
    sintomas: [{ type: Schema.Types.ObjectId, ref: 'Sintoma' }]
}, { timestamps: true });

const Doenca = model('Doenca', doencaSchema);
module.exports = Doenca;
