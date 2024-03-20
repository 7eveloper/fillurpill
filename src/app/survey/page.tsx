import Survey from "@/components/Survey";
import { isThereServerSession } from "@/hooks/session";
import { redirect } from "next/navigation";

const SurveyPage = async () => {
  // const { session } = await isThereServerSession();
  // if (!session) {
  //   return redirect("/login");
  // }

  return (
    <div>
      SurveyPage
      <Survey />
    </div>
  );
};

export default SurveyPage;
