// src/components/Sintomas/SintomaForm.js

import React, { useState, useEffect } from 'react';

function SintomaForm({ adicionarOuEditarSintoma, sintoma }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    gravidade: '',
    duracao: '',
    categoria: '',
    dataInicio: '',
    dataFim: ''
  });

  // Atualizar o formulário quando o sintoma em edição mudar
  useEffect(() => {
    if (sintoma) {
      setFormData(sintoma);
    } else {
      resetForm();
    }
  }, [sintoma]);

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      gravidade: '',
      duracao: '',
      categoria: '',
      dataInicio: '',
      dataFim: ''
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarSintoma(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" value={formData.nome} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label htmlFor="descricao">Descrição:</label>
        <textarea id="descricao" value={formData.descricao} onChange={handleInputChange} />
      </div>
      <div className="field-group">
        <label htmlFor="gravidade">Gravidade:</label>
        <select id="gravidade" value={formData.gravidade} onChange={handleInputChange} required>
          <option value="" disabled>Selecione a Gravidade</option>
          <option value="Leve">Leve</option>
          <option value="Moderada">Moderada</option>
          <option value="Grave">Grave</option>
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="duracao">Duração:</label>
        <input type="text" id="duracao" value={formData.duracao} onChange={handleInputChange} />
      </div>
      <div className="field-group">
        <label htmlFor="categoria">Categoria:</label>
        <input type="text" id="categoria" value={formData.categoria} onChange={handleInputChange} />
      </div>
      <div className="field-group">
        <label htmlFor="dataInicio">Data de Início:</label>
        <input type="date" id="dataInicio" value={formData.dataInicio} onChange={handleInputChange} />
      </div>
      <div className="field-group">
        <label htmlFor="dataFim">Data de Fim:</label>
        <input type="date" id="dataFim" value={formData.dataFim} onChange={handleInputChange} />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default SintomaForm;
