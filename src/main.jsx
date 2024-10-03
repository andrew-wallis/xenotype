import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { fetchAppData } from './utils/fetchAppData.js';

async function renderApp() {

  const csvFiles = [
    'fonts',
    'sites'
  ];
  const appData = await fetchAppData(csvFiles);

  ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      <App data={appData} />
    </React.StrictMode>,
  )
}

renderApp();