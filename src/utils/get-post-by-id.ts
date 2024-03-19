import { TypedSupabaseClient } from "./supabase";

export const getPostById = async (
  client: TypedSupabaseClient,
  postId: number
) => {
  const { data, error } = await client
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
