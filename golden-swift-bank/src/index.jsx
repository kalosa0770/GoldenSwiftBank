// Use the client import for React 18
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App.jsx'; // CRITICAL: Check the extension matches!
import './index.css'; // or your main CSS file

const container = document.getElementById('root');
const root = createRoot(container); // create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);