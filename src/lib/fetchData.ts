import { supabase } from "./supabase";

export const PAGINATE = 8;
export const DB_TABLE = "hfood";

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from(DB_TABLE)
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
  if (keyword === "") return await getProducts(pageParam);
  return await searchProduct(pageParam, keyword, searchType);
};

export const getProducts = async (pageParam: number) => {
  const { data, error } = await supabase
    .from(DB_TABLE)
    .select("*")
    .range(
      (pageParam - 1) * PAGINATE,
      (pageParam - 1) * PAGINATE + (PAGINATE - 1)
    );
  if (error) throw error;
  return data;
};

export const searchProduct = async (
  pageParam: number,
  keyword: string,
  searchType: string
) => {
  const { data, error } = await supabase
    .from(DB_TABLE)
    .select("*")
    .ilike(searchType, `%${keyword}%`)
    .range(
      (pageParam - 1) * PAGINATE,
      (pageParam - 1) * PAGINATE + (PAGINATE - 1)
    );
  if (error) throw error;
  return data;
};
