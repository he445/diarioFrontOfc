import { StrictMode, useEffect, useState,FormEvent  } from "react";
import { api } from "../../utils/api/api";
import { Post } from "../../utils/types/data";
function homeC (){
const [list, setlist] = useState<Post[]>([]);
const [newPost, setNewPost]= useState<Post>({}as Post);
const [control, setControl] = useState(false);
async function handleSubmit(e:FormEvent<HTMLFormElement>) {
   
    
    e.preventDefault();
    newPost.profileId = JSON.parse(localStorage.getItem("user") ?? "").id
    try {
      await api.creat(newPost);
    console.log('ok');
    updatePage()
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
  function updatePage() {
    setControl(!control);
    alert('sucesso');
  }

  useEffect(() => {
    getlist(); 
  }, [control]);
    return(
        <section className="feature">
        <form className="formM" onSubmit={handleSubmit}>
          <label id="fname">Titulo:</label>
          <input
            type="text"
            id="fname"
            name="title"
            onChange={(event) => {
              setNewPost({ ...newPost, title: event.target.value });
              console.log('aoba', newPost);
            }}
          />
          <label id="lnameT">Texto</label>

          <textarea
            id="lname"
            name="text"
            onChange={(event) => {
              setNewPost({ ...newPost, body: event.target.value });
              console.log('aoba', newPost);
            }}
          />
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      
        
        <ul className="featureUL">
          {list.map((list, index) => {
            return (
              <li className="textlist">
                <h2 className="title">{list.title}</h2>
                                
                <p className="pp">
                  {
                  list.content}
                                  
                </p>
                </li>)})}
                </ul>
                </section>
    )
}
export default homeC