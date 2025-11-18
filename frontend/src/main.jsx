import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter } from 'react-router'
import { SocketProvider } from './context/shocketContext.jsx'
import { NumberContext } from './context/numberContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
    <SocketProvider> 
      <NumberContext>

    <App />
    </NumberContext>
      </SocketProvider>
      
    </BrowserRouter>
  
  </StrictMode>,
)
