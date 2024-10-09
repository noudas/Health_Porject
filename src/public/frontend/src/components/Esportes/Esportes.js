// Esportes.js

import React, { useState, useEffect } from 'react';
import EsporteForm from './EsporteForm';
import EsporteTable from './EsporteTable';
import { fetchEsportes, createOrUpdateEsporte, deleteEsporteById } from './utils';
import { API_BASE_URL } from '../../config';

function Esportes() {
  const [esportes, setEsportes] = useState([]);
  const [editingEsporte, setEditingEsporte] = useState(null); // Estado para gerenciar edição

  useEffect(() => {
    loadEsportes(); // Carrega os esportes ao montar o componente
  }, []);

  // Função para carregar esportes do backend
  const loadEsportes = async () => {
    const data = await fetchEsportes(`${API_BASE_URL}/api/esportes`);
    setEsportes(data); // Atualiza o estado com os esportes carregados
  };

  // Adicionar ou editar um esporte
  const adicionarOuEditarEsporte = async (esporte) => {
    const response = await createOrUpdateEsporte(`${API_BASE_URL}/api/esportes`, esporte);
    if (response.success) {
      loadEsportes(); // Recarrega a lista de esportes
      setEditingEsporte(null); // Reseta o esporte em edição
      alert('Esporte salvo com sucesso!');
    } else {
      alert(`Erro ao salvar esporte: ${response.message}`); // Inclui a mensagem de erro
    }
  };

  // Salvar edição de esporte diretamente na tabela
  const salvarEdicao = async (esporteEditado) => {
    const response = await createOrUpdateEsporte(`${API_BASE_URL}/api/esportes`, esporteEditado);
    if (response.success) {
      loadEsportes(); // Recarrega a lista após a atualização
      alert('Esporte atualizado com sucesso!');
    } else {
      alert(`Erro ao atualizar esporte: ${response.message}`);
    }
  };

  // Deletar um esporte pelo ID
  const deletarEsporte = async (id) => {
    const success = await deleteEsporteById(`${API_BASE_URL}/api/esportes/${id}`);
    if (success) {
      loadEsportes(); // Recarrega a lista após a exclusão
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
        esporte={editingEsporte} // Passa o esporte em edição para o formulário
      />
      <h2>Lista de Esportes</h2>
      <EsporteTable
        esportes={esportes}
        editarEsporte={setEditingEsporte} // Define o esporte a ser editado
        deletarEsporte={deletarEsporte}
        salvarEdicao={salvarEdicao} // Passa a função salvarEdicao para o EsporteTable
      />
    </div>
  );
}

export default Esportes;