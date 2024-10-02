// src/components/Dietas/DietaTable.js

import React from 'react';

function DietaTable({ dietas, editarDieta, deletarDieta }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome da Dieta</th>
          <th>Descrição</th>
          <th>Horários</th>
          <th>Rotina</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dietas.map((dieta) => (
          <tr key={dieta._id}>
            <td>{dieta.nome}</td>
            <td>{dieta.descricao}</td>
            <td>
              {dieta.horarios
                .map(
                  (horario) =>
                    `${horario.tipo}: ${horario.alimento.map((alimento) => alimento.nome).join(', ')}`
                )
                .join(', ')}
            </td>
            <td>{dieta.rotina}</td>
            <td>
              <button type="button" onClick={() => editarDieta(dieta)}>Editar</button>
              <button type="button" onClick={() => deletarDieta(dieta._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DietaTable;
