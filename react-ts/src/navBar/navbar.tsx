import Modal from 'react-modal';
import { FormEvent, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors'
import './navBar.css'
import { User } from '../utils/types/data';
import { api } from '../utils/api/api';

const customStyles = {
    content: {
      width: '100%',
      height: '70%',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.4)',
    },
  };
  
  Modal.setAppElement('#root');
  
 function navbar(){
return (<nav><h1>Diario </h1> <hr/></nav> )
}
 
 export default navbar;