import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://gist.githubusercontent.com/manylovv/b51c8475748549f6e0f39659aa9a3216/raw">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
