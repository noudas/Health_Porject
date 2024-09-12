// esporteRoutes.js

const express = require('express');
const router = express.Router();
const Esporte = require('../mongodb/models/esporte');
const { isEmpty } = require('../utils/objUtils');

// POST: Create a new Esporte record
router.post('/esportes', async (req, res) => {
    try {
        const requiredFields = ['nome', 'categoria', 'intensidade'];
        const missingFields = requiredFields.filter(field => isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const esporte = new Esporte({
            nome: req.body.nome,
            categoria: req.body.categoria,
            intensidade: req.body.intensidade,
            duracaoMedia: req.body.duracaoMedia || 0,
            caloriasQueimadasPorHora: req.body.caloriasQueimadasPorHora || 0,
            localizacao: req.body.localizacao || ''
        });

        await esporte.save();
        res.status(201).json({ message: 'Esporte record created successfully', esporte });
    } catch (error) {
        console.error('Error creating esporte record:', error);
        res.status(400).json({ message: 'Error creating esporte record', error });
    }
});

// GET: Retrieve all Esportes records
router.get('/esportes', async (req, res) => {
    try {
        const esportes = await Esporte.find().sort({ nome: 1 });
        res.status(200).json(esportes);
    } catch (error) {
        console.error('Error retrieving esportes records:', error);
        res.status(500).json({ message: 'Error retrieving esportes records', error });
    }
});

// GET: Retrieve a specific Esporte record by ID
router.get('/esportes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const esporte = await Esporte.findById(id);
        if (!esporte) {
            return res.status(404).json({ message: 'Esporte record not found' });
        }
        res.status(200).json(esporte);
    } catch (error) {
        console.error('Error retrieving esporte record:', error);
        res.status(500).json({ message: 'Error retrieving esporte record', error });
    }
});

// PUT: Update an existing Esporte record
router.put('/esportes/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the esporte record
        let esporte = await Esporte.findById(id);
        if (!esporte) {
            return res.status(404).json({ message: 'Esporte record not found' });
        }

        // Update fields
        esporte.nome = req.body.nome || esporte.nome;
        esporte.categoria = req.body.categoria || esporte.categoria;
        esporte.intensidade = req.body.intensidade || esporte.intensidaSde;
        esporte.duracaoMedia = req.body.duracaoMedia !== undefined ? req.body.duracaoMedia : esporte.duracaoMedia;
        esporte.caloriasQueimadasPorHora = req.body.caloriasQueimadasPorHora !== undefined ? req.body.caloriasQueimadasPorHora : esporte.caloriasQueimadasPorHora;
        esporte.localizacao = req.body.localizacao || esporte.localizacao;

        // Save the changes
        esporte = await esporte.save();
        res.status(200).json({ message: 'Esporte record updated successfully', esporte });
    } catch (error) {
        console.error('Error updating esporte record:', error);
        res.status(400).json({ message: 'Error updating esporte record', error });
    }
});

// DELETE: Delete an Esporte record by ID
router.delete('/esportes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEsporte = await Esporte.findByIdAndDelete(id);
        if (!deletedEsporte) {
            return res.status(404).json({ message: 'Esporte record not found' });
        }
        res.status(200).json({ message: 'Esporte record deleted successfully' });
    } catch (error) {
        console.error('Error deleting esporte record:', error);
        res.status(500).json({ message: 'Error deleting esporte record', error });
    }
});

module.exports = router;
