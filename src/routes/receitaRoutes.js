// routes/receitaRoutes.js

const express = require('express');
const router = express.Router();
const Receita = require('../mongodb/models/receita');

// POST: Create a new Receita
router.post('/receitas', async (req, res) => {
    try {
        const { nome, descricao, dataEmissao } = req.body;
        const receita = new Receita({ nome, descricao, dataEmissao });
        await receita.save();
        res.status(201).json({ message: 'Receita created successfully', receita });
    } catch (error) {
        res.status(400).json({ message: 'Error creating receita', error });
    }
});

// GET: Retrieve all Receitas
router.get('/receitas', async (req, res) => {
    try {
        const receitas = await Receita.find();
        res.status(200).json(receitas);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving receitas', error });
    }
});

// GET: Retrieve a single Receita by ID
router.get('/receitas/:id', async (req, res) => {
    try {
        const receita = await Receita.findById(req.params.id);
        if (!receita) {
            return res.status(404).json({ message: 'Receita not found' });
        }
        res.status(200).json(receita);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving receita', error });
    }
});

// PUT: Update a Receita by ID
router.put('/receitas/:id', async (req, res) => {
    try {
        const { nome, descricao, dataEmissao } = req.body;
        const receita = await Receita.findByIdAndUpdate(req.params.id, { nome, descricao, dataEmissao }, { new: true });
        if (!receita) {
            return res.status(404).json({ message: 'Receita not found' });
        }
        res.status(200).json({ message: 'Receita updated successfully', receita });
    } catch (error) {
        res.status(400).json({ message: 'Error updating receita', error });
    }
});

// DELETE: Delete a Receita by ID
router.delete('/receitas/:id', async (req, res) => {
    try {
        const receita = await Receita.findByIdAndDelete(req.params.id);
        if (!receita) {
            return res.status(404).json({ message: 'Receita not found' });
        }
        res.status(200).json({ message: 'Receita deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting receita', error });
    }
});

module.exports = router;
