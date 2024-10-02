// src/components/Horarios/Horarios.js

import React, { useState, useEffect } from 'react';
import HorarioForm from './HorarioForm';
import HorarioTable from './HorarioTable';
import { fetchHorarios, createOrUpdateHorario, deleteHorarioById } from './utils';
import { API_BASE_URL } from '../../config';

function Horarios() {
  const [horarios, setHorarios] = useState([]);
  const [editingHorario, setEditingHorario] = useState(null); // Estado para gerenciar edição

  useEffect(() => {
    loadHorarios();
  }, []);

  // Carregar horários do backend
  const loadHorarios = async () => {
    const data = await fetchHorarios(`${API_BASE_URL}/api/horarios`);
    setHorarios(data);
  };

  // Adicionar ou editar um horário
  const adicionarOuEditarHorario = async (horario) => {
    const response = await createOrUpdateHorario(`${API_BASE_URL}/api/horarios`, horario);
    if (response.success) {
      loadHorarios();
      setEditingHorario(null);
      alert('Horário salvo com sucesso!');
    } else {
      alert('Erro ao salvar horário.');
    }
  };

  // Deletar um horário pelo ID
  const deletarHorario = async (id) => {
    const success = await deleteHorarioById(`${API_BASE_URL}/api/horarios/${id}`);
    if (success) {
      loadHorarios();
      alert('Horário deletado com sucesso!');
    } else {
      alert('Erro ao deletar horário.');
    }
  };

  return (
    <div>
      <h2>Registrar Novo Horário</h2>
      <HorarioForm
        adicionarOuEditarHorario={adicionarOuEditarHorario}
        horario={editingHorario}
      />
      <h2>Lista de Horários</h2>
      <HorarioTable
        horarios={horarios}
        editarHorario={setEditingHorario}
        deletarHorario={deletarHorario}
      />
    </div>
  );
}

export default Horarios;
