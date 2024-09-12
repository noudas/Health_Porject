// alergiaRoutes.js

const express = require('express');
const router = express.Router();
const Alergia = require('../mongodb/models/alergia');
const { isEmpty } = require('../utils/objUtils');

// POST: Create a new Alergia
router.post('/alergias', async (req, res) => {
    try {
        const requiredFields = ['nome', 'tipo', 'severidade'];
        const missingFields = requiredFields.filter(field => isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const alergia = new Alergia(req.body);
        await alergia.save();
        res.status(201).json({ message: 'Alergia created successfully', alergia });
    } catch (error) {
        console.error('Error creating alergia:', error);
        res.status(400).json({ message: 'Error creating alergia', error });
    }
});

// GET: Retrieve all Alergias
router.get('/alergias', async (req, res) => {
    try {
        const alergias = await Alergia.find().populate('pacientes');
        res.status(200).json(alergias);
    } catch (error) {
        console.error('Error retrieving alergias:', error);
        res.status(500).json({ message: 'Error retrieving alergias', error });
    }
});

// GET: Retrieve a specific Alergia by ID
router.get('/alergias/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const alergia = await Alergia.findById(id).populate('pacientes');
        if (!alergia) {
            return res.status(404).json({ message: 'Alergia not found' });
        }
        res.status(200).json(alergia);
    } catch (error) {
        console.error('Error retrieving alergia:', error);
        res.status(500).json({ message: 'Error retrieving alergia', error });
    }
});

// PUT: Update an existing Alergia
router.put('/alergias/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedAlergia = await Alergia.findByIdAndUpdate(id, req.body, { new: true }).populate('pacientes');
        if (!updatedAlergia) {
            return res.status(404).json({ message: 'Alergia not found' });
        }
        res.status(200).json({ message: 'Alergia updated successfully', updatedAlergia });
    } catch (error) {
        console.error('Error updating alergia:', error);
        res.status(400).json({ message: 'Error updating alergia', error });
    }
});

// DELETE: Delete an Alergia by ID
router.delete('/alergias/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAlergia = await Alergia.findByIdAndDelete(id);
        if (!deletedAlergia) {
            return res.status(404).json({ message: 'Alergia not found' });
        }
        res.status(200).json({ message: 'Alergia deleted successfully' });
    } catch (error) {
        console.error('Error deleting alergia:', error);
        res.status(500).json({ message: 'Error deleting alergia', error });
    }
});

module.exports = router;
