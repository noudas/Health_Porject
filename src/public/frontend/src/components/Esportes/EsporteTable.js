// src/components/Esportes/EsporteTable.js

import React from 'react';

function EsporteTable({ esportes, editarEsporte, deletarEsporte }) {
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
            <td>{esporte.nome}</td>
            <td>{esporte.categoria}</td>
            <td>{esporte.intensidade}</td>
            <td>{esporte.duracaoMedia} min</td>
            <td>{esporte.caloriasQueimadasPorHora} kcal/h</td>
            <td>{esporte.localizacao}</td>
            <td>
              <button type="button" onClick={() => editarEsporte(esporte)}>Editar</button>
              <button type="button" onClick={() => deletarEsporte(esporte._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EsporteTable;
