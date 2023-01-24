export type User = {
    id: String;
    name: String;
    email: String;
    password: String;
    image?: String;
    bio?: String;
    posts: Post[];
    likes: Post[];
    comments: Comment[];
    following: User[];
    followers: User[];
    role: String;
  };
  export type Post = {
    id: String;
    title: String;
    content: String;
    likedBy: User[];
    comments: Comment[];
    author: User;
    profileId: String;
  };
  
  export type Comment = {
    id: String;
    content: String;
    post: Post;
    postId: String;
    author: User;
    authorId: String;
  };