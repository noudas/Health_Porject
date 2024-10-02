import React, { useState, useEffect } from 'react';
import AlimentoForm from './AlimentoForm';
import AlimentoTable from './AlimentoTable';
import { fetchEnums, fetchAlimentos, createOrUpdateAlimento, deleteAlimentoById } from './utils';

function Alimentos() {
  const [alimentos, setAlimentos] = useState([]);
  const [enums, setEnums] = useState({ vitaminas: [], unidadesMedida: [], minerais: [] });
  const [editingAlimento, setEditingAlimento] = useState(null); // Armazena o alimento em edição

  useEffect(() => {
    loadAlimentos();
    loadEnums();
  }, []);

  // Carrega os valores de enum do backend
  const loadEnums = async () => {
    const data = await fetchEnums();
    setEnums(data);
  };

  // Carrega os alimentos do backend
  const loadAlimentos = async () => {
    const data = await fetchAlimentos();
    setAlimentos(data);
  };

  // Adiciona ou edita um alimento
  const adicionarOuEditarAlimento = async (alimento) => {
    const response = await createOrUpdateAlimento(alimento);
    if (response.success) {
      loadAlimentos();
      setEditingAlimento(null);
      alert('Alimento salvo com sucesso!');
    } else {
      alert('Erro ao salvar alimento.');
    }
  };

  // Deleta um alimento pelo ID
  const deletarAlimento = async (id) => {
    const success = await deleteAlimentoById(id);
    if (success) {
      loadAlimentos();
      alert('Alimento deletado com sucesso!');
    } else {
      alert('Erro ao deletar alimento.');
    }
  };

  return (
    <div>
      <h2>Registrar Novo Alimento</h2>
      <AlimentoForm
        enums={enums}
        adicionarOuEditarAlimento={adicionarOuEditarAlimento}
        alimento={editingAlimento}
      />
      <h2>Lista de Alimentos</h2>
      <AlimentoTable
        alimentos={alimentos}
        editarAlimento={setEditingAlimento}
        deletarAlimento={deletarAlimento}
      />
    </div>
  );
}

export default Alimentos;
