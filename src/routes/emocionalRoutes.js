// emocionalRoutes.js

const express = require('express');
const router = express.Router();
const Emocional = require('../mongodb/models/emocional');
const Paciente = require('../mongodb/models/paciente'); // Assuming you have a Paciente model
const { isEmpty } = require('../utils/objUtils');

// POST: Create a new Emocional record
router.post('/emocionals', async (req, res) => {
    try {
        const { paciente, descricao, espectro } = req.body; // Destructuring req.body

        // Validate required fields
        const requiredFields = ['paciente', 'descricao', 'espectro'];
        const missingFields = requiredFields.filter(field => isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        // Validate paciente existence
        const foundPaciente = await Paciente.findById(paciente);
        if (!foundPaciente) {
            return res.status(404).json({ message: 'Paciente not found' });
        }

        // Create a new Emocional record
        const emocional = new Emocional({
            paciente: foundPaciente._id,
            descricao,
            espectro
        });

        await emocional.save();
        res.status(201).json({ message: 'Emocional record created successfully', emocional });
    } catch (error) {
        console.error('Error creating emocional record:', error);
        res.status(400).json({ message: 'Error creating emocional record', error });
    }
});

// GET: Retrieve all Emocional records
router.get('/emocionals', async (req, res) => {
    try {
        const emocionals = await Emocional.find().populate('paciente');
        res.status(200).json(emocionals);
    } catch (error) {
        console.error('Error retrieving emocional records:', error);
        res.status(500).json({ message: 'Error retrieving emocional records', error });
    }
});

// GET: Retrieve Emocional records for a specific Paciente
router.get('/pacientes/:pacienteId/emocionals', async (req, res) => {
    try {
        const pacienteId = req.params.pacienteId;
        const emocionals = await Emocional.find({ paciente: pacienteId }).populate('paciente');
        res.status(200).json(emocionals);
    } catch (error) {
        console.error('Error retrieving emocional records:', error);
        res.status(500).json({ message: 'Error retrieving emocional records', error });
    }
});

// PUT: Update an existing Emocional record
router.put('/emocionals/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { descricao, espectro } = req.body; // Destructuring req.body

        // Find the emocional record
        let emocional = await Emocional.findById(id);
        if (!emocional) {
            return res.status(404).json({ message: 'Emocional record not found' });
        }

        // Update fields
        emocional.descricao = descricao || emocional.descricao;
        emocional.espectro = espectro || emocional.espectro;

        // Save the changes
        emocional = await emocional.save();
        res.status(200).json({ message: 'Emocional record updated successfully', emocional });
    } catch (error) {
        console.error('Error updating emocional record:', error);
        res.status(400).json({ message: 'Error updating emocional record', error });
    }
});

// DELETE: Delete an Emocional record by ID
router.delete('/emocionals/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEmocional = await Emocional.findByIdAndDelete(id);
        if (!deletedEmocional) {
            return res.status(404).json({ message: 'Emocional record not found' });
        }
        res.status(200).json({ message: 'Emocional record deleted successfully' });
    } catch (error) {
        console.error('Error deleting emocional record:', error);
        res.status(500).json({ message: 'Error deleting emocional record', error });
    }
});

module.exports = router;
