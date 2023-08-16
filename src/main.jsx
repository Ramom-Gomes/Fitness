import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import rotas from './routes/rotas.jsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rotas}/>
  </React.StrictMode>,
)
