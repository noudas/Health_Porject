// dietaRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Dieta = require('../mongodb/models/dieta/dieta');
const Horario = require('../mongodb/models/dieta/horario');
const { Alimento, vitaminasEnum, unidadesMedidaEnum, mineraisEnum } = require('../mongodb/models/dieta/alimento');
const Paciente = require('../mongodb/models/paciente');






router.post('/dietas', async (req, res) => {
    try {
        const requiredFields = ['horarios'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const horarios = req.body.horarios || [];

        // Validate horarios
        const validHorarios = horarios.map((horario, i) => {
            if (!horario.tipo || !horario.alimento) {
                throw new Error(`Invalid horario structure at index ${i}: ${JSON.stringify(horario)}`);
            }
            return horario;
        });

        const dieta = new Dieta({
            horarios: validHorarios,
            rotina: req.body.rotina || ''
        });

        await dieta.save();
        res.status(201).json({ message: 'Dieta record created successfully', dieta });
    } catch (error) {
        console.error('Error creating dieta record:', error);
        res.status(400).json({ message: 'Error creating dieta record', errorMessage: error.message });
    }
});

// GET
router.get('/dietas', async (req, res) => {
    try {
        const dietas = await Dieta.find().populate('horarios.alimento');
        res.status(200).json(dietas);
    } catch (error) {
        console.error('Error retrieving dietas records:', error);
        res.status(500).json({ message: 'Error retrieving dietas records', error });
    }
});

router.get('/dietas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dieta = await Dieta.findById(id).populate('horarios.alimento');
        if (!dieta) {
            return res.status(404).json({ message: 'Dieta record not found' });
        }
        res.status(200).json(dieta);
    } catch (error) {
        console.error('Error retrieving dieta record:', error);
        res.status(500).json({ message: 'Error retrieving dieta record', error });
    }
});

//PUT
router.put('/dietas/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the dieta record
        let dieta = await Dieta.findById(id);
        if (!dieta) {
            return res.status(404).json({ message: 'Dieta record not found' });
        }

        // Update fields
        dieta.horarios = req.body.horarios || dieta.horarios;
        dieta.rotina = req.body.rotina || dieta.rotina;

        // Save the changes
        dieta = await dieta.save();
        res.status(200).json({ message: 'Dieta record updated successfully', dieta });
    } catch (error) {
        console.error('Error updating dieta record:', error);
        res.status(400).json({ message: 'Error updating dieta record', error });
    }
});

// DELETE: Delete a Dieta record by ID
router.delete('/dietas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDieta = await Dieta.findByIdAndDelete(id);
        if (!deletedDieta) {
            return res.status(404).json({ message: 'Dieta record not found' });
        }
        res.status(200).json({ message: 'Dieta record deleted successfully' });
    } catch (error) {
        console.error('Error deleting dieta record:', error);
        res.status(500).json({ message: 'Error deleting dieta record', error });
    }
});

router.post('/horarios', async (req, res) => {
    try {
        const { hora, tipo, alimento, observacoes } = req.body;

        // Validate required fields
        if (!hora || !tipo) {
            return res.status(400).json({ message: 'Missing required fields: hora and tipo are required.' });
        }

        // Validate if alimento ID is valid ObjectId
        if (alimento && !mongoose.Types.ObjectId.isValid(alimento)) {
            return res.status(400).json({ message: 'Invalid alimento ID' });
        }

        // Check if alimento exists
        if (alimento) {
            const alimentoExists = await Alimento.findById(alimento);
            if (!alimentoExists) {
                return res.status(404).json({ message: 'Alimento not found' });
            }
        }

        const horario = new Horario({
            hora,
            tipo,
            alimento,
            observacoes
        });

        await horario.save();
        res.status(201).json({ message: 'Horario record created successfully', horario });
    } catch (error) {
        console.error('Error creating horario record:', error);
        res.status(400).json({ message: 'Error creating horario record', errorMessage: error.message });
    }
});











router.post('/horarios', async (req, res) => {
    try {
        const { hora, tipo, observacoes } = req.body;

        // Validate required fields
        if (!hora || !tipo) {
            return res.status(400).json({ message: 'Missing required fields: hora and tipo are required.' });
        }

        const horario = new Horario({
            hora,
            tipo,
            observacoes
        });

        await horario.save();
        res.status(201).json({ message: 'Horario record created successfully', horario });
    } catch (error) {
        console.error('Error creating horario record:', error);
        res.status(400).json({ message: 'Error creating horario record', errorMessage: error.message });
    }
});


// GET: Retrieve all Horarios records
router.get('/horarios', async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.status(200).json(horarios);
    } catch (error) {
        console.error('Error retrieving horarios records:', error);
        res.status(500).json({ message: 'Error retrieving horarios records', error });
    }
});

// GET: Retrieve a specific Horario record by ID
router.get('/horarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const horario = await Horario.findById(id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario record not found' });
        }
        res.status(200).json(horario);
    } catch (error) {
        console.error('Error retrieving horario record:', error);
        res.status(500).json({ message: 'Error retrieving horario record', error });
    }
});

// PUT: Update an existing Horario record
router.put('/horarios/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the horario record
        let horario = await Horario.findById(id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario record not found' });
        }

        // Update fields
        horario.hora = req.body.hora || horario.hora;
        horario.tipo = req.body.tipo || horario.tipo;
        horario.observacoes = req.body.observacoes || horario.observacoes;

        // Save the changes
        horario = await horario.save();
        res.status(200).json({ message: 'Horario record updated successfully', horario });
    } catch (error) {
        console.error('Error updating horario record:', error);
        res.status(400).json({ message: 'Error updating horario record', error });
    }
});

// DELETE: Delete a Horario record by ID
router.delete('/horarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedHorario = await Horario.findByIdAndDelete(id);
        if (!deletedHorario) {
            return res.status(404).json({ message: 'Horario record not found' });
        }
        res.status(200).json({ message: 'Horario record deleted successfully' });
    } catch (error) {
        console.error('Error deleting horario record:', error);
        res.status(500).json({ message: 'Error deleting horario record', error });
    }
});












// GET: Retrieve all Alimento records
router.get('/alimentos', async (req, res) => {
    try {
        const alimentos = await Alimento.find().sort({ nome: 1 });
        res.status(200).json(alimentos);
    } catch (error) {
        console.error('Error retrieving alimentos records:', error);
        res.status(500).json({ message: 'Error retrieving alimentos records', error });
    }
});

// GET: Retrieve a specific Alimento record by ID
router.get('/alimentos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const alimento = await Alimento.findById(id);
        if (!alimento) {
            return res.status(404).json({ message: 'Alimento record not found' });
        }
        res.status(200).json(alimento);
    } catch (error) {
        console.error('Error retrieving alimento record:', error);
        res.status(500).json({ message: 'Error retrieving alimento record', error });
    }
});

// PUT: Update an existing Alimento record
router.put('/alimentos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the alimento record
        let alimento = await Alimento.findById(id);
        if (!alimento) {
            return res.status(404).json({ message: 'Alimento record not found' });
        }

        // Validação adicional para vitaminas e minerais
        const validateNutrient = (nutrient) => {
            if (!nutrient.tipo || !vitaminasEnum.includes(nutrient.tipo)) {
                throw new Error('Invalid vitamina type');
            }
            if (typeof nutrient.quantidade !== 'number' || nutrient.quantidade <= 0) {
                throw new Error('Invalid quantidade value');
            }
            if (!unidadesMedidaEnum.includes(nutrient.unidadeMedida)) {
                throw new Error('Invalid unidadeMedida');
            }
        };

        const validateMineral = (mineral) => {
            if (!mineral.tipo || !mineraisEnum.includes(mineral.tipo)) {
                throw new Error('Invalid mineral type');
            }
            if (typeof mineral.quantidade !== 'number' || mineral.quantidade <= 0) {
                throw new Error('Invalid quantidade value');
            }
            if (!unidadesMedidaEnum.includes(mineral.unidadeMedida)) {
                throw new Error('Invalid unidadeMedida');
            }
        };

        try {
            req.body.vitaminas?.forEach(validateNutrient);
            req.body.minerais?.forEach(validateMineral);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        // Update fields
        alimento.nome = req.body.nome || alimento.nome;
        alimento.tipo = req.body.tipo || alimento.tipo;
        alimento.porcao = req.body.porcao || alimento.porcao;
        alimento.calorias = req.body.calorias || alimento.calorias;
        
        // Atualizar vitaminas e minerais
        if (req.body.vitaminas) {
            alimento.vitaminas = req.body.vitaminas;
        }
        if (req.body.minerais) {
            alimento.minerais = req.body.minerais;
        }

        // Save the changes
        alimento = await alimento.save();
        res.status(200).json({ message: 'Alimento record updated successfully', alimento });
    } catch (error) {
        console.error('Error updating alimento record:', error);
        res.status(400).json({ message: 'Error updating alimento record', errorMessage: error.message });
    }
});


// DELETE: Delete an Alimento record by ID
router.delete('/alimentos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAlimento = await Alimento.findByIdAndDelete(id);
        if (!deletedAlimento) {
            return res.status(404).json({ message: 'Alimento record not found' });
        }
        res.status(200).json({ message: 'Alimento record deleted successfully' });
    } catch (error) {
        console.error('Error deleting alimento record:', error);
        res.status(500).json({ message: 'Error deleting alimento record', error });
    }
});

// POST: Add a new Alimento record
router.post('/alimentos', async (req, res) => {
    try {
        const requiredFields = ['nome', 'tipo', 'porcao', 'calorias'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        // Validação adicional para vitaminas e minerais
        const validateNutrient = (nutrient) => {
            if (!nutrient.tipo || !vitaminasEnum.includes(nutrient.tipo)) {
                throw new Error('Invalid vitamina type');
            }
            if (typeof nutrient.quantidade !== 'number' || nutrient.quantidade <= 0) {
                throw new Error('Invalid quantidade value');
            }
            if (!unidadesMedidaEnum.includes(nutrient.unidadeMedida)) {
                throw new Error('Invalid unidadeMedida');
            }
        };

        const validateMineral = (mineral) => {
            if (!mineral.tipo || !mineraisEnum.includes(mineral.tipo)) {
                throw new Error('Invalid mineral type');
            }
            if (typeof mineral.quantidade !== 'number' || mineral.quantidade <= 0) {
                throw new Error('Invalid quantidade value');
            }
            if (!unidadesMedidaEnum.includes(mineral.unidadeMedida)) {
                throw new Error('Invalid unidadeMedida');
            }
        };

        try {
            req.body.vitaminas?.forEach(validateNutrient);
            req.body.minerais?.forEach(validateMineral);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const alimento = new Alimento({
            nome: req.body.nome,
            tipo: req.body.tipo,
            porcao: req.body.porcao,
            calorias: req.body.calorias,
            vitaminas: req.body.vitaminas || [],
            minerais: req.body.minerais || []
        });

        await alimento.save();
        res.status(201).json({ message: 'Alimento record created successfully', alimento });
    } catch (error) {
        console.error('Error creating alimento record:', error);
        res.status(400).json({ message: 'Error creating alimento record', errorMessage: error.message });
    }
});


// GET: Search Alimentos by name or type
router.get('/alimentos/search', async (req, res) => {
    try {
        const query = req.query.q || '';
        const limit = parseInt(req.query.limit) || 20;
        const page = parseInt(req.query.page) || 1;

        const skip = (page - 1) * limit;
        const searchResults = await Alimento.find({
            $or: [
                { nome: { $regex: query, $options: 'i' } },
                { tipo: { $regex: query, $options: 'i' } }
            ]
        }).skip(skip).limit(limit);

        const total = await Alimento.countDocuments({
            $or: [
                { nome: { $regex: query, $options: 'i' } },
                { tipo: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json({ results: searchResults, total });
    } catch (error) {
        console.error('Error searching alimentos:', error);
        res.status(500).json({ message: 'Error searching alimentos', error });
    }
});

router.get('/enums', (req, res) => {
    res.json({
        vitaminas: vitaminasEnum,
        unidadesMedida: unidadesMedidaEnum,
        minerais: mineraisEnum
    });
});


module.exports = router;