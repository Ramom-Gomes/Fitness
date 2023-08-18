import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe createRoot de "react-dom/client"
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>
);
