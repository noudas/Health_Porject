// src/components/Doencas/Doencas.js

import React, { useState, useEffect } from 'react';
import DoencaForm from './DoencaForm';
import DoencaTable from './DoencaTable';
import { fetchDoencas, fetchSintomas, createOrUpdateDoenca, deleteDoencaById } from './utils';
import { API_BASE_URL } from '../../config';

function Doencas() {
  const [doencas, setDoencas] = useState([]);
  const [sintomas, setSintomas] = useState([]);
  const [editingDoenca, setEditingDoenca] = useState(null); // Estado para gerenciar edição de doenças

  useEffect(() => {
    loadDoencas();
    loadSintomas();
  }, []);

  // Carregar doenças do backend
  const loadDoencas = async () => {
    const data = await fetchDoencas(`${API_BASE_URL}/api/doencas`);
    setDoencas(data);
  };

  // Carregar sintomas do backend
  const loadSintomas = async () => {
    const data = await fetchSintomas(`${API_BASE_URL}/api/sintomas`);
    setSintomas(data);
  };

  // Adicionar ou editar uma doença
  const adicionarOuEditarDoenca = async (doenca) => {
    const response = await createOrUpdateDoenca(`${API_BASE_URL}/api/doencas`, doenca);
    if (response.success) {
      loadDoencas();
      setEditingDoenca(null);
      alert('Doença salva com sucesso!');
    } else {
      alert('Erro ao salvar doença.');
    }
  };

  // Deletar uma doença pelo ID
  const deletarDoenca = async (id) => {
    const success = await deleteDoencaById(`${API_BASE_URL}/api/doencas/${id}`);
    if (success) {
      loadDoencas();
      alert('Doença deletada com sucesso!');
    } else {
      alert('Erro ao deletar doença.');
    }
  };

  return (
    <div>
      <h2>Registrar Nova Doença</h2>
      <DoencaForm
        adicionarOuEditarDoenca={adicionarOuEditarDoenca}
        sintomas={sintomas}
        doenca={editingDoenca}
      />
      <h2>Lista de Doenças</h2>
      <DoencaTable
        doencas={doencas}
        editarDoenca={setEditingDoenca}
        deletarDoenca={deletarDoenca}
      />
    </div>
  );
}

export default Doencas;