const express = require('express');
const router = express.Router();
const Paciente = require('../mongodb/models/paciente');

// POST: Create a new Paciente
router.post('/pacientes', async (req, res) => {
    try {
        const { 
            CPF, Telefone, Celular, Nome, Sexo, Email, Altura, Peso, 
            CircunferenciaAbdominal, HorarioAcordar, Hidratacao, Sono, 
            Intestino, DataNascimento, alergias, emocionais, esportes, 
            suplementos, sintomas, doencas, historicosFamiliares, dieta, 
            horarios, medicamentos, fuma, tipoFumante, vezesPorSemanaFumo, 
            cigarrosPorDia, bebe, tipoBebida, vezesPorSemanaBebida 
        } = req.body;

        if (!CPF || !Telefone || !Nome || !Sexo || !Email || !Altura || !Peso || !CircunferenciaAbdominal) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const pacienteData = {
            CPF, Telefone, Celular, Nome, Sexo, Email,
            Altura: parseFloat(Altura),
            Peso: parseFloat(Peso),
            CircunferenciaAbdominal: parseFloat(CircunferenciaAbdominal),
            HorarioAcordar, Hidratacao, Sono, Intestino, DataNascimento,
            alergias, emocionais, esportes, suplementos, sintomas, doencas, 
            historicosFamiliares, dieta, horarios, medicamentos,
            fuma, tipoFumante, vezesPorSemanaFumo, cigarrosPorDia,
            bebe, tipoBebida, vezesPorSemanaBebida
        };

        const paciente = new Paciente(pacienteData);
        await paciente.save();

        res.status(201).json({ message: "Paciente created successfully", paciente });
    } catch (error) {
        console.error('Error creating paciente:', error.message, error.stack);
        res.status(400).json({ message: "Error creating paciente", error: error.message });
    }
});

// GET: Retrieve all Pacientes
router.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving pacientes", error });
    }
});

// GET: Retrieve a Paciente by ID
router.get('/pacientes/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) return res.status(404).json({ message: "Paciente not found" });
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving paciente", error });
    }
});

// PUT: Update a Paciente by ID
router.put('/pacientes/:id', async (req, res) => {
    try {
        const { 
            CPF, Telefone, Celular, Nome, Sexo, Email, Altura, Peso, 
            CircunferenciaAbdominal, HorarioAcordar, Hidratacao, Sono, 
            Intestino, DataNascimento, alergias, emocionais, esportes, 
            suplementos, sintomas, doencas, historicosFamiliares, dieta, 
            horarios, medicamentos, fuma, tipoFumante, vezesPorSemanaFumo, 
            cigarrosPorDia, bebe, tipoBebida, vezesPorSemanaBebida 
        } = req.body;

        const updateData = {};

        if (CPF) updateData.CPF = CPF;
        if (Telefone) updateData.Telefone = Telefone;
        if (Celular) updateData.Celular = Celular;
        if (Nome) updateData.Nome = Nome;
        if (Sexo) updateData.Sexo = Sexo;
        if (Email) updateData.Email = Email;
        if (Altura) updateData.Altura = parseFloat(Altura);
        if (Peso) updateData.Peso = parseFloat(Peso);
        if (CircunferenciaAbdominal) updateData.CircunferenciaAbdominal = parseFloat(CircunferenciaAbdominal);
        if (HorarioAcordar) updateData.HorarioAcordar = HorarioAcordar;
        if (Hidratacao) updateData.Hidratacao = Hidratacao;
        if (Sono) updateData.Sono = Sono;
        if (Intestino) updateData.Intestino = Intestino;
        if (DataNascimento) updateData.DataNascimento = DataNascimento;

        if (alergias) updateData.alergias = alergias;
        if (emocionais) updateData.emocionais = emocionais;
        if (esportes) updateData.esportes = esportes;
        if (suplementos) updateData.suplementos = suplementos;
        if (sintomas) updateData.sintomas = sintomas;
        if (doencas) updateData.doencas = doencas;
        if (historicosFamiliares) updateData.historicosFamiliares = historicosFamiliares;
        if (dieta) updateData.dieta = dieta;
        if (horarios) updateData.horarios = horarios;
        if (medicamentos) updateData.medicamentos = medicamentos;

        if (typeof fuma === 'boolean') updateData.fuma = fuma;
        if (tipoFumante) updateData.tipoFumante = tipoFumante;
        if (vezesPorSemanaFumo) updateData.vezesPorSemanaFumo = vezesPorSemanaFumo;
        if (cigarrosPorDia) updateData.cigarrosPorDia = cigarrosPorDia;

        if (typeof bebe === 'boolean') updateData.bebe = bebe;
        if (tipoBebida) updateData.tipoBebida = tipoBebida;
        if (vezesPorSemanaBebida) updateData.vezesPorSemanaBebida = vezesPorSemanaBebida;

        const updatedPaciente = await Paciente.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('alergias emocionais sintomas doencas historicosFamiliares.doenca dieta horarios medicamentos');

        if (!updatedPaciente) return res.status(404).json({ message: "Paciente not found" });
        res.status(200).json({ message: "Paciente updated successfully", updatedPaciente });
    } catch (error) {
        console.error('Error updating paciente:', error.message, error.stack);
        res.status(500).json({ message: "Error updating paciente", error: error.message });
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