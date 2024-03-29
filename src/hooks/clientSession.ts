import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/lib/types/supabase";

export const isThereClientSession = async () => {
  const supabase = createClientComponentClient<Database>();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  return { supabase, session, user };
};
