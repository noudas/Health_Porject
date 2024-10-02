// src/components/Alergias/AlergiaForm.js
import React, { useState } from 'react';

function AlergiaForm({ adicionarAlergia }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: '',
    severidade: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarAlergia(formData);
    setFormData({ nome: '', descricao: '', tipo: '', severidade: '' }); // Resetar formulário após o envio
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
      <textarea
        id="descricao"
        value={formData.descricao}
        onChange={handleInputChange}
        placeholder="Descrição"
      />
      <select id="tipo" value={formData.tipo} onChange={handleInputChange} required>
        <option value="" disabled>Selecione o Tipo</option>
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
      <select id="severidade" value={formData.severidade} onChange={handleInputChange} required>
        <option value="" disabled>Selecione a Severidade</option>
        <option value="Leve">Leve</option>
        <option value="Moderada">Moderada</option>
        <option value="Grave">Grave</option>
        <option value="Anafilática">Anafilática</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default AlergiaForm;
