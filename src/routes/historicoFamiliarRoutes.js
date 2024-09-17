// historicoFamiliarRoutes.js

const express = require('express');
const router = express.Router();
const HistoricoFamiliar = require('../mongodb/models/historicofamiliar');
const Paciente = require('../mongodb/models/paciente');
const Doenca = require('../mongodb/models/doenca');
const { isEmpty } = require('../utils/objUtils');

// POST: Create a new HistoricoFamiliar record
router.post('/historicosfamiliares', async (req, res) => {
    try {
        const requiredFields = ['paciente', 'doenca', 'relacaoFamiliar'];
        const missingFields = requiredFields.filter(field => isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const paciente = await Paciente.findById(req.body.paciente);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente not found' });
        }

        const doenca = await Doenca.findById(req.body.doenca);
        if (!doenca) {
            return res.status(404).json({ message: 'Doença not found' });
        }

        const historicoFamiliar = new HistoricoFamiliar({
            paciente: paciente._id,
            doenca: doenca._id,
            relacaoFamiliar: req.body.relacaoFamiliar
        });

        await historicoFamiliar.save();
        res.status(201).json({ message: 'HistoricoFamiliar record created successfully', historicoFamiliar });
    } catch (error) {
        console.error('Error creating historicoFamiliar record:', error);
        res.status(400).json({ message: 'Error creating historicoFamiliar record', error: error.message });
    }
});


// GET: Retrieve all HistoricoFamiliar records
router.get('/historicosfamiliares', async (req, res) => {
    try {
        const historicosFamiliares = await HistoricoFamiliar.find()
            .populate('paciente')
            .populate('doenca');
        res.status(200).json(historicosFamiliares);
    } catch (error) {
        console.error('Error retrieving historicosFamiliares records:', error);
        res.status(500).json({ message: 'Error retrieving historicosFamiliares records', error });
    }
});

// GET: Retrieve HistoricoFamiliar records for a specific Paciente
router.get('/pacientes/:pacienteId/historicosfamiliares', async (req, res) => {
    try {
        const pacienteId = req.params.pacienteId;
        const historicosFamiliares = await HistoricoFamiliar.find({ paciente: pacienteId })
            .populate('paciente')
            .populate('doenca');
        res.status(200).json(historicosFamiliares);
    } catch (error) {
        console.error('Error retrieving historicosFamiliares records:', error);
        res.status(500).json({ message: 'Error retrieving historicosFamiliares records', error });
    }
});

// PUT: Update an existing HistoricoFamiliar record
router.put('/historicosfamiliares/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the historicoFamiliar record
        let historicoFamiliar = await HistoricoFamiliar.findById(id);
        if (!historicoFamiliar) {
            return res.status(404).json({ message: 'HistoricoFamiliar record not found' });
        }

        // Update fields
        historicoFamiliar.relacaoFamiliar = req.body.relacaoFamiliar || historicoFamiliar.relacaoFamiliar;

        // Save the changes
        historicoFamiliar = await historicoFamiliar.save();
        res.status(200).json({ message: 'HistoricoFamiliar record updated successfully', historicoFamiliar });
    } catch (error) {
        console.error('Error updating historicoFamiliar record:', error);
        res.status(400).json({ message: 'Error updating historicoFamiliar record', error });
    }
});

// DELETE: Delete a HistoricoFamiliar record by ID
router.delete('/historicosfamiliares/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedHistoricoFamiliar = await HistoricoFamiliar.findByIdAndDelete(id);
        if (!deletedHistoricoFamiliar) {
            return res.status(404).json({ message: 'HistoricoFamiliar record not found' });
        }
        res.status(200).json({ message: 'HistoricoFamiliar record deleted successfully' });
    } catch (error) {
        console.error('Error deleting historicoFamiliar record:', error);
        res.status(500).json({ message: 'Error deleting historicoFamiliar record', error });
    }
});

module.exports = router;
