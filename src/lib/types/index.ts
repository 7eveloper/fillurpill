export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Post = {
  id: number;
  title: string;
  content: string;
  rating: string;
  ingredient: string;
  userId: string;
  image: string;
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
