"use client";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SurveyDrawerBtn from "@/components/survey/SurveyDrawerBtn";

export function AlertSurveyDemo({ nickname }: { nickname: string }) {
  return (
    <Alert className="flex justify-between items-center">
      <RocketIcon className="h-4 w-4" />
      <div className="mt-2">
        <AlertTitle>설문조사를 완료해주세요!</AlertTitle>
        <AlertDescription>
          {nickname}님 만의 맞춤형 건강관리가 시작됩니다.
        </AlertDescription>
      </div>
      <div>
        <SurveyDrawerBtn />
      </div>
    </Alert>
  );
}
