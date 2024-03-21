import GameApp from "@/components/customUi/GameApp";
import SurveyDrawerDemo from "./survey/survey-action/Survey";

export default async function Home() {
  return (
    <>
      <GameApp />
      <SurveyDrawerDemo />
    </>
  );
}
