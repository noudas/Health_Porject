// src/components/Medicamentos/MedicamentoForm.js

import React, { useState, useEffect } from 'react';

function MedicamentoForm({ adicionarOuEditarMedicamento, medicamento }) {
  const [formData, setFormData] = useState({
    detalhes: { nome: '', marca: '', composicao: '', dosagem: '' },
    posologia: { tipo: '', frequencia: '', quantidade: '', unidade: '', duracao: '', instrucoesEspeciais: '' },
    duracaoEfeito: '',
    tempoParaUso: '',
    dataInicioIngestao: '',
    dataFimIngestao: '',
    observacoes: ''
  });

  useEffect(() => {
    if (medicamento) {
      setFormData(medicamento);
    } else {
      resetForm();
    }
  }, [medicamento]);

  const resetForm = () => {
    setFormData({
      detalhes: { nome: '', marca: '', composicao: '', dosagem: '' },
      posologia: { tipo: '', frequencia: '', quantidade: '', unidade: '', duracao: '', instrucoesEspeciais: '' },
      duracaoEfeito: '',
      tempoParaUso: '',
      dataInicioIngestao: '',
      dataFimIngestao: '',
      observacoes: ''
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const [field, subField] = id.split('.');

    if (subField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarOuEditarMedicamento(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="detalhes.nome">Nome do Medicamento:</label>
        <input type="text" id="detalhes.nome" value={formData.detalhes.nome} onChange={handleInputChange} required />
      </div>

      <div className="field-group">
        <label htmlFor="detalhes.marca">Marca:</label>
        <input type="text" id="detalhes.marca" value={formData.detalhes.marca} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="detalhes.composicao">Composição:</label>
        <input type="text" id="detalhes.composicao" value={formData.detalhes.composicao} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="detalhes.dosagem">Dosagem:</label>
        <input type="text" id="detalhes.dosagem" value={formData.detalhes.dosagem} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="posologia.tipo">Tipo de Posologia:</label>
        <select id="posologia.tipo" value={formData.posologia.tipo} onChange={handleInputChange} required>
          <option value="" disabled>Selecione o Tipo</option>
          <option value="oral">Oral</option>
          <option value="intravenosa">Intravenosa</option>
          <option value="tópica">Tópica</option>
          <option value="parenteral">Parenteral</option>
          <option value="inhalada">Inhalada</option>
          <option value="outra">Outra</option>
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="posologia.frequencia">Frequência:</label>
        <input type="text" id="posologia.frequencia" value={formData.posologia.frequencia} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="posologia.quantidade">Quantidade:</label>
        <input type="text" id="posologia.quantidade" value={formData.posologia.quantidade} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="posologia.unidade">Unidade:</label>
        <input type="text" id="posologia.unidade" value={formData.posologia.unidade} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="posologia.duracao">Duração:</label>
        <input type="text" id="posologia.duracao" value={formData.posologia.duracao} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="duracaoEfeito">Duração do Efeito:</label>
        <input type="text" id="duracaoEfeito" value={formData.duracaoEfeito} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="tempoParaUso">Tempo para Uso:</label>
        <input type="text" id="tempoParaUso" value={formData.tempoParaUso} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="dataInicioIngestao">Data de Início da Ingestão:</label>
        <input type="date" id="dataInicioIngestao" value={formData.dataInicioIngestao} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="dataFimIngestao">Data de Fim da Ingestão:</label>
        <input type="date" id="dataFimIngestao" value={formData.dataFimIngestao} onChange={handleInputChange} />
      </div>

      <div className="field-group">
        <label htmlFor="observacoes">Observações:</label>
        <textarea id="observacoes" value={formData.observacoes} onChange={handleInputChange}></textarea>
      </div>

      <button type="submit">Registrar</button>
    </form>
  );
}

export default MedicamentoForm;
