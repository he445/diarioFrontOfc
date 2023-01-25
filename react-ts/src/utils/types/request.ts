import { Post } from "./data";

export type LoginRequest = {
  email: string;
  password: string;
};
export type UpdatePostPayload = {
  id: string;
  profileId: string;
  title: string;
  content: string;
};
