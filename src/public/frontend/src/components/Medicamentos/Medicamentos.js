// src/components/Medicamentos/Medicamentos.js

import React, { useState, useEffect } from 'react';
import MedicamentoForm from './MedicamentoForm';
import MedicamentoTable from './MedicamentoTable';
import { fetchMedicamentos, createOrUpdateMedicamento, deleteMedicamentoById } from './utils';
import { API_BASE_URL } from '../../config';

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [editingMedicamento, setEditingMedicamento] = useState(null); // Estado para gerenciar edição

  useEffect(() => {
    loadMedicamentos();
  }, []);

  // Carregar medicamentos do backend
  const loadMedicamentos = async () => {
    const data = await fetchMedicamentos(`${API_BASE_URL}/api/medicamentos`);
    setMedicamentos(data);
  };

  // Adicionar ou editar um medicamento
  const adicionarOuEditarMedicamento = async (medicamento) => {
    const response = await createOrUpdateMedicamento(`${API_BASE_URL}/api/medicamentos`, medicamento);
    if (response.success) {
      loadMedicamentos();
      setEditingMedicamento(null);
      alert('Medicamento salvo com sucesso!');
    } else {
      alert('Erro ao salvar medicamento.');
    }
  };

  // Deletar um medicamento pelo ID
  const deletarMedicamento = async (id) => {
    const success = await deleteMedicamentoById(`${API_BASE_URL}/api/medicamentos/${id}`);
    if (success) {
      loadMedicamentos();
      alert('Medicamento deletado com sucesso!');
    } else {
      alert('Erro ao deletar medicamento.');
    }
  };

  return (
    <div>
      <h2>Registrar Novo Medicamento</h2>
      <MedicamentoForm
        adicionarOuEditarMedicamento={adicionarOuEditarMedicamento}
        medicamento={editingMedicamento}
      />
      <h2>Lista de Medicamentos</h2>
      <MedicamentoTable
        medicamentos={medicamentos}
        editarMedicamento={setEditingMedicamento}
        deletarMedicamento={deletarMedicamento}
      />
    </div>
  );
}

export default Medicamentos;
