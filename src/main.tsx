import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://gist.githubusercontent.com/manylovv/36176d8d4cc9fb074302bfe17884522e/raw">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
