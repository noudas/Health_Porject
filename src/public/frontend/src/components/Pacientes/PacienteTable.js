// src/components/Pacientes/PacienteTable.js

import React from 'react';

function PacienteTable({ pacientes, editarPaciente, deletarPaciente }) {
  return (
    <table>
      <thead>
        <tr>
          <th>CPF</th>
          <th>Nome</th>
          <th>Sexo</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente) => (
          <tr key={paciente._id}>
            <td>{paciente.CPF}</td>
            <td>{paciente.Nome}</td>
            <td>{paciente.Sexo}</td>
            <td>{paciente.Email}</td>
            <td>
              <button type="button" onClick={() => editarPaciente(paciente)}>Editar</button>
              <button type="button" onClick={() => deletarPaciente(paciente._id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PacienteTable;
