const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atendimentoSchema = new Schema({
    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
    medico: { type: Schema.Types.ObjectId, ref: 'Medico', required: true },
    agendamento: {
        date: { type: Date, required: true },
        time: { type: String, required: true }
    },
    observacoes: { type: String, default: '' },
    tipo: {
        type: String,
        enum: ['Consulta', 'Exame', 'Retorno', 'Emergência'], // Lista de tipos específicos
        required: true
    },
    receita: { type: Schema.Types.ObjectId, ref: 'Receita' }
}
, { timestamps: true });

module.exports = mongoose.model('Atendimento', atendimentoSchema);
