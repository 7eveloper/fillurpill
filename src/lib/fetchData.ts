import { supabase } from "./supabase";

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const fetchData = async (pageParam: number, keyword: string) => {
  console.log(keyword);
  if (keyword === "") return await getProducts(pageParam);
  return await searchProduct(pageParam, keyword);
};

export const getProducts = async (pageParam: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  return data;
};

export const searchProduct = async (pageParam: number, keyword: string) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .textSearch("function", keyword)
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  return data;
};
