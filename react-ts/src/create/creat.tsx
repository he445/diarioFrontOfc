import "./create.css";
import { FormEvent, useState } from "react";
import { api } from "../utils/api/api";
import { User } from "../utils/types/data";
import { useNavigate } from "react-router-dom";

// O nome da função DEVE começar com maiúscula no React
function Creat() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<User>({} as User);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const createdUser = await api.creatUser(newUser);
      if (!createdUser) {
        alert("Erro ao criar conta. Verifique os dados e tente novamente.");
      } else {
        navigate("/"); // Volta pro login após criar a conta com sucesso
      }
    } catch (error) {
      console.error("Erro na criação:", error);
    }
  }

  return (
    <section className="createArea">
      <div className="createBox">
        <h2 className="createTitle">Nova Conta</h2>
        
        <form className="formCreate" onSubmit={handleSubmit}>
          <input
            className="createInput"
            placeholder="Nome"
            type="text"
            required
            onChange={(event) => {
              setNewUser({ ...newUser, name: event.target.value });
            }}
          />
          <input
            className="createInput"
            placeholder="E-mail"
            type="email"
            required
            onChange={(event) => {
              setNewUser({ ...newUser, email: event.target.value });
            }}
          />
          <input
            className="createInput"
            placeholder="Senha"
            type="password" /* Muito importante para esconder os caracteres! */
            required
            onChange={(event) => {
              setNewUser({ ...newUser, password: event.target.value });
            }}
          />
          
          <button className="createBtn primary" type="submit">
            Registrar
          </button>
          
          <div className="createDivider">ou</div>
          
          <button 
            className="createBtn secondary" 
            type="button" 
            onClick={() => navigate("/")}
          >
            Voltar ao Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Creat;