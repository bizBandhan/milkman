import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PravahProvider } from 'pravah-sdk';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PravahProvider>
      <App />
    </PravahProvider>
  </StrictMode>,
)
