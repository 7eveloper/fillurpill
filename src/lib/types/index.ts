export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number;
          title: string;
          content: string;
          rating: number;
          ingredient: string;
          userId: string;
          data: Json | null;
        };
      };
    };
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  rating: string;
  ingredient: string;
  userId: string;
  image: string;
  data: Json | null;
}
