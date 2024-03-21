import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

export const fetchData = async (pageParam: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  console.log(data);
  return data;
};

export const searchData = async (pageParam: number, keyword: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .textSearch("function", keyword)
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  console.log(data);
  return data;
};

export const useQueryProduct = () => {
  return useInfiniteQuery({
    queryKey: ["product"],
    queryFn: ({ pageParam }) => fetchData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return null;
      return allPages.length + 1;
    },
    select: (data) => {
      return data.pages.flat();
    },
  });
};

export const useSearchProduct = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ["search"],
    queryFn: ({ pageParam }) => searchData(pageParam, keyword),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return null;
      return allPages.length + 1;
    },
    select: (data) => {
      return data.pages.flat();
    },
  });
};

export type SearchData = ReturnType<typeof useSearchProduct>["data"];
