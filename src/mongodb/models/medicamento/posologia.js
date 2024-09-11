// posologia Schema
const { model, Schema } = require('mongoose');

const posologiaSchema = new Schema({
    tipo: {
        type: String,
        enum: ['oral', 'intravenosa', 'tópica', 'parenteral', 'inhalada', 'outra'],
        required: true
    },
    frequencia: {
        type: String,
        maxlength: 50
    },
    quantidade: {
        type: String,
        maxlength: 50
    },
    unidade: {
        type: String,
        maxlength: 20
    },
    duracao: {
        type: String,
        maxlength: 50
    },
    instrucoesEspeciais: {
        type: String,
        maxlength: 200
    }
}, { _id: false });


module.exports = posologiaSchema;