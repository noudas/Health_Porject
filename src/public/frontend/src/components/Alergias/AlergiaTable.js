// src/components/Alergias/AlergiaTable.js
import React from 'react';
import AlergiaRow from './AlergiaRow';

function AlergiaTable({ alergias, atualizarAlergia, deletarAlergia }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Severidade</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {alergias.map((alergia) => (
          <AlergiaRow
            key={alergia._id}
            alergia={alergia}
            atualizarAlergia={atualizarAlergia}
            deletarAlergia={deletarAlergia}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AlergiaTable;
