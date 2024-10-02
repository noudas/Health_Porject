import React, { useState, useEffect } from 'react';
import SuplementoForm from './SuplementoForm';
import SuplementoTable from './SuplementoTable';
import { fetchSuplementos, createOrUpdateSuplemento, deleteSuplementoById } from './utils';
import { API_BASE_URL } from '../../config';

function Suplementos() {
  const [suplementos, setSuplementos] = useState([]);
  const [editingSuplemento, setEditingSuplemento] = useState(null);

  useEffect(() => {
    loadSuplementos();
  }, []);

  const loadSuplementos = async () => {
    const data = await fetchSuplementos(`${API_BASE_URL}/api/suplementos`);
    setSuplementos(data);
  };

  const adicionarOuEditarSuplemento = async (suplemento) => {
    const response = await createOrUpdateSuplemento(`${API_BASE_URL}/api/suplementos`, suplemento);
    if (response.success) {
      loadSuplementos();
      setEditingSuplemento(null);
      alert('Suplemento salvo com sucesso!');
    } else {
      alert('Erro ao salvar suplemento.');
    }
  };

  const deletarSuplemento = async (id) => {
    const success = await deleteSuplementoById(`${API_BASE_URL}/api/suplementos/${id}`);
    if (success) {
      loadSuplementos();
      alert('Suplemento deletado com sucesso!');
    } else {
      alert('Erro ao deletar suplemento.');
    }
  };

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
      />
    </div>
  );
}

export default Suplementos;
