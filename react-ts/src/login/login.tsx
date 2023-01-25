
import { FormEvent } from "react";
import { api } from "../utils/api/api";
import { useNavigate } from "react-router-dom";
import './login.css'
import { useEffect, useState } from 'react';

 function login(){
  const navigate = useNavigate();

   async function handleSubmit (e:FormEvent<HTMLFormElement>) {
   
      e.preventDefault();
   const loginCall =
      {email: e.currentTarget.email.value,
        password: e.currentTarget.password.value, }
        const userData = await api.login(loginCall);
        if (!userData) {
          alert('usuario n existe ou senha/email incorretos')
        }
      else {navigate("/home");
        console.log(userData);
      return userData}
   
     }
      
     
 
    return (
        <section className= 'loginArea'>
        <form className='loginForm' onSubmit={handleSubmit}>
          <input className='loginInput' placeholder="Email"
          name="email"
              type="email"
              required
              >
          </input>
          <input className='loginInput' placeholder="Password"
           name="password"
              type="password"
              required>
          </input>
          <button className='loginbutton' type="submit">login
          </button>
          
        </form>
      </section>
      
        
    )
 }
 export default login;