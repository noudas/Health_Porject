// src/components/Medicamentos/MedicamentoTable.js

import React from 'react';

function MedicamentoTable({ medicamentos, editarMedicamento, deletarMedicamento }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Nome do Medicamento</th>
          <th>Tipo de Posologia</th>
          <th>Duração do Efeito</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {medicamentos.map((medicamento) => (
          <tr key={medicamento._id}>
            <td>{medicamento.paciente.Nome}</td>
            <td>{medicamento.detalhes.nome}</td>
            <td>{medicamento.posologia.tipo}</td>
            <td>{medicamento.duracaoEfeito}</td>
            <td>
              <button type="button" onClick={() => editarMedicamento(medicamento)}>Editar</button>
              <button type="button" onClick={() => deletarMedicamento(medicamento._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MedicamentoTable;
