const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicoSchema = new Schema({
    nome: { type: String, required: true },
    especialidade: { type: String, required: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true },
    horarioDisponivel: [{
        date: { type: Date, required: true },
        time: { type: String, required: true }
    }],
    documentos: [{
        tipo: { type: String, required: true, enum: ['CRM', 'CRP', 'Other'] }, // document type, restricted to allowed values
        numero: { type: String, required: true } // document number
    }]
}, { timestamps: true });

module.exports = mongoose.model('Medico', medicoSchema);
