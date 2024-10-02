import React from 'react';
import AlimentoRow from './AlimentoRow';

function AlimentoTable({ alimentos, editarAlimento, deletarAlimento }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Calorias</th>
          <th>Vitaminas</th>
          <th>Minerais</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {alimentos.map((alimento) => (
          <AlimentoRow
            key={alimento._id}
            alimento={alimento}
            editarAlimento={editarAlimento}
            deletarAlimento={deletarAlimento}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AlimentoTable;
