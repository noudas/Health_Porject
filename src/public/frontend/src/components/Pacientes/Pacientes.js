// src/components/Pacientes/Pacientes.js

import React, { useState, useEffect } from 'react';
import PacienteForm from './PacienteForm';
import PacienteTable from './PacienteTable';
import { fetchPacientes, fetchSintomas, fetchDoencas, createOrUpdatePaciente, deletePacienteById } from './utils';
import { API_BASE_URL } from '../../config';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [sintomas, setSintomas] = useState([]);
  const [doencas, setDoencas] = useState([]);
  const [editingPaciente, setEditingPaciente] = useState(null); // Estado para gerenciar edição

  useEffect(() => {
    loadPacientes();
    loadSintomas();
    loadDoencas();
  }, []);

  // Carregar pacientes do backend
  const loadPacientes = async () => {
    const data = await fetchPacientes(`${API_BASE_URL}/api/pacientes`);
    setPacientes(data);
  };

  // Carregar sintomas do backend
  const loadSintomas = async () => {
    const data = await fetchSintomas(`${API_BASE_URL}/api/sintomas`);
    setSintomas(data);
  };

  // Carregar doenças do backend
  const loadDoencas = async () => {
    const data = await fetchDoencas(`${API_BASE_URL}/api/doencas`);
    setDoencas(data);
  };

  // Adicionar ou editar um paciente
  const adicionarOuEditarPaciente = async (paciente) => {
    const response = await createOrUpdatePaciente(`${API_BASE_URL}/api/pacientes`, paciente);
    if (response.success) {
      loadPacientes();
      setEditingPaciente(null);
      alert('Paciente salvo com sucesso!');
    } else {
      alert('Erro ao salvar paciente.');
    }
  };

  // Deletar um paciente pelo ID
  const deletarPaciente = async (id) => {
    const success = await deletePacienteById(`${API_BASE_URL}/api/pacientes/${id}`);
    if (success) {
      loadPacientes();
      alert('Paciente deletado com sucesso!');
    } else {
      alert('Erro ao deletar paciente.');
    }
  };

  return (
    <div>
      <h2>Registrar Novo Paciente</h2>
      <PacienteForm
        adicionarOuEditarPaciente={adicionarOuEditarPaciente}
        sintomas={sintomas}
        doencas={doencas}
        paciente={editingPaciente}
      />
      <h2>Lista de Pacientes</h2>
      <PacienteTable
        pacientes={pacientes}
        editarPaciente={setEditingPaciente}
        deletarPaciente={deletarPaciente}
      />
    </div>
  );
}

export default Pacientes;
