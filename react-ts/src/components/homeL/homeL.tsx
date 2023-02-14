import Modal from 'react-modal';
import { FormEvent, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors'
import { api } from '../../utils/api/api';
import { User } from '../../utils/types/data';

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

function homeL (){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState<User>({} as User);
    function handleModal() {
        setModalIsOpen(!modalIsOpen);
      }
    
    const  getUser = async () => {
    const UserId = JSON.parse(localStorage.getItem("user") ?? "").id
      try {
        const res = await api.getUser(UserId)
        setUser(res)
        console.log(res)
      } catch (error) {
        console.log(error)}}
     const updatePost = async (e: FormEvent<HTMLFormElement>) => {
        const UserId = JSON.parse(localStorage.getItem("user") ?? "").id
        e.preventDefault();
        const newUser = {name: e.currentTarget.uname.value,
            email: e.currentTarget.email.value, 
            image:e.currentTarget.image.value}
            await api.updateUser(newUser, UserId)  
            handleModal()  
      };
      useEffect(() => {
        getUser();
      }, []);
    return (
       <>
            <button onClick={() => handleModal()}> 
            <Stack direction="row" spacing={2}>
            <Avatar src={user.image??"/broken-image.jpg"} /></Stack>
            <span>{user.name?? null}</span>
            </button>
            <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModal}
          contentLabel="form Create"
          style={customStyles}
        ><form onSubmit={updatePost}>
        <input   type="text"
              id="fname"
              name="uname"
              defaultValue={user.name} /> 
               <input   type="text"
              id="fname"
              name="email"
              defaultValue={user.email} />
               <input   type="text"
              id="fname"
              name="image"
              defaultValue={user.image} />
              <button type="submit" className="btn-submit">
                              Submit             
              </button>
        </form></Modal>
        </>
      ) 
}

export default homeL