import React from 'react';

function AlimentoRow({ alimento, editarAlimento, deletarAlimento }) {
  return (
    <tr>
      <td>{alimento.nome}</td>
      <td>{alimento.tipo}</td>
      <td>{alimento.calorias || '-'}</td>
      <td>
        {alimento.vitaminas
          ? alimento.vitaminas.map((vitamina) => `${vitamina.tipo}: ${vitamina.quantidade} ${vitamina.unidadeMedida}`).join(', ')
          : '-'}
      </td>
      <td>
        {alimento.minerais
          ? alimento.minerais.map((mineral) => `${mineral.tipo}: ${mineral.quantidade} ${mineral.unidadeMedida}`).join(', ')
          : '-'}
      </td>
      <td>
        <button type="button" onClick={() => editarAlimento(alimento)}>Editar</button>
        <button type="button" onClick={() => deletarAlimento(alimento._id)}>Deletar</button>
      </td>
    </tr>
  );
}

export default AlimentoRow;
