// src/components/Alergias/Alergias.js
import React, { useState, useEffect } from 'react';
import AlergiaForm from './AlergiaForm';
import AlergiaTable from './AlergiaTable';
import { API_BASE_URL } from '../../config';

function Alergias() {
  const [alergias, setAlergias] = useState([]);

  // Carregar alergias ao montar o componente
  useEffect(() => {
    loadAlergias();
  }, []);

  // Função para carregar alergias da API
  const loadAlergias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alergias`);

      if (!response.ok) {
        throw new Error(`Erro ao carregar: ${response.status}`);
      }

      const data = await response.json(); // Converte para JSON
      setAlergias(data);
    } catch (error) {
      console.error('Erro ao carregar alergias:', error);
      alert('Erro ao carregar alergias. Verifique o console para mais detalhes.');
    }
  };

  // Função para adicionar uma nova alergia
  const adicionarAlergia = async (alergia) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alergias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alergia),
      });

      if (response.ok) {
        alert('Alergia registrada com sucesso!');
        loadAlergias();
      } else {
        alert('Erro ao registrar alergia.');
      }
    } catch (error) {
      console.error('Erro ao registrar alergia:', error);
    }
  };

  // Função para atualizar alergia editada
  const atualizarAlergia = async (id, novosDados) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alergias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novosDados),
      });

      if (response.ok) {
        alert('Alergia atualizada com sucesso!');
        loadAlergias();
      } else {
        alert('Erro ao editar alergia.');
      }
    } catch (error) {
      console.error('Erro ao editar alergia:', error);
    }
  };

  // Função para deletar uma alergia
  const deletarAlergia = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alergias/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Alergia deletada com sucesso!');
        loadAlergias();
      } else {
        alert('Erro ao deletar alergia.');
      }
    } catch (error) {
      console.error('Erro ao deletar alergia:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Nova Alergia</h2>
      <AlergiaForm 
        adicionarAlergia={adicionarAlergia} 
      />
      <h2>Lista de Alergias</h2>
      <AlergiaTable
        alergias={alergias}
        atualizarAlergia={atualizarAlergia}
        deletarAlergia={deletarAlergia}
      />
    </div>
  );
}

export default Alergias;
