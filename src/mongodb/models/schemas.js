// src/models/schemas.js

const mongoose = require('mongoose');

const alergiaSchema = require('./alergia');
const emocionalSchema = require('./emocional');
const esporteSchema = require('./esporte');
const suplementoSchema = require('./suplemento');
const sintomaSchema = require('./sintoma');
const doencaSchema = require('./doenca');
const historicoFamiliarSchema = require('./historicofamiliar');
const dietaSchema = require('./dieta/dieta');
const horarioSchema = require('./dieta/horario');
const alimentoSchema = require('./dieta/alimento');
const detalhesSchema = require('./medicamento/detalhe')
const medicamentoSchema = require('./medicamento/medicamento')
const posologiaSchema = require('./medicamento/posologia')

module.exports = {
    alergia: mongoose.model('Alergia', alergiaSchema),
    emocional: mongoose.model('Emocional', emocionalSchema),
    esporte: mongoose.model('Esporte', esporteSchema),
    suplemento: mongoose.model('Suplemento', suplementoSchema),
    sintoma: mongoose.model('Sintoma', sintomaSchema),
    doenca: mongoose.model('Doenca', doencaSchema),
    historicoFamiliar: mongoose.model('HistoricoFamiliar', historicoFamiliarSchema),
    dieta: mongoose.model('Dieta', dietaSchema),
    horario: mongoose.model('Horario', horarioSchema),
    alimento: mongoose.model('Alimento', alimentoSchema),
    detalhe: mongoose.model('Detalhe', detalhesSchema),
    posologia: mongoose.model('Posologia', posologiaSchema),
    medicamento: mongoose.model('Medicamento', medicamentoSchema)

};

