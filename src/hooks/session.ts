import {
  // createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const isThereServerSession = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return { supabase, session };
};

// export const isThereClientSession = async () => {
//   const supabase = createClientComponentClient();
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   return { supabase, session };
// };
