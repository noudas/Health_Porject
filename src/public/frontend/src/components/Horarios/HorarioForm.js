// src/components/Horarios/HorarioForm.js

import React, { useState, useEffect } from 'react';

function HorarioForm({ adicionarOuEditarHorario, horario }) {
  const [formData, setFormData] = useState({
    hora: '',
    tipo: '',
    observacoes: ''
  });

  // Atualizar o formulário quando o horário em edição mudar
  useEffect(() => {
    if (horario) {
      setFormData(horario);
    } else {
      resetForm();
    }
  }, [horario]);

  const resetForm = () => {
    setFormData({ hora: '', tipo: '', observacoes: '' });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarHorario(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="hora">Hora:</label>
        <input
          type="datetime-local"
          id="hora"
          value={formData.hora}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="field-group">
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" value={formData.tipo} onChange={handleInputChange} required>
          <option value="" disabled>Selecione</option>
          <option value="Café da manhã">Café da manhã</option>
          <option value="Lanche da manhã">Lanche da manhã</option>
          <option value="Almoço">Almoço</option>
          <option value="Lanche da tarde">Lanche da tarde</option>
          <option value="Jantar">Jantar</option>
          <option value="Ceia">Ceia</option>
          <option value="Hidratação">Hidratação</option>
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="observacoes">Observações:</label>
        <input
          type="text"
          id="observacoes"
          value={formData.observacoes}
          onChange={handleInputChange}
          maxLength="100"
          placeholder="Ex: Tomar com água"
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default HorarioForm;
