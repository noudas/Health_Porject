// src/components/Alergias/AlergiaRow.js
import React, { useState } from 'react';

function AlergiaRow({ alergia, atualizarAlergia, deletarAlergia }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...alergia });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    atualizarAlergia(alergia._id, formData);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
        ) : (
          alergia.nome
        )}
      </td>
      <td>
        {isEditing ? (
          <select
            id="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
          >
            <option value="Alimentar">Alimentar</option>
            <option value="Medicamento">Medicamento</option>
            <option value="Ambiental">Ambiental</option>
            <option value="Insectos">Insectos</option>
            <option value="Animais">Animais</option>
            <option value="Latex">Latex</option>
            <option value="Fragrâncias">Fragrâncias</option>
            <option value="Metais">Metais</option>
            <option value="Cosméticos">Cosméticos</option>
            <option value="Conservantes">Conservantes</option>
            <option value="Temperatura">Temperatura</option>
            <option value="Outros">Outros</option>
          </select>
        ) : (
          alergia.tipo
        )}
      </td>
      <td>
        {isEditing ? (
          <select
            id="severidade"
            value={formData.severidade}
            onChange={handleInputChange}
          >
            <option value="Leve">Leve</option>
            <option value="Moderada">Moderada</option>
            <option value="Grave">Grave</option>
            <option value="Anafilática">Anafilática</option>
          </select>
        ) : (
          alergia.severidade
        )}
      </td>
      <td>
        {isEditing ? (
          <textarea
            id="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
          />
        ) : (
          alergia.descricao
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleUpdate}>Salvar</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => deletarAlergia(alergia._id)}>Deletar</button>
          </>
        )}
      </td>
    </tr>
  );
}

export default AlergiaRow;
