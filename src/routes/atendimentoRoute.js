const express = require('express');
const router = express.Router();
const Atendimento = require('../mongodb/models/atendimento');
const Medico = require('../mongodb/models/medico');
const Receita = require('../mongodb/models/receita');
const Paciente = require('../mongodb/models/paciente');

// POST: Create an Atendimento
router.post('/atendimentos', async (req, res) => {
    try {
        const { paciente, medico, agendamento, observacoes, tipo, receita } = req.body;

        // Verifica se o médico está disponível no horário solicitado
        const medicoDoc = await Medico.findById(medico);
        if (!medicoDoc) {
            return res.status(404).json({ message: 'Medico not found' });
        }

        const isAvailable = medicoDoc.horarioDisponivel.some(
            (slot) => slot.date.toISOString() === new Date(agendamento.date).toISOString() && slot.time === agendamento.time
        );

        if (!isAvailable) {
            return res.status(400).json({ message: 'Medico is not available at the requested time' });
        }

        // Verifica se a receita existe (opcional)
        if (receita) {
            const receitaDoc = await Receita.findById(receita);
            if (!receitaDoc) {
                return res.status(404).json({ message: 'Receita not found' });
            }
        }

        // Cria o Atendimento
        const atendimento = new Atendimento({ paciente, medico, agendamento, observacoes, tipo, receita });
        await atendimento.save();
        res.status(201).json({ message: 'Atendimento created successfully', atendimento });
    } catch (error) {
        res.status(400).json({ message: 'Error creating atendimento', error });
    }
});

router.put('/pacientes/:pacienteID/atendimentos', async (req, res) => {
    try {
        const { medico, agendamento, observacoes, tipo, receita } = req.body;
        const pacienteID = req.params.pacienteID;

        // Verifica se o paciente existe
        const pacienteDoc = await Paciente.findById(pacienteID);
        if (!pacienteDoc) {
            return res.status(404).json({ message: 'Paciente not found' });
        }

        // Encontra o último atendimento do paciente
        const lastAtendimento = await Atendimento.findOne({ paciente: pacienteID }).sort({ createdAt: -1 });
        if (!lastAtendimento) {
            return res.status(404).json({ message: 'No atendimento found for this paciente' });
        }

        // Verifica se o médico existe
        const medicoDoc = await Medico.findById(medico);
        if (!medicoDoc) {
            return res.status(404).json({ message: 'Medico not found' });
        }

        // Verifica se o médico está disponível no horário solicitado
        const isAvailable = medicoDoc.horarioDisponivel.some(
            (slot) => slot.date.toISOString() === new Date(agendamento.date).toISOString() && slot.time === agendamento.time
        );

        if (!isAvailable) {
            return res.status(400).json({ message: 'Medico is not available at the requested time' });
        }

        // Verifica se a receita existe (opcional)
        if (receita) {
            const receitaDoc = await Receita.findById(receita);
            if (!receitaDoc) {
                return res.status(404).json({ message: 'Receita not found' });
            }
        }

        // Atualiza o último Atendimento
        const updatedAtendimento = await Atendimento.findByIdAndUpdate(
            lastAtendimento._id,
            { medico, agendamento, observacoes, tipo, receita },
            { new: true }
        );

        res.status(200).json({ message: 'Atendimento updated successfully', updatedAtendimento });
    } catch (error) {
        res.status(400).json({ message: 'Error updating atendimento', error });
    }
});

// GET: Retrieve all Atendimentos for a Medico
router.get('/medicos/:medicoId/atendimentos', async (req, res) => {
    try {
        const atendimentos = await Atendimento.find({ medico: req.params.medicoId }).populate('paciente').populate('medico');
        res.status(200).json(atendimentos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving atendimentos', error });
    }
});

module.exports = router;