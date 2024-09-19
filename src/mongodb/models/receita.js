// models/receita.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receitaSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, default: '' },
    dataEmissao: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Receita', receitaSchema);
