
import '../login/login.css'
import { FormEvent, useState } from 'react';
import { api } from '../utils/api/api';
import { User } from '../utils/types/data';
import { useNavigate } from "react-router-dom";

 function creat(){
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<User>({} as User);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
   try {
     const createdUser = await api.creatUser(newUser);
      if(!createdUser){ alert('usuario n existe ou senha/email incorretos')}
   else {navigate("/")}
    } catch (error) {}
  }
  
    return (
        <section className= 'creatArea'>
        <form className="formM" onSubmit={handleSubmit}>
          <input  onChange={(event) => {
            setNewUser({ ...newUser, name: event.target.value });
            console.log("aoba", newUser);
          }} >
          </input  >
          <input onChange={(event) => {
            setNewUser({ ...newUser, email: event.target.value });
            console.log("aoba", newUser);
          }} >
          </input>
       <input onChange={(event) => {
            setNewUser({ ...newUser, password: event.target.value });
            console.log("aoba", newUser);
          }}>
       </input>
          <button>sign in
          </button>
          
        </form>
      </section>
      
        
    )
 }
 export default creat;