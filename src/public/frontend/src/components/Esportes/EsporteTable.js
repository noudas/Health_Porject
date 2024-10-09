//EsporteTable.js

import React, { useState } from 'react';

function EsporteTable({ esportes, editarEsporte, deletarEsporte, salvarEdicao }) {
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({});

  // Ativa o modo de edição para a linha
  const handleEditClick = (esporte) => {
    setEditandoId(esporte._id);
    setEditData({ ...esporte }); // Copia os dados do esporte para o estado editData
  };

  // Gerencia as mudanças nos campos de edição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Salva as alterações e desativa o modo de edição
  const handleSaveClick = () => {
    salvarEdicao(editData); // Passa os dados editados para serem salvos
    setEditandoId(null); // Sai do modo de edição
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Intensidade</th>
          <th>Duração Média</th>
          <th>Calorias/Hora</th>
          <th>Localização</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {esportes.map((esporte) => (
          <tr key={esporte._id}>
            {editandoId === esporte._id ? (
              <>
                {/* Campos editáveis */}
                <td><input type="text" name="nome" value={editData.nome} onChange={handleInputChange} /></td>
                <td><input type="text" name="categoria" value={editData.categoria} onChange={handleInputChange} /></td>
                <td><input type="text" name="intensidade" value={editData.intensidade} onChange={handleInputChange} /></td>
                <td><input type="number" name="duracaoMedia" value={editData.duracaoMedia} onChange={handleInputChange} /></td>
                <td><input type="number" name="caloriasQueimadasPorHora" value={editData.caloriasQueimadasPorHora} onChange={handleInputChange} /></td>
                <td><input type="text" name="localizacao" value={editData.localizacao} onChange={handleInputChange} /></td>
                <td>
                  <button type="button" onClick={handleSaveClick}>Salvar</button>
                  <button type="button" onClick={() => setEditandoId(null)}>Cancelar</button>
                </td>
              </>
            ) : (
              <>
                {/* Campos somente leitura */}
                <td>{esporte.nome}</td>
                <td>{esporte.categoria}</td>
                <td>{esporte.intensidade}</td>
                <td>{esporte.duracaoMedia} min</td>
                <td>{esporte.caloriasQueimadasPorHora} kcal/h</td>
                <td>{esporte.localizacao}</td>
                <td>
                  <button type="button" onClick={() => handleEditClick(esporte)}>Editar</button>
                  <button type="button" onClick={() => deletarEsporte(esporte._id)}>Deletar</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EsporteTable;
