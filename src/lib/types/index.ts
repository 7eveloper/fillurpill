export {};

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
        Insert: {
          id?: never;
          title: string;
          content: string;
          rating: number;
          ingredient: string;
          userId: string;
          data: Json | null;
        };
        Update: {
          id?: never;
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
