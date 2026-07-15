import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { config } from './config.js';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App {...config} />
  </React.StrictMode>
);
