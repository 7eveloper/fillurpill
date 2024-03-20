import { User } from "@/lib/zustandStore";
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
  return { session };
};

// export const isThereClientSession = async () => {
//   const supabase = createClientComponentClient();
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   return { supabase, session };
// };

export const addUserReault = async (userResult: User) => {
  "use server";
  // await fetch("http://localhost:3000/user/survey", {
  //     method: "post",
  //     body: JSON.stringify({userResult})
  // })
  // router.refresh()
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("survey").insert(userResult);
  return { data, error };
};
