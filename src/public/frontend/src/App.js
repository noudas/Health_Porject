import React, { useState, useEffect, Suspense } from 'react';
import io from 'socket.io-client';
import './styles.css';
import ErrorBoundary from './ErrorBoundary';

// Lazy loading para os componentes
const Suplementos = React.lazy(() => import('./components/Suplementos/Suplemento'));
const Alergias = React.lazy(() => import('./components/Alergias/Alergias'));
const Esportes = React.lazy(() => import('./components/Esportes/Esportes'));
const Medicamentos = React.lazy(() => import('./components/Medicamentos/Medicamentos'));
const Dietas = React.lazy(() => import('./components/Dietas/Dietas'));
const Alimentos = React.lazy(() => import('./components/Alimentos/Alimentos'));
const Horarios = React.lazy(() => import('./components/Horarios/Horarios'));
const Sintomas = React.lazy(() => import('./components/Sintomas/Sintomas'));
const Doencas = React.lazy(() => import('./components/Doencas/Doencas'));
const Pacientes = React.lazy(() => import('./components/Pacientes/Pacientes'));

const socket = io('http://localhost:5000'); // Conecte ao servidor WebSocket do back-end

function App() {
  const [selectedType, setSelectedType] = useState('suplementos');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Conectar ao WebSocket e ouvir eventos do tipo selecionado
    socket.emit('join', selectedType); // Envia ao back-end o tipo selecionado

    // Escuta atualizações para o tipo selecionado
    socket.on(selectedType, (newData) => {
      setData(newData); // Atualiza o estado com os novos dados recebidos
    });

    // Cleanup: remove listeners ao desmontar componente ou mudar o tipo selecionado
    return () => {
      socket.off(selectedType);
    };
  }, [selectedType]);

  const handleUpdateData = () => {
    // Enviar novos dados para o servidor para atualizar em todos os clientes conectados
    const newData = [...data, { nome: 'Novo Registro' }];
    socket.emit('updateData', { type: selectedType, newData });
  };

  const renderComponent = () => {
    switch (selectedType) {
      case 'suplementos':
        return <Suplementos data={data} />;
      case 'alergias':
        return <Alergias data={data} />;
      case 'esportes':
        return <Esportes data={data} />;
      case 'medicamentos':
        return <Medicamentos data={data} />;
      case 'dietas':
        return <Dietas data={data} />;
      case 'alimentos':
        return <Alimentos data={data} />;
      case 'horarios':
        return <Horarios data={data} />;
      case 'sintomas':
        return <Sintomas data={data} />;
      case 'doencas':
        return <Doencas data={data} />;
      case 'pacientes':
        return <Pacientes data={data} />;
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
        <option value="doencas">Doenças</option>
        <option value="pacientes">Pacientes</option>
      </select>
      <button onClick={handleUpdateData}>Adicionar Novo Registro</button>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {renderComponent()}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// Ativar Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept();
}

export default App;
