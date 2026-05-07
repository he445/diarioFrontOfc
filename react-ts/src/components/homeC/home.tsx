import { useEffect, useState, FormEvent } from "react";
import { api } from "../../utils/api/api";
import { Post } from "../../utils/types/data";
import "./home.css";

function Home() {
  const [list, setList] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [uniqueList, setUniqueList] = useState<Post>({} as Post);
  const [newPost, setNewPost] = useState<Post>({} as Post);
  const [isEditing, setIsEditing] = useState(false);
  const [control, setControl] = useState(false);

  // Função segura para pegar o ID do Storage
  const getUserId = () => {
    const storageData = localStorage.getItem("user");
    if (!storageData) return null;
    return JSON.parse(storageData).id;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) return;

    // CRIAMOS UM PACOTE LIMPO PARA A API (Resolve o erro 400 Bad Request)
    const postPayload = {
      title: newPost.title,
      content: newPost.content,
      authorId: userId
    }as Post;

    try {
      await api.creat(postPayload);
      
      // Limpa os dados do formulário sem usar reset() que quebrava o React
      setNewPost({} as Post); 
      updatePage();
      
    } catch (error) {
      console.error("Erro ao criar post", error);
      alert("Erro ao publicar. Verifique o console.");
    }
  }

  const getList = async () => {
    try {
      const res = await api.getAllPosts();
      setList(res);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = getUserId();
    if (!userId) return;

    const upPost = { ...uniqueList, authorId: userId };
    
    try {
      await api.update(upPost);
      updatePage();
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar", error);
    }
  };

  const deleteList = async (listid: string, profileId: string) => {
    const ownerId = getUserId();
    
    if (profileId === ownerId) {
      if(window.confirm("Tem certeza que deseja apagar este texto?")) {
        try {
          await api.delete(listid);
          // Jeito CORRETO do React de remover um item de uma lista:
          setList((prevList) => prevList.filter((item) => item.id !== listid));
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Este texto não é seu, você não pode apagá-lo.");
    }
  };

  const searchPost = list.filter((item) => {
    return item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  function updatePage() {
    setControl(!control);
  }

  useEffect(() => {
    getList();
  }, [control]);

  return (
    <div className="home-container container">
      
      {/* BARRA DE PESQUISA */}
      <div className="search-section">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar textos ou poemas..."
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      {/* ÁREA DE CRIAÇÃO / EDIÇÃO */}
      <section className="editor-section">
        {isEditing ? (
          <form className="editor-form" onSubmit={updatePost}>
            <div className="editor-header">
              <h3>Editando Rascunho</h3>
              <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
            
            <input
              className="editor-title"
              type="text"
              placeholder="Título"
              defaultValue={uniqueList.title}
              onChange={(e) => setUniqueList({ ...uniqueList, title: e.target.value })}
              required
            />
            
            <textarea
              className="editor-content"
              placeholder="Escreva seu texto aqui..."
              defaultValue={uniqueList.content}
              onChange={(e) => setUniqueList({ ...uniqueList, content: e.target.value })}
              required
            />
            
            <button type="submit" className="btn-submit">Atualizar Texto</button>
          </form>
        ) : (
          <form className="editor-form" onSubmit={handleSubmit}>
            <input
              className="editor-title"
              type="text"
              name="title"
              placeholder="Título da nova obra..."
              value={newPost.title || ""} /* Mantém o input sincronizado com o State */
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            
            <textarea
              className="editor-content"
              name="text"
              placeholder="Comece a escrever sua história aqui..."
              value={newPost.content || ""} /* Mantém o textarea sincronizado com o State */
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
            />
            
            <button type="submit" className="btn-submit">Publicar</button>
          </form>
        )}
      </section>

      {/* FEED DE POSTS (SUMÁRIO) */}
      {!isEditing && (
        <section className="feed-section">
          <ul className="feed-list">
            {searchPost.map((item) => {
              // Verifica se o usuário atual é o dono do post para mostrar os botões
              const isOwner = item.authorId === getUserId();

              return (
                <li className="post-card" key={item.id}>
                  <h2 className="post-title">{item.title}</h2>
                  <p className="post-text">{item.content}</p>
                  
                  {isOwner && (
                    <div className="post-actions">
                      <button 
                        className="btn-action edit" 
                        onClick={() => {
                          setUniqueList(item);
                          setIsEditing(true);
                          window.scrollTo(0, 0); // Sobe a tela para o editor
                        }}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-action delete" 
                        onClick={() => deleteList(item.id, item.authorId)}
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
            
            {searchPost.length === 0 && (
              <div className="empty-state">
                <p>Nenhum texto encontrado.</p>
              </div>
            )}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Home;