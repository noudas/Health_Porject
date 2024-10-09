import React from 'react';
import ReactDOM from 'react-dom/client'; // Atualizado para React 18
import './styles.css';
import App from './App';

// Obtém o elemento raiz do DOM onde o React será renderizado
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Usa o novo método `createRoot` do ReactDOM
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
