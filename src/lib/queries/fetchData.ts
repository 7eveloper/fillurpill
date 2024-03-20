import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchData = async (pageParam: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .range((pageParam - 1) * 10, (pageParam - 1) * 10 + 9);
  if (error) throw error;
  return data;
};
