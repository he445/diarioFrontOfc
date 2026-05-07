import Modal from 'react-modal';
import { FormEvent, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors'
import './navBar.css'
import { User } from '../utils/types/data';
import { api } from '../utils/api/api';

function NavBar() {
  return (
    <nav className="navbar">
      {/* Aqui combinamos o container (que limita em 800px) com o nav-content (que faz o flexbox) */}
      <div className="container nav-content">
        
        {/* Item 1: Logo/Título - Fica na ESQUERDA */}
        <h1>Diário</h1>

        {/* Item 2: Links - Fica no CENTRO */}
        <div className="nav-links">
          <a href="/home">Início</a>
          <a href="/creat">Escrever</a>
        </div>

        {/* Item 3: Perfil - Fica na DIREITA */}
        <div className="user-profile">
           {/* Adicione o seu Avatar aqui. O justify-content divide o espaço entre estes 3 blocos */}
        </div>
        
      </div>
    </nav>
  );
}

export default NavBar;