// src/components/Esportes/EsporteForm.js

import React, { useState, useEffect } from 'react';

function EsporteForm({ adicionarOuEditarEsporte, esporte }) {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    intensidade: '',
    duracaoMedia: 0,
    caloriasQueimadasPorHora: 0,
    localizacao: ''
  });

  // Atualizar o formulário quando o esporte em edição mudar
  useEffect(() => {
    if (esporte) {
      setFormData(esporte);
    } else {
      resetForm();
    }
  }, [esporte]);

  const resetForm = () => {
    setFormData({ nome: '', categoria: '', intensidade: '', duracaoMedia: 0, caloriasQueimadasPorHora: 0, localizacao: '' });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarEsporte(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="nome"
        value={formData.nome}
        onChange={handleInputChange}
        placeholder="Nome"
        required
      />
      <select id="categoria" value={formData.categoria} onChange={handleInputChange} required>
        <option value="" disabled>Selecione a Categoria</option>
        <option value="Aeróbico">Aeróbico</option>
        <option value="Anaeróbico">Anaeróbico</option>
        <option value="Flexibilidade">Flexibilidade</option>
        <option value="Força">Força</option>
        <option value="Resistência">Resistência</option>
      </select>
      <select id="intensidade" value={formData.intensidade} onChange={handleInputChange} required>
        <option value="" disabled>Selecione a Intensidade</option>
        <option value="Baixa">Baixa</option>
        <option value="Moderada">Moderada</option>
        <option value="Alta">Alta</option>
      </select>
      <input
        type="number"
        id="duracaoMedia"
        value={formData.duracaoMedia}
        onChange={handleInputChange}
        placeholder="Duração Média (min)"
      />
      <input
        type="number"
        id="caloriasQueimadasPorHora"
        value={formData.caloriasQueimadasPorHora}
        onChange={handleInputChange}
        placeholder="Calorias Queimadas por Hora"
      />
      <input
        type="text"
        id="localizacao"
        value={formData.localizacao}
        onChange={handleInputChange}
        placeholder="Localização"
      />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default EsporteForm;
