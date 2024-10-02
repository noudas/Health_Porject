// src/components/Dietas/DietaForm.js

import React, { useState, useEffect } from 'react';

function DietaForm({ alimentos, horarios, adicionarOuEditarDieta, dieta }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    horarios: [],
    rotina: ''
  });

  // Atualizar o formulário com os dados da dieta selecionada para edição
  useEffect(() => {
    if (dieta) {
      setFormData(dieta);
    } else {
      resetForm();
    }
  }, [dieta]);

  const resetForm = () => {
    setFormData({ nome: '', descricao: '', horarios: [], rotina: '' });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarDieta(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="nome">Nome da Dieta:</label>
        <input
          type="text"
          id="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="field-group">
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          value={formData.descricao}
          onChange={handleInputChange}
        ></textarea>
      </div>
      {/* Implementar campos dinâmicos para horários e alimentos */}
      <div className="field-group">
        <label htmlFor="rotina">Rotina:</label>
        <textarea
          id="rotina"
          value={formData.rotina}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default DietaForm;
