import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { fetchGameData } from './utils/fetchGameData.js';

async function renderApp() {

  const csvFiles = [
    'fonts',
    'sites'
  ];
  const appData = await fetchGameData(csvFiles);

  ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      <App data={appData} />
    </React.StrictMode>,
  )
}

renderApp();