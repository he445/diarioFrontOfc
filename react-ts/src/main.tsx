import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './navBar/navbar'
import Login from './login/login'
import Creat from './create/creat'
import Home from './home/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Login/>} />
  <Route path="/home" element={<Home/>} />
  <Route path="/creat" element={<Creat/>} />
</Routes>
</BrowserRouter>
    
  </React.StrictMode>,
)
