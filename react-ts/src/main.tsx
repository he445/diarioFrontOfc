import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './navBar/navbar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>,
)
