import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const isThereClientSession = async () => {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  return { supabase, user };
};
