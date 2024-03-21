import { create } from "zustand";
import type { Post } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { isThereClientSession } from "@/hooks/clientSession";

interface StoreState {
  posts: Post[];
  isLoading: boolean;
  isError: string | null;
  fetchPostData: () => Promise<void>;
  addPost: (newPost: Partial<Post>) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
  editPost: (postId: number, updatedPost: Partial<Post>) => Promise<void>;
}

const usePostStore = create<StoreState>((set) => ({
  posts: [],
  isLoading: true,
  isError: null,
  fetchPostData: async () => {
    try {
      const { data: posts, error } = await supabase.from("posts").select("*");
      if (error) {
        throw new Error(error.message);
      }
      set({ posts, isLoading: false, isError: null });
    } catch (error) {
      console.error("Supabase에서 데이터 불러오기 오류", error);
      set({ isLoading: false, isError: error });
    }
  },

  addPost: async (newPost: Partial<Post>) => {
    const { supabase, user } = await isThereClientSession();
    try {
      const { error } = await supabase
        .from("posts")
        .insert([{ user_id: user?.id, ...newPost }]);
      if (error) {
        throw error;
      }
      await usePostStore.getState().fetchPostData();
    } catch (error) {
      console.error("글 등록 오류", error);
      alert("글 등록에 실패했습니다.");
    }
  },

  deletePost: async (postId: number) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) {
        throw error;
      }
      await usePostStore.getState().fetchPostData();
    } catch (error) {
      console.error("글 삭제 오류", error);
      alert("글 삭제에 실패했습니다.");
    }
  },

  editPost: async (postId: number, updatedPost: Partial<Post>) => {
    try {
      const { error } = await supabase
        .from("posts")
        .update(updatedPost)
        .eq("id", postId);
      if (error) {
        throw error;
      }
      await usePostStore.getState().fetchPostData();
    } catch (error) {
      console.error("글 수정 오류", error);
      alert("글 수정에 실패했습니다.");
    }
  },
}));

export default usePostStore;
