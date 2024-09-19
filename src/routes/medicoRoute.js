const express = require('express');
const router = express.Router();
const Medico = require('../mongodb/models/medico');

// POST: Create a new Medico
router.post('/medicos', async (req, res) => {
    try {
        const { nome, especialidade, telefone, email, horarioDisponivel, documentos } = req.body;
        const medico = new Medico({ nome, especialidade, telefone, email, horarioDisponivel, documentos });
        await medico.save();
        res.status(201).json({ message: 'Medico created successfully', medico });
    } catch (error) {
        res.status(400).json({ message: 'Error creating medico', error });
    }
});

// GET: Retrieve all Medicos
router.get('/medicos', async (req, res) => {
    try {
        const medicos = await Medico.find();
        res.status(200).json(medicos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving medicos', error });
    }
});


// PUT Update Medico by ID
router.put('/medicos/:id', async (req, res) => {
    try {
        const { nome, especialidade, telefone, email, horarioDisponivel, documentos } = req.body;
        const updatedMedico = await Medico.findByIdAndUpdate(
            req.params.id, 
            { nome, especialidade, telefone, email, horarioDisponivel, documentos },
            { new: true, runValidators: true }  // `new: true` returns the updated document, `runValidators` ensures validation
        );

        if (!updatedMedico) {
            return res.status(404).json({ message: 'Medico not found' });
        }

        res.status(200).json({ message: 'Medico updated successfully', updatedMedico });
    } catch (error) {
        res.status(400).json({ message: 'Error updating Medico', error });
    }
});

// PUT: Update Medico schedule
router.put('/medicos/:id/schedule', async (req, res) => {
    try {
        const { horarioDisponivel, documentos } = req.body;
        const updatedMedico = await Medico.findByIdAndUpdate(req.params.id, { horarioDisponivel, documentos }, { new: true });
        if (!updatedMedico) return res.status(404).json({ message: 'Medico not found' });
        res.status(200).json({ message: 'Medico updated successfully', updatedMedico });
    } catch (error) {
        res.status(400).json({ message: 'Error updating medico', error });
    }
});

module.exports = router;
