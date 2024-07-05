import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { fetchGameData } from './utils/fetchGameData.js';

async function renderApp() {

  const csvFiles = [
    'fonts'
  ];
  const appData = await fetchGameData(csvFiles);

  console.log(appData);

  ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      <App data={appData} />
    </React.StrictMode>,
  )
}

renderApp();