import React from 'react'
import Router from './pages/Router'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <Router />
    </BrowserRouter>
  </React.StrictMode>
)
