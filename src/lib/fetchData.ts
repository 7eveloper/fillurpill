import { supabase } from "./supabase";

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const fetchData = async (
  pageParam: number,
  keyword: string,
  searchType: string
) => {
  console.log(keyword);
  if (keyword === "") return await getProducts(pageParam);
  return await searchProduct(pageParam, keyword, searchType);
};

export const getProducts = async (pageParam: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  return data;
};

export const searchProduct = async (
  pageParam: number,
  keyword: string,
  searchType: string
) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .textSearch(searchType, keyword)
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  return data;
};
