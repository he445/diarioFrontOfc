import axios from 'axios'
import { Post,User } from '../types/data';
import { LoginRequest, newUser, UpdatePostPayload } from '../types/request'

axios.defaults.baseURL = "https://diarioapiofc.onrender.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = {
          Authorization: "Bearer " + token,
        };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
  axios.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      if (error.response.status === 401) {
        if (localStorage.getItem("token")) localStorage.removeItem("token");
      }
    }
  );

  export const api = {
    login: async ({ email, password }: LoginRequest) => {
      try {
        const response = await axios.post("/auth", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        return response.data;
        
       
      } catch (err) {
        
       console.log(err);
      }
    },
    getAllPosts: async () => {
        try {
          const post = await axios.get(
           '/post',
          );
          return post.data;
        } catch (err) {
          console.log(err, 'erro no servidor');
        }
      },
      creat: async (post:Post) => {
    console.log(localStorage) 
        try {
          const newPost = await axios.post(
             '/post',
            post,
          );
          return newPost;
        } catch (err) {
          console.log(err);
        }
      },

      update: async (post:Post) => {
        const postUpdated = await axios.patch(
        `/post/${post.id}`,
        post,
        );
        return postUpdated;
      },
      delete: async (postId:string) => {
        const isDeleted = await axios.delete(
          `post/${postId}`,
        );
        return isDeleted;
      },
      creatUser: async (users:User) => {
        console.log(localStorage) 
            try {
              const newUser = await axios.post(
                 '/users',
                users,
              );
              return newUser;
            } catch (err) {
              console.log(err);
            }
          },
          getUser:async (userId:string) => {
            try {
              const user= await axios.get(
               `/users/${userId}`,
              );
              return user.data;
            } catch (err) {
              console.log(err, 'erro no servidor');
            }
          },
          updateUser: async (user:newUser,userId:string) => {
            const userUpdated = await axios.patch(
            `/post/${userId}`,
            user,
            );
            return  userUpdated;
          },
          };


  


