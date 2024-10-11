// medicamentoRoutes.js

const express = require('express');
const router = express.Router();
const Medicamento = require('../mongodb/models/medicamentoModel');
const Detalhe = require('../mongodb/models/medicamento/detalhe');
const Posologia = require('../mongodb/models/medicamento/posologia');

// POST: Create a new Medicamento record
router.post('/medicamentos', async (req, res) => {
    try {
        const requiredFields = ['detalhes', 'posologia'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const medicamento = new Medicamento({
            detalhes: {
                nome: req.body.detalhes.nome,
                marca: req.body.detalhes.marca,
                composicao: req.body.detalhes.composicao,
                dosagem: req.body.detalhes.dosagem
            },
            posologia: {
                tipo: req.body.posologia.tipo,
                frequencia: req.body.posologia.frequencia,
                quantidade: req.body.posologia.quantidade,
                unidade: req.body.posologia.unidade,
                duracao: req.body.posologia.duracao,
                instrucoesEspeciais: req.body.posologia.instrucoesEspeciais
            },
            duracaoEfeito: req.body.duracaoEfeito || '',
            tempoParaUso: req.body.tempoParaUso || '',
            dataInicioIngestao: req.body.dataInicioIngestao || null,
            dataFimIngestao: req.body.dataFimIngestao || null,
            observacoes: req.body.observacoes || ''
        });

        await medicamento.save();
        res.status(201).json({ message: 'Medicamento record created successfully', medicamento });
    } catch (error) {
        console.error('Error creating medicamento record:', error);
        res.status(400).json({ message: 'Error creating medicamento record', error });
    }
});

// GET: Retrieve all Medicamento records
router.get('/medicamentos', async (req, res) => {
    try {
        const medicamentos = await Medicamento.find()
            .select('-__v -createdAt -updatedAt');
        res.status(200).json(medicamentos);
    } catch (error) {
        console.error('Error retrieving medicamentos records:', error);
        res.status(500).json({ message: 'Error retrieving medicamentos records', error });
    }
});

// GET: Retrieve a specific Medicamento record by ID
router.get('/medicamentos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const medicamento = await Medicamento.findById(id)
            .select('-__v -createdAt -updatedAt');
        if (!medicamento) {
            return res.status(404).json({ message: 'Medicamento record not found' });
        }
        res.status(200).json(medicamento);
    } catch (error) {
        console.error('Error retrieving medicamento record:', error);
        res.status(500).json({ message: 'Error retrieving medicamento record', error });
    }
});

// PUT: Update an existing Medicamento record
router.put('/medicamentos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the medicamento record
        let medicamento = await Medicamento.findById(id);
        if (!medicamento) {
            return res.status(404).json({ message: 'Medicamento record not found' });
        }

        // Update fields
        medicamento.detalhes = {
            nome: req.body.detalhes.nome || medicamento.detalhes.nome,
            marca: req.body.detalhes.marca || medicamento.detalhes.marca,
            composicao: req.body.detalhes.composicao || medicamento.detalhes.composicao,
            dosagem: req.body.detalhes.dosagem || medicamento.detalhes.dosagem
        };
        medicamento.posologia = {
            tipo: req.body.posologia.tipo || medicamento.posologia.tipo,
            frequencia: req.body.posologia.frequencia || medicamento.posologia.frequencia,
            quantidade: req.body.posologia.quantidade || medicamento.posologia.quantidade,
            unidade: req.body.posologia.unidade || medicamento.posologia.unidade,
            duracao: req.body.posologia.duracao || medicamento.posologia.duracao,
            instrucoesEspeciais: req.body.posologia.instrucoesEspeciais || medicamento.posologia.instrucoesEspeciais
        };
        medicamento.duracaoEfeito = req.body.duracaoEfeito || medicamento.duracaoEfeito;
        medicamento.tempoParaUso = req.body.tempoParaUso || medicamento.tempoParaUso;
        medicamento.dataInicioIngestao = req.body.dataInicioIngestao || medicamento.dataInicioIngestao;
        medicamento.dataFimIngestao = req.body.dataFimIngestao || medicamento.dataFimIngestao;
        medicamento.observacoes = req.body.observacoes || medicamento.observacoes;

        // Save the changes
        medicamento = await medicamento.save();
        res.status(200).json({ message: 'Medicamento record updated successfully', medicamento });
    } catch (error) {
        console.error('Error updating medicamento record:', error);
        res.status(400).json({ message: 'Error updating medicamento record', error });
    }
});

// DELETE: Delete a Medicamento record by ID
router.delete('/medicamentos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMedicamento = await Medicamento.findByIdAndDelete(id);
        if (!deletedMedicamento) {
            return res.status(404).json({ message: 'Medicamento record not found' });
        }
        res.status(200).json({ message: 'Medicamento record deleted successfully' });
    } catch (error) {
        console.error('Error deleting medicamento record:', error);
        res.status(500).json({ message: 'Error deleting medicamento record', error });
    }
});

// GET: Retrieve all Detalhes records
router.get('/detalhes', async (req, res) => {
    try {
        const detalhes = await Detalhe.find().select('-__v');
        res.status(200).json(detalhes);
    } catch (error) {
        console.error('Error retrieving detalhes records:', error);
        res.status(500).json({ message: 'Error retrieving detalhes records', error });
    }
});

// GET: Retrieve a specific Detalhes record by ID
router.get('/detalhes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const detalhes = await Detalhe.findById(id).select('-__v');
        if (!detalhes) {
            return res.status(404).json({ message: 'Detalhes record not found' });
        }
        res.status(200).json(detalhes);
    } catch (error) {
        console.error('Error retrieving detalhes record:', error);
        res.status(500).json({ message: 'Error retrieving detalhes record', error });
    }
});

// PUT: Update an existing Detalhes record
router.put('/detalhes/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the detalhes record
        let detalhes = await Detalhe.findByIdAndUpdate(id, req.body, { new: true });
        if (!detalhes) {
            return res.status(404).json({ message: 'Detalhes record not found' });
        }

        res.status(200).json({ message: 'Detalhes record updated successfully', detalhes });
    } catch (error) {
        console.error('Error updating detalhes record:', error);
        res.status(400).json({ message: 'Error updating detalhes record', error });
    }
});

// DELETE: Delete a Detalhes record by ID
router.delete('/detalhes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDetalhes = await Detalhe.findByIdAndDelete(id);
        if (!deletedDetalhes) {
            return res.status(404).json({ message: 'Detalhes record not found' });
        }
        res.status(200).json({ message: 'Detalhes record deleted successfully' });
    } catch (error) {
        console.error('Error deleting detalhes record:', error);
        res.status(500).json({ message: 'Error deleting detalhes record', error });
    }
});

// GET: Retrieve all Posologia records
router.get('/posologias', async (req, res) => {
    try {
        const posologias = await Posologia.find().select('-__v');
        res.status(200).json(posologias);
    } catch (error) {
        console.error('Error retrieving posologias records:', error);
        res.status(500).json({ message: 'Error retrieving posologias records', error });
    }
});

// GET: Retrieve a specific Posologia record by ID
router.get('/posologias/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const posologia = await Posologia.findById(id).select('-__v');
        if (!posologia) {
            return res.status(404).json({ message: 'Posologia record not found' });
        }
        res.status(200).json(posologia);
    } catch (error) {
        console.error('Error retrieving posologia record:', error);
        res.status(500).json({ message: 'Error retrieving posologia record', error });
    }
});

// PUT: Update an existing Posologia record
router.put('/posologias/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the posologia record
        let posologia = await Posologia.findByIdAndUpdate(id, req.body, { new: true });
        if (!posologia) {
            return res.status(404).json({ message: 'Posologia record not found' });
        }

        res.status(200).json({ message: 'Posologia record updated successfully', posologia });
    } catch (error) {
        console.error('Error updating posologia record:', error);
        res.status(400).json({ message: 'Error updating posologia record', error });
    }
});

// DELETE: Delete a Posologia record by ID
router.delete('/posologias/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPosologia = await Posologia.findByIdAndDelete(id);
        if (!deletedPosologia) {
            return res.status(404).json({ message: 'Posologia record not found' });
        }
        res.status(200).json({ message: 'Posologia record deleted successfully' });
    } catch (error) {
        console.error('Error deleting posologia record:', error);
        res.status(500).json({ message: 'Error deleting posologia record', error });
    }
});

module.exports = router;