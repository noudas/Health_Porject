// src/components/Doencas/DoencaTable.js

import React from 'react';

function DoencaTable({ doencas, editarDoenca, deletarDoenca }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>CID-10</th>
          <th>Sintomas</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {doencas.map((doenca) => (
          <tr key={doenca._id}>
            <td>{doenca.nome}</td>
            <td>{doenca.descricao}</td>
            <td>{doenca.tipo}</td>
            <td>{doenca.cid10}</td>
            <td>{doenca.sintomas.map((sintoma) => sintoma.nome).join(', ')}</td>
            <td>
              <button type="button" onClick={() => editarDoenca(doenca)}>Editar</button>
              <button type="button" onClick={() => deletarDoenca(doenca._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DoencaTable;