export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Post = {
  content: string | null;
  id: string;
  image: string | null;
  ingredient: string | null;
  rating: string | null;
  title: string | null;
  user_id: string | null;
  // data: Json | null;
};

export type Product = {
  caution: string | null;
  company: string | null;
  expiration_date: string | null;
  function: string | null;
  id: number;
  image: string | null;
  link: string | null;
  name: string | null;
  raw_materials: string | null;
  standard: string | null;
  sungsang: string | null;
  taking_guide: string | null;
};

export type UserData = {
  email: string | null;
  nickname: string | null;
  user_id: string;
};

export type IntakeDiary = {
  id: string;
  title: string;
  contents: string;
  start: string;
  end: string;
  user_id?: string;
};

export type User = {
  gender: string | null;
  age: string | null;
  weight: string | null;
  height: string | null;
  nickname: string | null;
  email: string | null;
};
