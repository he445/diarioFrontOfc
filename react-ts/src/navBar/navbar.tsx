import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- Adicionado useLocation
import Modal from 'react-modal';
import Avatar from '@mui/material/Avatar';
import './navBar.css';
import { api } from '../utils/api/api';
import { User } from '../utils/types/data';

// Estilo Editorial para o Modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    background: 'var(--bg-paper)', 
    border: '1px solid var(--color-ink)', 
    borderRadius: '0', 
    padding: '40px',
  },
  overlay: {
    background: 'rgba(26, 26, 26, 0.7)', 
    backdropFilter: 'blur(3px)',
    zIndex: 1000,
  },
};

Modal.setAppElement('#root');

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Descobre em qual página estamos
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState<User>({} as User);

  // Lógica: Se a rota for '/' (Login) ou '/creat' (Criar Conta), é uma página de autenticação.
  const isAuthPage = location.pathname === '/' || location.pathname === '/creat';

  const getUserId = () => {
    const storageData = localStorage.getItem("user");
    if (!storageData) return null;
    return JSON.parse(storageData).id;
  };

  function handleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  const getUser = async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const res = await api.getUser(userId);
      setUser(res);
    } catch (error) {
      console.error("Erro ao buscar usuário", error);
    }
  };

  const updatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) return;

    const updatedUser = {
      name: e.currentTarget.uname.value,
      email: e.currentTarget.email.value,
      image: e.currentTarget.image.value,
    };

    try {
      await api.updateUser(updatedUser, userId);
      setUser({ ...user, ...updatedUser }); 
      handleModal();
    } catch (error) {
      alert("Erro ao atualizar perfil");
    }
  };

  const deleteUser = async () => {
    const userId = getUserId();
    if (!userId) return;
    
    if (window.confirm("Tem certeza que deseja deletar sua conta de escritor? Essa ação é irreversível.")) {
      await api.deleteUser(userId);
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // O useEffect só vai buscar o usuário se NÃO estivermos na tela de login
  useEffect(() => {
    if (!isAuthPage) {
      getUser();
    }
  }, [isAuthPage]);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        
        {/* Título - SEMPRE VISÍVEL */}
        <h1>Diário</h1>

        {/* Links Principais - SÓ VISÍVEL QUANDO LOGADO */}
        {!isAuthPage && (
          <div className="nav-links">
            <a href="/home">Início</a>
            <a href="/creat">Escrever</a>
          </div>
        )}

        {/* Área do Usuário - SÓ VISÍVEL QUANDO LOGADO */}
        {!isAuthPage && (
          <div className="user-profile" onClick={handleModal}>
            <span className="user-name">{user.name ? user.name : "Perfil"}</span>
            <Avatar 
              src={user.image || undefined} 
              sx={{ width: 36, height: 36, border: '1px solid #1A1A1A' }} 
              variant="square" 
            />
          </div>
        )}
      </div>

      {/* Modal - SÓ RENDERIZA QUANDO LOGADO */}
      {!isAuthPage && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModal}
          style={customStyles}
          contentLabel="Configurações do Perfil"
        >
          <div className="modal-header">
            <h2 className="modal-title">Seu Perfil</h2>
            <button className="close-btn" onClick={handleModal}>X</button>
          </div>

          <form className="modal-form" onSubmit={updatePost}>
            <label>Nome (Pseudônimo)</label>
            <input className="modal-input" type="text" name="uname" defaultValue={user.name} required />
            
            <label>E-mail</label>
            <input className="modal-input" type="email" name="email" defaultValue={user.email} required />
            
            <label>URL da Foto (Avatar)</label>
            <input className="modal-input" type="url" name="image" placeholder="https://..." defaultValue={user.image} />
            
            <button type="submit" className="modal-btn primary">Salvar Alterações</button>
          </form>

          <div className="modal-danger-zone">
            <button className="text-btn" onClick={handleLogout}>Sair da conta (Logout)</button>
            <button className="text-btn danger" onClick={deleteUser}>Excluir conta</button>
          </div>
        </Modal>
      )}
    </nav>
  );
}

export default NavBar;