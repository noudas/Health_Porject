// src/components/Doencas/DoencaForm.js

import React, { useState, useEffect } from 'react';

function DoencaForm({ adicionarOuEditarDoenca, sintomas, doenca }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: '',
    cid10: '',
    sintomas: []
  });

  // Atualizar o formulário quando a doença em edição mudar
  useEffect(() => {
    if (doenca) {
      setFormData(doenca);
    } else {
      resetForm();
    }
  }, [doenca]);

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      tipo: '',
      cid10: '',
      sintomas: []
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSintomaChange = (index, value) => {
    const newSintomas = [...formData.sintomas];
    newSintomas[index] = value;
    setFormData({ ...formData, sintomas: newSintomas });
  };

  const addSintomaField = () => {
    setFormData({ ...formData, sintomas: [...formData.sintomas, ''] });
  };

  const removeSintomaField = (index) => {
    const newSintomas = formData.sintomas.filter((_, i) => i !== index);
    setFormData({ ...formData, sintomas: newSintomas });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarDoenca(formData);
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
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" value={formData.tipo} onChange={handleInputChange} required>
          <option value="" disabled>Selecione o Tipo</option>
          <option value="Infecciosa">Infecciosa</option>
          <option value="Genética">Genética</option>
          <option value="Crônica">Crônica</option>
          <option value="Aguda">Aguda</option>
          <option value="Degenerativa">Degenerativa</option>
          <option value="Autoimune">Autoimune</option>
          <option value="Outros">Outros</option>
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="cid10">CID-10:</label>
        <input type="text" id="cid10" value={formData.cid10} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label>Sintomas:</label>
        {formData.sintomas.map((sintoma, index) => (
          <div key={index} className="sintoma-row">
            <select value={sintoma} onChange={(e) => handleSintomaChange(index, e.target.value)}>
              <option value="" disabled>Selecione um Sintoma</option>
              {sintomas.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.nome}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => removeSintomaField(index)}>Remover</button>
          </div>
        ))}
        <button type="button" onClick={addSintomaField}>Adicionar Sintoma</button>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default DoencaForm;