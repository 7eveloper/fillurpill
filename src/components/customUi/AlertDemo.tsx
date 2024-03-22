import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isThereServerSession } from "@/hooks/serverSession";
import SurveyDrawerBtn from "@/app/survey/survey-action/SurveyDrawerBtn";

export async function AlertDemo() {
  const { session } = await isThereServerSession();
  const nickname = session?.user.user_metadata.nickname;

  return (
    <Alert className="flex justify-between">
      <RocketIcon className="h-4 w-4" />
      <div>
        <AlertTitle>설문조사를 완료해주세요!</AlertTitle>
        <AlertDescription>
          {nickname}님 만의 맞춤형 건강관리가 시작됩니다.
        </AlertDescription>
      </div>
      <div>
        <SurveyDrawerBtn />
      </div>
      {/* <SurveyDrawerBt /> */}
    </Alert>
  );
}
