"use client";
import {
  SurveyDrawer,
  SurveyDrawerContent,
  SurveyDrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Survey } from "./surveyAction";

export default function SurveyDrawerBtn() {
  return (
    <SurveyDrawer>
      <SurveyDrawerTrigger asChild>
        <Button variant="outline">설문조사 하러가기</Button>
      </SurveyDrawerTrigger>
      <SurveyDrawerContent>
        <Survey />
      </SurveyDrawerContent>
    </SurveyDrawer>
  );
}
