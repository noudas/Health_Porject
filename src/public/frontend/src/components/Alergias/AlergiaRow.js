// src/components/Alergias/AlergiaRow.js
import React from 'react';

function AlergiaRow({ alergia, editarAlergia, deletarAlergia }) {
  return (
    <tr>
      <td>{alergia.nome}</td>
      <td>{alergia.tipo}</td>
      <td>{alergia.severidade}</td>
      <td>
        <button onClick={() => editarAlergia(alergia._id)}>Editar</button>
        <button onClick={() => deletarAlergia(alergia._id)}>Deletar</button>
      </td>
    </tr>
  );
}

export default AlergiaRow;
