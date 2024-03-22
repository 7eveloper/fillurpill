"use client";
import SurveyDrawerDemo from "@/app/survey/survey-action/SurveyDrawerBtn";
import { Button } from "@/components/ui/button";
import { isThereServerSession } from "@/hooks/serverSession";
import { toast } from "sonner";

const SurveyPage = () => {
  // const { supabase, session } = await isThereServerSession();
  // const user = session?.user;

  // const { data: userResults, error } = await supabase
  //   .from("survey")
  //   .select("*")
  //   .eq("user_id", user?.id);

  // console.log("유저리저트", userResults);

  return (
    <div>
      SurveyPage
      <SurveyDrawerDemo />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};

export default SurveyPage;
