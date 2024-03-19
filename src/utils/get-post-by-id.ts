import { TypedSupabaseClient } from "./supabase";

export const getPostById = (client: TypedSupabaseClient, postId: number) => {
  return client.from("posts").select("*");
};
