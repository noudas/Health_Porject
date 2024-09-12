// doencaRoutes.js

const express = require('express');
const router = express.Router();
const Doenca = require('../mongodb/models/doenca');
const Sintoma = require('../mongodb/models/sintoma'); // Assuming you have a Sintoma model
const { isEmpty } = require('../utils/objUtils');

// POST: Create a new Doença
router.post('/doencas', async (req, res) => {
    try {
        const requiredFields = ['nome', 'tipo', 'cid10'];
        const missingFields = requiredFields.filter(field => isEmpty(req.body[field]));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: 'Missing required fields', missingFields });
        }

        const doenca = new Doenca(req.body);

        // Add sintomas if provided
        if (req.body.sintomas) {
            const sintomaIds = await Promise.all(req.body.sintomas.map(async (sintomaId) => {
                try {
                    const sintoma = await Sintoma.findById(sintomaId);
                    if (!sintoma) {
                        throw new Error(`Sintoma with ID ${sintomaId} not found`);
                    }
                    return sintoma._id;
                } catch (error) {
                    console.error(`Error finding sintoma ${sintomaId}:`, error);
                    return null;
                }
            }));

            doenca.sintomas = sintomaIds.filter(id => id !== null);
        }

        await doenca.save();
        res.status(201).json({ message: 'Doença created successfully', doenca });
    } catch (error) {
        console.error('Error creating doença:', error);
        res.status(400).json({ message: 'Error creating doença', error });
    }
});

// GET: Retrieve all Doenças
router.get('/doencas', async (req, res) => {
    try {
        const doencas = await Doenca.find().populate('sintomas');
        res.status(200).json(doencas);
    } catch (error) {
        console.error('Error retrieving doencas:', error);
        res.status(500).json({ message: 'Error retrieving doencas', error });
    }
});

// GET: Retrieve a specific Doença by ID
router.get('/doencas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const doenca = await Doenca.findById(id).populate('sintomas');
        if (!doenca) {
            return res.status(404).json({ message: 'Doença not found' });
        }
        res.status(200).json(doenca);
    } catch (error) {
        console.error('Error retrieving doença:', error);
        res.status(500).json({ message: 'Error retrieving doença', error });
    }
});

// PUT: Update an existing Doença
router.put('/doencas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // Update sintomas if provided
        if (req.body.sintomas) {
            const sintomaIds = await Promise.all(req.body.sintomas.map(async (sintomaId) => {
                try {
                    const sintoma = await Sintoma.findById(sintomaId);
                    if (!sintoma) {
                        throw new Error(`Sintoma with ID ${sintomaId} not found`);
                    }
                    return sintoma._id;
                } catch (error) {
                    console.error(`Error finding sintoma ${sintomaId}:`, error);
                    return null;
                }
            }));

            req.body.sintomas = sintomaIds.filter(id => id !== null);
        }

        const updatedDoenca = await Doenca.findByIdAndUpdate(id, req.body, { new: true }).populate('sintomas');
        if (!updatedDoenca) {
            return res.status(404).json({ message: 'Doença not found' });
        }
        res.status(200).json({ message: 'Doença updated successfully', updatedDoenca });
    } catch (error) {
        console.error('Error updating doença:', error);
        res.status(400).json({ message: 'Error updating doença', error });
    }
});

// DELETE: Delete a Doença by ID
router.delete('/doencas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDoenca = await Doenca.findByIdAndDelete(id);
        if (!deletedDoenca) {
            return res.status(404).json({ message: 'Doença not found' });
        }
        res.status(200).json({ message: 'Doença deleted successfully' });
    } catch (error) {
        console.error('Error deleting doença:', error);
        res.status(500).json({ message: 'Error deleting doença', error });
    }
});

module.exports = router;
