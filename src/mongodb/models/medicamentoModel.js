// src/mongodb/models/medicamentoModel.js

const mongoose = require('mongoose');
const medicamentoSchema = require('./medicamento/medicamento');

const Medicamento = mongoose.model('Medicamento', medicamentoSchema);

module.exports = Medicamento;
