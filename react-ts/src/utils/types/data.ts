export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    bio?: string;
    posts: Post[];
    likes: Post[];
    comments: Comment[];
    following: User[];
    followers: User[];
    role: string;
  };
  export type Post = {
    id: string;
    title: string;
    content: string;
    likedBy: User[];
    comments: Comment[];
    author: User;
    authorId: string;
  };
  
  export type Comment = {
    id: String;
    content: String;
    post: Post;
    postId: String;
    author: User;
    authorId: String;
  };