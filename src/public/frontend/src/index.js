import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// HMR Configuration
if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('HMR: Atualizando o componente App.js');
    const NextApp = require('./App').default;
    root.render(
      <React.StrictMode>
        <NextApp />
      </React.StrictMode>
    );
  });

  // Adicione um log para verificar a conexão com o WebSocket
  module.hot.addStatusHandler((status) => {
    if (status === 'ready') {
      console.log('HMR pronto para receber atualizações.');
    } else {
      console.log(`HMR status: ${status}`);
    }
  });
}