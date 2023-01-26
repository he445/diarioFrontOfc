import { StrictMode, useEffect, useState, FormEvent } from "react";
import { api } from "../../utils/api/api";
import { Post } from "../../utils/types/data";
import  "./homec.css";
function homeC() {
  const [list, setlist] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>('');
  const [uniqueList, setUniqueList] = useState<Post>({} as Post);
  const [newPost, setNewPost] = useState<Post>({} as Post);
  const [edtedList, setEdtedList] = useState(false);
  const [control, setControl] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    newPost.profileId = JSON.parse(localStorage.getItem("user") ?? "").id;
    try {
      await api.creat(newPost);
      console.log("ok");
      updatePage();
    } catch (error) {}
  }
  const getlist = async () => {
    try {
      const res = await api.getAllPosts();

      setlist(res);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const updatePost = async (e: FormEvent<HTMLFormElement>) => {
    const upPost = uniqueList;
    upPost.profileId = JSON.parse(localStorage.getItem("user") ?? "").id;
    e.preventDefault();
    const newList = list;
    newList.map((list, index) => {
      if (list.id === upPost.id) {
        newList.splice(index, 1);
        setlist(newList);
      }
    });
    await api.update(upPost);
    updatePage();

    setEdtedList(false);
  };

  const deleteList = async (listid: string) => {
    try {
      await api.delete(listid);
      const newList = list;
      newList.map((list, index) => {
        if (list.id === listid) {
          newList.splice(index, 1);
          setlist(newList);
        }
      });
      updatePage();
    } catch (err) {
      console.log(err);
    }
  };
  const seachPost= list.filter((list)=>{
    return list.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
})

  function updatePage() {
    setControl(!control);
    alert("sucesso");
  }

  useEffect(() => {
    getlist();
  }, []);

  return (
    <div className="home">
    <section className="feature">
    <input type="text" placeholder="search" onChange={(e) => {
          setSearch(e.currentTarget.value);
        }} />
      <form className="formM" onSubmit={handleSubmit}>
        <label id="fname">Titulo:</label>
        <input
          type="text"
          id="fname"
          name="title"
          onChange={(event) => {
            setNewPost({ ...newPost, title: event.target.value });
            console.log("aoba", newPost);
          }}
        />
        <label id="lnameT">Texto</label>

        <textarea
          id="lname"
          name="text"
          onChange={(event) => {
            setNewPost({ ...newPost, content: event.target.value });
            console.log("aoba", newPost);
          }}
        />
        <button type="submit" className="textbnt2">
          Submit
        </button>
      </form>
      <div>
        {edtedList ? (
          <form className="formM" onSubmit={updatePost}>
                        
            <input
              type="text"
              id="fname"
              name="title"
              defaultValue={uniqueList.title}
              onChange={(event) => {
                setUniqueList({ ...uniqueList, title: event.target.value });
                console.log("aoba", uniqueList);
              }}
            />
                                                  
            <textarea
              id="lname"
              name="text"
              defaultValue={uniqueList.content}
              onChange={(event) => {
                setUniqueList({ ...uniqueList, content: event.target.value });
                console.log("aoba", uniqueList);
              }}
            />
                        
            <button type="submit" className="textbnt2">
                            Submit             
            </button>
                      
          </form>
        ) : (
          <ul className="featureUL">
            {seachPost.map((list, index) => {
              return (
                <li className="textlist">
                  <h2 className="title">{list.title}</h2>

                  <p className="pp">{list.content}</p>
                  <div className="btn">
                  <button
                    className="textbnt2"
                    onClick={() => {
                      deleteList(list.id);
                    }}
                  >
                    delete
                  </button>
                  <button
                    className="textbnt3"
                    onClick={() => {
                      setUniqueList(list);
                      setEdtedList(true);
                    }}
                  >
                    update
                  </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
    </div>
  );
}
export default homeC;
