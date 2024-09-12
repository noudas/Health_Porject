// suplementoRoutes.js

const express = require('express');
const router = express.Router();
const Suplemento = require('../mongodb/models/suplemento');
const { isEmpty } = require('../utils/objUtils');

// POST: Create a new Suplemento record
router.post('/suplementos', async (req, res) => {
    try {
        const requiredFields = ['nome', 'dosagem', 'tipo', 'forma'];
        const missingFields = requiredFields.filter(field => isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const suplemento = new Suplemento({
            nome: req.body.nome,
            descricao: req.body.descricao || '',
            dosagem: req.body.dosagem,
            tipo: req.body.tipo,
            forma: req.body.forma
        });

        await suplemento.save();
        res.status(201).json({ message: 'Suplemento record created successfully', suplemento });
    } catch (error) {
        console.error('Error creating suplemento record:', error);
        res.status(400).json({ message: 'Error creating suplemento record', error });
    }
});

// GET: Retrieve all Suplementos records
router.get('/suplementos', async (req, res) => {
    try {
        const suplementos = await Suplemento.find().sort({ nome: 1 });
        res.status(200).json(suplementos);
    } catch (error) {
        console.error('Error retrieving suplementos records:', error);
        res.status(500).json({ message: 'Error retrieving suplementos records', error });
    }
});

// GET: Retrieve a specific Suplemento record by ID
router.get('/suplementos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const suplemento = await Suplemento.findById(id);
        if (!suplemento) {
            return res.status(404).json({ message: 'Suplemento record not found' });
        }
        res.status(200).json(suplemento);
    } catch (error) {
        console.error('Error retrieving suplemento record:', error);
        res.status(500).json({ message: 'Error retrieving suplemento record', error });
    }
});

// PUT: Update an existing Suplemento record
router.put('/suplementos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the suplemento record
        let suplemento = await Suplemento.findById(id);
        if (!suplemento) {
            return res.status(404).json({ message: 'Suplemento record not found' });
        }

        // Update fields
        suplemento.nome = req.body.nome || suplemento.nome;
        suplemento.descricao = req.body.descricao || suplemento.descricao;
        suplemento.dosagem = req.body.dosagem || suplemento.dosagem;
        suplemento.tipo = req.body.tipo || suplemento.tipo;
        suplemento.forma = req.body.forma || suplemento.forma;

        // Save the changes
        suplemento = await suplemento.save();
        res.status(200).json({ message: 'Suplemento record updated successfully', suplemento });
    } catch (error) {
        console.error('Error updating suplemento record:', error);
        res.status(400).json({ message: 'Error updating suplemento record', error });
    }
});

// DELETE: Delete a Suplemento record by ID
router.delete('/suplementos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedSuplemento = await Suplemento.findByIdAndDelete(id);
        if (!deletedSuplemento) {
            return res.status(404).json({ message: 'Suplemento record not found' });
        }
        res.status(200).json({ message: 'Suplemento record deleted successfully' });
    } catch (error) {
        console.error('Error deleting suplemento record:', error);
        res.status(500).json({ message: 'Error deleting suplemento record', error });
    }
});

module.exports = router;
