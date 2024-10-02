import React from 'react';

function SuplementoTable({ suplementos, editarSuplemento, deletarSuplemento }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Dosagem</th>
          <th>Tipo</th>
          <th>Forma</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {suplementos.map(suplemento => (
          <tr key={suplemento._id}>
            <td>{suplemento.nome}</td>
            <td>{suplemento.dosagem}</td>
            <td>{suplemento.tipo}</td>
            <td>{suplemento.forma}</td>
            <td>
              <button type="button" onClick={() => editarSuplemento(suplemento)}>Editar</button>
              <button type="button" onClick={() => deletarSuplemento(suplemento._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SuplementoTable;
