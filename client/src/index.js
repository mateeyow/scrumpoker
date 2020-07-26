import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import BasePage from './pages/base-page/BasePage'
import './assets/tailwind.output.css'

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <BasePage />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
)
