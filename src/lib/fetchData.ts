import { createClient } from "@supabase/supabase-js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Database } from "./types/supabase";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getData = async (
  pageParam: number,
  keyword: string | null = null
) => {
  if (keyword == null) {
    return await fetchData(pageParam);
  }
  return await searchData(pageParam, keyword);
};

export const fetchData = async (pageParam: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  console.log("검색어없음", data);
  return data;
};

export const searchData = async (pageParam: number, keyword: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .textSearch("function", keyword)
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  console.log(keyword, data);
  return data;
};

export const useQueryProduct = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: ["product"],
    queryFn: ({ pageParam }) => getData(pageParam, keyword),
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

// export const useSearchProduct = (keyword: string) => {
//   return useInfiniteQuery({
//     queryKey: ["product"],
//     queryFn: ({ pageParam }) => searchData(pageParam, keyword),
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, allPages) => {
//       if (lastPage.length < 10) return null;
//       return allPages.length + 1;
//     },
//     select: (data) => {
//       return data.pages.flat();
//     },
//   });
// };
