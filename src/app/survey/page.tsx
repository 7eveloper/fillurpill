import Survey from "@/components/Survey";
import { isThereServerSession } from "@/hooks/session";

const SurveyPage = async () => {
  const { supabase, session } = await isThereServerSession();
  const user = session?.user;

  const { data: userResults, error } = await supabase
    .from("survey")
    .select("*")
    .eq("user_id", user?.id);

  // console.log("유저리저트", userResults);

  return (
    <div>
      SurveyPage
      <Survey />
    </div>
  );
};

export default SurveyPage;
