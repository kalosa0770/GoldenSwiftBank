// Use the client import for React 18
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'; 
import './index.css'; 

const container = document.getElementById('root');
const root = createRoot(container); // create a root

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);