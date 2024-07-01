import React from 'react'
import Router from './pages/Router'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
)
