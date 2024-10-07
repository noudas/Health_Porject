// src/components/Sintomas/Sintomas.js

import React, { useState, useEffect } from 'react';
import SintomaForm from './SintomaForm';
import SintomaTable from './SintomaTable';
import { fetchSintomas, createOrUpdateSintoma, deleteSintomaById } from './utils';
import { API_BASE_URL } from '../../config';

function Sintomas() {
  const [sintomas, setSintomas] = useState([]);
  const [editingSintoma, setEditingSintoma] = useState(null); // Estado para gerenciar edição de sintomas

  useEffect(() => {
    loadSintomas();
  }, []);

  // Carregar sintomas do backend
  const loadSintomas = async () => {
    const data = await fetchSintomas(`${API_BASE_URL}/api/sintomas`);
    setSintomas(data);
  };

  // Adicionar ou editar um sintoma
  const adicionarOuEditarSintoma = async (sintoma) => {
    const response = await createOrUpdateSintoma(`${API_BASE_URL}/api/sintomas`, sintoma);
    if (response.success) {
      loadSintomas();
      setEditingSintoma(null);
      alert('Sintoma salvo com sucesso!');
    } else {
      alert('Erro ao salvar sintoma.');
    }
  };

  // Deletar um sintoma pelo ID
  const deletarSintoma = async (id) => {
    const success = await deleteSintomaById(`${API_BASE_URL}/api/sintomas/${id}`);
    if (success) {
      loadSintomas();
      alert('Sintoma deletado com sucesso!');
    } else {
      alert('Erro ao deletar sintoma.');
    }
  };

  return (
    <div>
      <h2>Registrar Novo Sintoma</h2>
      <SintomaForm
        adicionarOuEditarSintoma={adicionarOuEditarSintoma}
        sintoma={editingSintoma}
      />
      <h2>Lista de Sintomas</h2>
      <SintomaTable
        sintomas={sintomas}
        editarSintoma={setEditingSintoma}
        deletarSintoma={deletarSintoma}
      />
    </div>
  );
}

export default Sintomas;
