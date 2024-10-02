// src/components/Medicamentos/MedicamentoForm.js

import React, { useState, useEffect } from 'react';

function MedicamentoForm({ adicionarOuEditarMedicamento, pacientes, medicamento }) {
  const [formData, setFormData] = useState({
    paciente: '',
    detalhes: { nome: '', marca: '', composicao: '', dosagem: '' },
    posologia: { tipo: '', frequencia: '', quantidade: '', unidade: '', duracao: '', instrucoesEspeciais: '' },
    duracaoEfeito: '',
    tempoParaUso: '',
    dataInicioIngestao: '',
    dataFimIngestao: '',
    observacoes: ''
  });

  // Atualizar o formulário quando o medicamento em edição mudar
  useEffect(() => {
    if (medicamento) {
      setFormData(medicamento);
    } else {
      resetForm();
    }
  }, [medicamento]);

  const resetForm = () => {
    setFormData({
      paciente: '',
      detalhes: { nome: '', marca: '', composicao: '', dosagem: '' },
      posologia: { tipo: '', frequencia: '', quantidade: '', unidade: '', duracao: '', instrucoesEspeciais: '' },
      duracaoEfeito: '',
      tempoParaUso: '',
      dataInicioIngestao: '',
      dataFimIngestao: '',
      observacoes: ''
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarMedicamento(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="paciente">Paciente:</label>
        <select id="paciente" value={formData.paciente} onChange={handleInputChange} required>
          <option value="" disabled>Selecione um Paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente._id} value={paciente._id}>
              {paciente.Nome}
            </option>
          ))}
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="nome">Nome do Medicamento:</label>
        <input type="text" id="nome" value={formData.detalhes.nome} onChange={handleInputChange} required />
      </div>
      {/* Adicionar outros campos conforme necessário */}
      <div className="field-group">
        <label htmlFor="tipo">Tipo de Posologia:</label>
        <select id="tipo" value={formData.posologia.tipo} onChange={handleInputChange} required>
          <option value="" disabled>Selecione o Tipo</option>
          <option value="oral">Oral</option>
          <option value="intravenosa">Intravenosa</option>
          <option value="tópica">Tópica</option>
          <option value="parenteral">Parenteral</option>
          <option value="inhalada">Inhalada</option>
          <option value="outra">Outra</option>
        </select>
      </div>
      {/* Outros campos */}
      <button type="submit">Registrar</button>
    </form>
  );
}

export default MedicamentoForm;
