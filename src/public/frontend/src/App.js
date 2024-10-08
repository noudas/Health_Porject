import React, { useState } from 'react';
import './styles.css';
import Suplementos from './components/Suplementos/Suplemento';
import Alergias from './components/Alergias/Alergias';
import Esportes from './components/Esportes/Esportes';
import Medicamentos from './components/Medicamentos/Medicamentos';
import Dietas from './components/Dietas/Dietas';
import Alimentos from './components/Alimentos/Alimentos';
import Horarios from './components/Horarios/Horarios';
import Sintomas from './components/Sintomas/Sintomas';
import Doencas from './components/Doencas/Doencas';
import Pacientes from './components/Pacientes/Pacientes';

function App() {
  const [selectedType, setSelectedType] = useState('suplementos');

  const renderComponent = () => {
    switch (selectedType) {
      case 'suplementos':
        return <Suplementos />;    
      case 'alergias':      
        return <Alergias />;
      case 'esportes':
        return <Esportes />;
      case 'medicamentos':
        return <Medicamentos />;
      case 'dietas':
        return <Dietas />;
      case 'alimentos':
        return <Alimentos />;
      case 'horarios':
        return <Horarios />;
      case 'sintomas':
        return <Sintomas />;
      case 'doencas':
        return <Doencas />;
      case 'pacientes':
        return <Pacientes />;
      default:
        return <p>Por favor, selecione um tipo de registro.</p>;
    }
  };

  return (
    <div className="App">
      <h1>Gestão de Registros</h1>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="suplementos">Suplementos</option>
        <option value="alergias">Alergias</option>
        <option value="esportes">Esportes</option>
        <option value="medicamentos">Medicamentos</option>
        <option value="alimentos">Alimentos</option>
        <option value="horarios">Horários</option>
        <option value="dietas">Dietas</option>
        <option value="sintomas">Sintomas</option>
        <option value="doencas">Doencas</option>
        <option value="pacientes">Pacientes</option>
      </select>
      <div id="registroContent">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
