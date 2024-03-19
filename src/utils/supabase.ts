import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types";
import { useMemo } from "react";

export type TypedSupabaseClient = SupabaseClient<Database>;
let client: TypedSupabaseClient | undefined;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const getSupabaseBrowserClient = () => {
  if (client) return client;
  client = createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!);

  return client;
};

const useSupabaseBrowser = () => {
  return useMemo(getSupabaseBrowserClient, []);
};

export default useSupabaseBrowser;
