// src/components/Esportes/Esportes.js

import React, { useState, useEffect } from 'react';
import EsporteForm from './EsporteForm';
import EsporteTable from './EsporteTable';
import { fetchEsportes, createOrUpdateEsporte, deleteEsporteById } from './utils';
import { API_BASE_URL } from '../../config';

function Esportes() {
  const [esportes, setEsportes] = useState([]);
  const [editingEsporte, setEditingEsporte] = useState(null); // Estado para gerenciar edição

  useEffect(() => {
    loadEsportes();
  }, []);

  // Carregar esportes do backend
  const loadEsportes = async () => {
    const data = await fetchEsportes(`${API_BASE_URL}/api/esportes`);
    setEsportes(data);
  };

  // Adicionar ou editar um esporte
  const adicionarOuEditarEsporte = async (esporte) => {
    const response = await createOrUpdateEsporte(`${API_BASE_URL}/api/esportes`, esporte);
    if (response.success) {
      loadEsportes();
      setEditingEsporte(null);
      alert('Esporte salvo com sucesso!');
    } else {
      alert('Erro ao salvar esporte.');
    }
  };

  // Deletar um esporte pelo ID
  const deletarEsporte = async (id) => {
    const success = await deleteEsporteById(`${API_BASE_URL}/api/esportes/${id}`);
    if (success) {
      loadEsportes();
      alert('Esporte deletado com sucesso!');
    } else {
      alert('Erro ao deletar esporte.');
    }
  };

  return (
    <div>
      <h2>Registrar Novo Esporte</h2>
      <EsporteForm
        adicionarOuEditarEsporte={adicionarOuEditarEsporte}
        esporte={editingEsporte}
      />
      <h2>Lista de Esportes</h2>
      <EsporteTable
        esportes={esportes}
        editarEsporte={setEditingEsporte}
        deletarEsporte={deletarEsporte}
      />
    </div>
  );
}

export default Esportes;
