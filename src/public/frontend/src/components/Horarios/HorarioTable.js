// src/components/Horarios/HorarioTable.js

import React from 'react';

function HorarioTable({ horarios, editarHorario, deletarHorario }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Tipo</th>
          <th>Observações</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {horarios.map((horario) => (
          <tr key={horario._id}>
            <td>{horario.hora ? new Date(horario.hora).toLocaleString() : 'Hora não disponível'}</td>
            <td>{horario.tipo}</td>
            <td>{horario.observacoes || '-'}</td>
            <td>
              <button type="button" onClick={() => editarHorario(horario)}>Editar</button>
              <button type="button" onClick={() => deletarHorario(horario._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HorarioTable;
