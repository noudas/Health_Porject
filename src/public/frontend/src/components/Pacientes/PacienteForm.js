// src/components/Pacientes/PacienteForm.js

import React, { useState, useEffect } from 'react';

function PacienteForm({ adicionarOuEditarPaciente, sintomas, doencas, paciente }) {
  const [formData, setFormData] = useState({
    CPF: '',
    Nome: '',
    Sexo: '',
    Telefone: '',
    Celular: '',
    Email: '',
    Altura: '',
    Peso: '',
    CircunferenciaAbdominal: '',
    DataNascimento: '',
    alergias: [],
    emocionais: [],
    esportes: [],
    suplementos: [],
    sintomas: [],
    doencas: [],
    historicosFamiliares: [],
    dieta: '',
    horarios: [],
    medicamentos: []
  });

  // Atualizar o formulário quando o paciente em edição mudar
  useEffect(() => {
    if (paciente) {
      setFormData(paciente);
    } else {
      resetForm();
    }
  }, [paciente]);

  const resetForm = () => {
    setFormData({
      CPF: '',
      Nome: '',
      Sexo: '',
      Telefone: '',
      Celular: '',
      Email: '',
      Altura: '',
      Peso: '',
      CircunferenciaAbdominal: '',
      DataNascimento: '',
      alergias: [],
      emocionais: [],
      esportes: [],
      suplementos: [],
      sintomas: [],
      doencas: [],
      historicosFamiliares: [],
      dieta: '',
      horarios: [],
      medicamentos: []
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (e, field) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [field]: selectedValues });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarPaciente(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="CPF">CPF:</label>
        <input type="text" id="CPF" value={formData.CPF} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label htmlFor="Nome">Nome:</label>
        <input type="text" id="Nome" value={formData.Nome} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label htmlFor="Sexo">Sexo:</label>
        <select id="Sexo" value={formData.Sexo} onChange={handleInputChange} required>
          <option value="" disabled>Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </div>
      {/* Outros campos como telefone, email, altura, peso, etc. */}
      <div className="field-group">
        <label htmlFor="sintomas">Sintomas:</label>
        <select
          id="sintomas"
          multiple
          value={formData.sintomas}
          onChange={(e) => handleSelectChange(e, 'sintomas')}
        >
          {sintomas.map((sintoma) => (
            <option key={sintoma._id} value={sintoma._id}>
              {sintoma.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="doencas">Doenças:</label>
        <select
          id="doencas"
          multiple
          value={formData.doencas}
          onChange={(e) => handleSelectChange(e, 'doencas')}
        >
          {doencas.map((doenca) => (
            <option key={doenca._id} value={doenca._id}>
              {doenca.nome}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default PacienteForm;
