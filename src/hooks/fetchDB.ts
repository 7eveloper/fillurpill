import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();
export const fetchSurvey = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: surveyResult } = await supabase
    .from("survey")
    .select("*")
    .eq("user_id", session?.user.id);
  return surveyResult;
};

export const fetchUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", session?.user.id);
  console.log(userData);
  return userData;
};
