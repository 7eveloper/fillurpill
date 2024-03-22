import GameApp from "@/components/customUi/GameApp";
import SurveyDrawerBtn from "./survey/survey-action/SurveyDrawerBtn";

export default async function Home() {
  return (
    <>
      <GameApp />
      <SurveyDrawerBtn />
    </>
  );
}
