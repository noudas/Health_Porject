// src/components/Alergias/AlergiaForm.js
import React, { useState } from 'react';

function AlergiaForm({ adicionarAlergia }) {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    severidade: '',
    descricao: '', // Novo campo
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarAlergia(formData);
    setFormData({
      nome: '',
      tipo: '',
      severidade: '',
      descricao: '', // Limpar o campo
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          value={formData.nome}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          value={formData.tipo}
          onChange={handleInputChange}
        >
          <option value="Alimentar">Alimentar</option>
          <option value="Medicamento">Medicamento</option>
          <option value="Ambiental">Ambiental</option>
          <option value="Insectos">Insectos</option>
          <option value="Animais">Animais</option>
          <option value="Latex">Latex</option>
          <option value="Fragrâncias">Fragrâncias</option>
          <option value="Metais">Metais</option>
          <option value="Cosméticos">Cosméticos</option>
          <option value="Conservantes">Conservantes</option>
          <option value="Temperatura">Temperatura</option>
          <option value="Outros">Outros</option>
        </select>
      </div>
      <div>
        <label htmlFor="severidade">Severidade</label>
        <select
          id="severidade"
          value={formData.severidade}
          onChange={handleInputChange}
        >
          <option value="Leve">Leve</option>
          <option value="Moderada">Moderada</option>
          <option value="Grave">Grave</option>
          <option value="Anafilática">Anafilática</option>
        </select>
      </div>
      <div>
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={formData.descricao}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Adicionar Alergia</button>
    </form>
  );
}

export default AlergiaForm;