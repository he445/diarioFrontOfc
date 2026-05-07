import { FormEvent } from "react";
import { api } from "../utils/api/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const loginCall = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const userData = await api.login(loginCall);
    if (!userData) {
      alert("Usuário não existe ou senha/email incorretos");
    } else {
      navigate("/home");
      console.log(userData);
      return userData;
    }
  }

  return (
    <section className="loginArea">
      <div className="loginBox">
        <h2 className="loginTitle">Acesso</h2>
        
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            className="loginInput"
            placeholder="E-mail"
            name="email"
            type="email"
            required
          />
          <input
            className="loginInput"
            placeholder="Senha"
            name="password"
            type="password"
            required
          />
          
          <button className="loginBtn primary" type="submit">
            Entrar
          </button>
          
          <div className="loginDivider">ou</div>
          
          {/* Mudei para type="button" para não submeter o formulário de login acidentalmente */}
          <button
            onClick={() => navigate("/creat")}
            className="loginBtn secondary"
            type="button"
          >
            Criar uma conta
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;