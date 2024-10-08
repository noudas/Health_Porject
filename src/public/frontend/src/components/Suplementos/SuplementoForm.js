import React, { useState } from 'react';

function SuplementoForm({ adicionarOuEditarSuplemento }) {
  const [formData, setFormData] = useState({
    nome: '',
    dosagem: '',
    descricao: '',
    tipo: '',
    forma: ''
  });

  const tipos = ['Vitamina', 'Mineral', 'Aminoácido'];
  const formas = ['Comprimido', 'Cápsula'];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarSuplemento(formData);
    setFormData({
      nome: '',
      descricao: '',
      dosagem: '',
      tipo: '',
      forma: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" value={formData.nome} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label htmlFor="dosagem">Dosagem:</label>
        <input type="text" id="dosagem" value={formData.dosagem} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label htmlFor="descricao">Descricao:</label>
        <input type="text" id="descricao" value={formData.descricao} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" value={formData.tipo} onChange={handleInputChange} required>
          <option value="" disabled>Selecione o Tipo</option>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="forma">Forma:</label>
        <select id="forma" value={formData.forma} onChange={handleInputChange} required>
          <option value="" disabled>Selecione a Forma</option>
          {formas.map(forma => (
            <option key={forma} value={forma}>{forma}</option>
          ))}
        </select>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default SuplementoForm;
