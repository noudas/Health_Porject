// src/components/Sintomas/SintomaTable.js

import React from 'react';

function SintomaTable({ sintomas, editarSintoma, deletarSintoma }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Gravidade</th>
          <th>Categoria</th>
          <th>Duração</th>
          <th>Data de Início</th>
          <th>Data de Fim</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sintomas.map((sintoma) => (
          <tr key={sintoma._id}>
            <td>{sintoma.nome}</td>
            <td>{sintoma.descricao}</td>
            <td>{sintoma.gravidade}</td>
            <td>{sintoma.categoria}</td>
            <td>{sintoma.duracao}</td>
            <td>{sintoma.dataInicio ? new Date(sintoma.dataInicio).toLocaleDateString() : '-'}</td>
            <td>{sintoma.dataFim ? new Date(sintoma.dataFim).toLocaleDateString() : '-'}</td>
            <td>
              <button type="button" onClick={() => editarSintoma(sintoma)}>Editar</button>
              <button type="button" onClick={() => deletarSintoma(sintoma._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SintomaTable;
