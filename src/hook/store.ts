import { create } from "zustand";
import type { Post } from "@/lib/types";
import { supabase } from "@/utils/supabase";

interface StoreState {
  posts: Post[];
  isLoading: boolean;
  isError: string | null;
  fetchPostData: () => Promise<void>;
  addPost: (newPost: Partial<Post>) => void;
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
    try {
      const { error } = await supabase.from("posts").insert([newPost]);
      if (error) {
        throw error;
      }
      await usePostStore.getState().fetchPostData();
    } catch (error) {
      console.error("글 등록 오류", error);
      alert("글 등록에 실패했습니다.");
    }
  },
}));

export default usePostStore;
