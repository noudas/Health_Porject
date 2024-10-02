import React, { useState, useEffect } from 'react';

function AlimentoForm({ enums, adicionarOuEditarAlimento, alimento }) {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    porcao: '',
    calorias: '',
    vitaminas: [],
    minerais: [],
  });

  // Atualiza o formulário quando o alimento em edição muda
  useEffect(() => {
    if (alimento) {
      setFormData(alimento);
    } else {
      resetForm();
    }
  }, [alimento]);

  const resetForm = () => {
    setFormData({ nome: '', tipo: '', porcao: '', calorias: '', vitaminas: [], minerais: [] });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarAlimento(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="nome">Nome do Alimento:</label>
        <input type="text" id="nome" value={formData.nome} onChange={handleInputChange} required />
      </div>
      <div className="field-group">
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" value={formData.tipo} onChange={handleInputChange} required>
          <option value="" disabled>Selecione</option>
          <option value="Carboidrato">Carboidrato</option>
          <option value="Proteína">Proteína</option>
          <option value="Gordura">Gordura</option>
          <option value="Fruta">Fruta</option>
          <option value="Vegetal">Vegetal</option>
          <option value="Laticínio">Laticínio</option>
          <option value="Bebida">Bebida</option>
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="porcao">Porção:</label>
        <input type="text" id="porcao" value={formData.porcao} onChange={handleInputChange} />
      </div>
      <div className="field-group">
        <label htmlFor="calorias">Calorias:</label>
        <input type="number" id="calorias" value={formData.calorias} onChange={handleInputChange} min="0" />
      </div>

      {/* Adicione campos para vitaminas e minerais conforme necessário */}
      
      <button type="submit">Registrar</button>
    </form>
  );
}

export default AlimentoForm;
