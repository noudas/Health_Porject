// SuplementoTable.js
import React, { useState } from 'react';

function SuplementoTable({ suplementos, editarSuplemento, deletarSuplemento, adicionarOuEditarSuplemento, editingSuplemento, setEditingSuplemento }) {
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (suplemento) => {
    setEditRowId(suplemento._id);
    setEditedData(suplemento);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveClick = async () => {
    await adicionarOuEditarSuplemento(editedData);
    setEditRowId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Dosagem</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Forma</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {suplementos.map(suplemento => (
          <tr key={suplemento._id}>
            {editRowId === suplemento._id ? (
              <>
                <td><input name="nome" value={editedData.nome} onChange={handleInputChange} /></td>
                <td><input name="dosagem" value={editedData.dosagem} onChange={handleInputChange} /></td>
                <td><input name="descricao" value={editedData.descricao} onChange={handleInputChange} /></td>
                <td><input name="tipo" value={editedData.tipo} onChange={handleInputChange} /></td>
                <td><input name="forma" value={editedData.forma} onChange={handleInputChange} /></td>
                <td>
                  <button onClick={handleSaveClick}>Salvar</button>
                  <button onClick={() => setEditRowId(null)}>Cancelar</button>
                </td>
              </>
            ) : (
              <>
                <td>{suplemento.nome}</td>
                <td>{suplemento.dosagem}</td>
                <td>{suplemento.descricao}</td>
                <td>{suplemento.tipo}</td>
                <td>{suplemento.forma}</td>
                <td>
                  <button type="button" onClick={() => handleEditClick(suplemento)}>Editar</button>
                  <button type="button" onClick={() => deletarSuplemento(suplemento._id)}>Deletar</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SuplementoTable;
