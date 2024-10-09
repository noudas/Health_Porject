//EsporteForm.js

import React, { useState, useEffect } from 'react';

function EsporteForm({ adicionarOuEditarEsporte, esporte }) {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    intensidade: '',
    duracaoMedia: '',
    caloriasQueimadasPorHora: '',
    localizacao: '',
  });

  useEffect(() => {
    if (esporte) {
      setFormData(esporte); // Preenche o formulário com os dados do esporte
    }
  }, [esporte]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarEsporte(formData);
    setFormData({
      nome: '',
      categoria: '',
      intensidade: '',
      duracaoMedia: '',
      caloriasQueimadasPorHora: '',
      localizacao: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome:</label>
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <br />
      <label>Categoria:</label>
      <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma categoria</option>
        <option value="Aeróbico">Aeróbico</option>
        <option value="Anaeróbico">Anaeróbico</option>
        <option value="Flexibilidade">Flexibilidade</option>
        <option value="Força">Força</option>
        <option value="Resistência">Resistência</option>
      </select>
      <br />
      <label>Intensidade:</label>
      <select
        name="intensidade"
        value={formData.intensidade}
        onChange={handleChange}
        required
      >
        <option value="">Selecione a intensidade</option>
        <option value="Baixa">Baixa</option>
        <option value="Moderada">Moderada</option>
        <option value="Alta">Alta</option>
      </select>
      <br />
      <label>Duração Média (min):</label>
      <input
        type="number"
        name="duracaoMedia"
        value={formData.duracaoMedia}
        onChange={handleChange}
        required
      />
      <br />
      <label>Calorias Queimadas por Hora (kcal/h):</label>
      <input
        type="number"
        name="caloriasQueimadasPorHora"
        value={formData.caloriasQueimadasPorHora}
        onChange={handleChange}
        required
      />
      <br />
      <label>Localização:</label>
      <input
        type="text"
        name="localizacao"
        value={formData.localizacao}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Salvar Esporte</button>
    </form>
  );
}

export default EsporteForm;
