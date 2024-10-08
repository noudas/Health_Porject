// Suplemento.js
import React, { useState, useEffect } from 'react';
import SuplementoForm from './SuplementoForm';
import SuplementoTable from './SuplementoTable';
import { fetchSuplementos, createOrUpdateSuplemento, deleteSuplementoById } from './utils';
import { API_BASE_URL } from '../../config';

function Suplementos() {
  const [suplementos, setSuplementos] = useState([]);
  const [editingSuplemento, setEditingSuplemento] = useState(null);

  // Carrega os suplementos quando o componente é montado
  useEffect(() => {
    loadSuplementos();
  }, []);

  // Função para carregar suplementos da API e atualizar o estado
  const loadSuplementos = async () => {
    const data = await fetchSuplementos(`${API_BASE_URL}/api/suplementos`);
    setSuplementos(data);
  };

  // Função para adicionar ou editar um suplemento
  const adicionarOuEditarSuplemento = async (suplemento) => {
    const response = await createOrUpdateSuplemento(`${API_BASE_URL}/api/suplementos${suplemento._id ? `/${suplemento._id}` : ''}`, suplemento);

    // Verifica o sucesso com base no retorno do servidor
    if (response.success || response._id) {
      loadSuplementos();  // Atualiza a lista de suplementos após a operação
      setEditingSuplemento(null); // Limpa o suplemento em edição
      alert('Suplemento salvo com sucesso!'); // Exibe mensagem de sucesso
    } else {
      console.error(response.error); // Loga o erro para debug
      alert('Erro ao salvar suplemento.'); // Mostra mensagem de erro ao usuário
    }
  };

  // Função para deletar um suplemento
  const deletarSuplemento = async (id) => {
    const success = await deleteSuplementoById(`${API_BASE_URL}/api/suplementos/${id}`);
    if (success) {
      loadSuplementos(); // Atualiza a lista após exclusão
      alert('Suplemento deletado com sucesso!');
    } else {
      alert('Erro ao deletar suplemento.');
    }
  };

  // Função para iniciar a edição de um suplemento
  const editarSuplemento = (suplemento) => {
    setEditingSuplemento(suplemento);
  };

  return (
    <div>
      <h2>Registrar Novo Suplemento</h2>
      <SuplementoForm adicionarOuEditarSuplemento={adicionarOuEditarSuplemento} />
      <h2>Lista de Suplementos</h2>
      <SuplementoTable
        suplementos={suplementos}
        editarSuplemento={editarSuplemento}
        deletarSuplemento={deletarSuplemento}
        adicionarOuEditarSuplemento={adicionarOuEditarSuplemento}
        editingSuplemento={editingSuplemento}
        setEditingSuplemento={setEditingSuplemento}
      />
    </div>
  );
}

export default Suplementos;
