import GameApp from "@/components/customUi/GameApp";
import SurveyDrawerDemo from "./survey/survey-action/Survey";
import { Alert } from "@/components/ui/alert";
import { AlertDemo } from "@/components/customUi/AlertDemo";

export default async function Home() {
  return (
    <>
      <GameApp />
      <SurveyDrawerDemo />
    </>
  );
}
