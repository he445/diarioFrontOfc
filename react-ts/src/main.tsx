import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './navBar/navbar'
import Login from './login/login'
import Creat from './create/creat'
import Home from './home/home'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
    {/* <Login/> */}
    <Home/>
  </React.StrictMode>,
)
