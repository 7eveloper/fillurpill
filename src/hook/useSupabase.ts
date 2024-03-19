import { useMemo } from "react";
import { getSupabaseBrowserClient } from "@/utils/supabase";

const useSupabase = () => {
  return useMemo(getSupabaseBrowserClient, []);
};

export default useSupabase;
