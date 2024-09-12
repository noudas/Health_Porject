const express = require('express');
const router = express.Router();
const Paciente = require('../mongodb/models/paciente');

// POST: Create a new Paciente
router.post('/pacientes', async (req, res) => {
    try {
        console.log('Entrou no Post Paciente')
        const paciente = new Paciente(req.body);
        await paciente.save();
        res.status(201).json({ message: "Paciente created successfully", paciente });
    } catch (error) {
        res.status(400).json({ message: "Error creating paciente", error });
    }
});

// GET: Retrieve all Pacientes
router.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.find().populate('alergias emocionais esportes.suplemento suplementos.suplemento sintomas doencas historicosFamiliares.doenca dieta horarios medicamentos');
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving pacientes", error });
    }
});

// GET: Retrieve a Paciente by ID
router.get('/pacientes/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id).populate('alergias emocionais esportes.suplemento suplementos.suplemento sintomas doencas historicosFamiliares.doenca dieta horarios medicamentos');
        if (!paciente) return res.status(404).json({ message: "Paciente not found" });
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving paciente", error });
    }
});

// PUT: Update a Paciente by ID
router.put('/pacientes/:id', async (req, res) => {
    try {
        const updatedPaciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('alergias emocionais esportes.suplemento suplementos.suplemento sintomas doencas historicosFamiliares.doenca dieta horarios medicamentos');
        if (!updatedPaciente) return res.status(404).json({ message: "Paciente not found" });
        res.status(200).json({ message: "Paciente updated successfully", updatedPaciente });
    } catch (error) {
        res.status(500).json({ message: "Error updating paciente", error });
    }
});

// DELETE: Delete a Paciente by ID
router.delete('/pacientes/:id', async (req, res) => {
    try {
        const deletedPaciente = await Paciente.findByIdAndDelete(req.params.id);
        if (!deletedPaciente) return res.status(404).json({ message: "Paciente not found" });
        res.status(200).json({ message: "Paciente deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting paciente", error });
    }
});

module.exports = router;