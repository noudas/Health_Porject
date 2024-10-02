// src/components/Dietas/Dietas.js

import React, { useState, useEffect } from 'react';
import DietaForm from './DietaForm';
import DietaTable from './DietaTable';
import { fetchDietas, fetchAlimentos, fetchHorarios, createOrUpdateDieta, deleteDietaById } from './utils';
import { API_BASE_URL } from '../../config';

function Dietas() {
  const [dietas, setDietas] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [editingDieta, setEditingDieta] = useState(null); // Estado para gerenciar edição de dietas

  useEffect(() => {
    loadDietas();
    loadAlimentos();
    loadHorarios();
  }, []);

  // Carregar dietas
  const loadDietas = async () => {
    const data = await fetchDietas(`${API_BASE_URL}/api/dietas`);
    setDietas(data);
  };

  // Carregar alimentos
  const loadAlimentos = async () => {
    const data = await fetchAlimentos(`${API_BASE_URL}/api/alimentos`);
    setAlimentos(data);
  };

  // Carregar horários
  const loadHorarios = async () => {
    const data = await fetchHorarios(`${API_BASE_URL}/api/horarios`);
    setHorarios(data);
  };

  // Adicionar ou editar dieta
  const adicionarOuEditarDieta = async (dieta) => {
    const response = await createOrUpdateDieta(`${API_BASE_URL}/api/dietas`, dieta);
    if (response.success) {
      loadDietas();
      setEditingDieta(null);
      alert('Dieta salva com sucesso!');
    } else {
      alert('Erro ao salvar dieta.');
    }
  };

  // Deletar dieta
  const deletarDieta = async (id) => {
    const success = await deleteDietaById(`${API_BASE_URL}/api/dietas/${id}`);
    if (success) {
      loadDietas();
      alert('Dieta deletada com sucesso!');
    } else {
      alert('Erro ao deletar dieta.');
    }
  };

  return (
    <div>
      <h2>Registrar Nova Dieta</h2>
      <DietaForm
        alimentos={alimentos}
        horarios={horarios}
        adicionarOuEditarDieta={adicionarOuEditarDieta}
        dieta={editingDieta}
      />
      <h2>Lista de Dietas</h2>
      <DietaTable
        dietas={dietas}
        editarDieta={setEditingDieta}
        deletarDieta={deletarDieta}
      />
    </div>
  );
}

export default Dietas;
