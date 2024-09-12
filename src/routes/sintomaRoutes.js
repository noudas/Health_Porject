// sintomaRoutes.js

const express = require('express');
const router = express.Router();
const Sintoma = require('../mongodb/models/sintoma');
const { isEmpty } = require('../utils/objUtils');

// POST: Create a new Sintoma record
router.post('/sintomas', async (req, res) => {
    try {
        const requiredFields = ['nome', 'gravidade', 'duracao', 'categoria'];
        const missingFields = requiredFields.filter(field => isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const sintoma = new Sintoma({
            nome: req.body.nome,
            descricao: req.body.descricao || '',
            gravidade: req.body.gravidade,
            duracao: req.body.duracao,
            categoria: req.body.categoria,
            dataInicio: req.body.dataInicio || null,
            dataFim: req.body.dataFim || null
        });

        await sintoma.save();
        res.status(201).json({ message: 'Sintoma record created successfully', sintoma });
    } catch (error) {
        console.error('Error creating sintoma record:', error);
        res.status(400).json({ message: 'Error creating sintoma record', error });
    }
});

// GET: Retrieve all Sintomas records
router.get('/sintomas', async (req, res) => {
    try {
        const sintomas = await Sintoma.find().sort({ nome: 1 });
        res.status(200).json(sintomas);
    } catch (error) {
        console.error('Error retrieving sintomas records:', error);
        res.status(500).json({ message: 'Error retrieving sintomas records', error });
    }
});

// GET: Retrieve a specific Sintoma record by ID
router.get('/sintomas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sintoma = await Sintoma.findById(id);
        if (!sintoma) {
            return res.status(404).json({ message: 'Sintoma record not found' });
        }
        res.status(200).json(sintoma);
    } catch (error) {
        console.error('Error retrieving sintoma record:', error);
        res.status(500).json({ message: 'Error retrieving sintoma record', error });
    }
});

// PUT: Update an existing Sintoma record
router.put('/sintomas/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the sintoma record
        let sintoma = await Sintoma.findById(id);
        if (!sintoma) {
            return res.status(404).json({ message: 'Sintoma record not found' });
        }

        // Update fields
        sintoma.nome = req.body.nome || sintoma.nome;
        sintoma.descricao = req.body.descricao || sintoma.descricao;
        sintoma.gravidade = req.body.gravidade || sintoma.gravidade;
        sintoma.duracao = req.body.duracao || sintoma.duracao;
        sintoma.categoria = req.body.categoria || sintoma.categoria;
        sintoma.dataInicio = req.body.dataInicio || sintoma.dataInicio;
        sintoma.dataFim = req.body.dataFim || sintoma.dataFim;

        // Save the changes
        sintoma = await sintoma.save();
        res.status(200).json({ message: 'Sintoma record updated successfully', sintoma });
    } catch (error) {
        console.error('Error updating sintoma record:', error);
        res.status(400).json({ message: 'Error updating sintoma record', error });
    }
});

// DELETE: Delete a Sintoma record by ID
router.delete('/sintomas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedSintoma = await Sintoma.findByIdAndDelete(id);
        if (!deletedSintoma) {
            return res.status(404).json({ message: 'Sintoma record not found' });
        }
        res.status(200).json({ message: 'Sintoma record deleted successfully' });
    } catch (error) {
        console.error('Error deleting sintoma record:', error);
        res.status(500).json({ message: 'Error deleting sintoma record', error });
    }
});

module.exports = router;
