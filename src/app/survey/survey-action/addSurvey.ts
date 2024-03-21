import { isThereClientSession } from "@/hooks/clientSession";
import { User } from "@/store/zustandStore";

export const addSurvey = async (userResult: User) => {
  const { supabase, user } = await isThereClientSession();
  const nickname = user?.user_metadata.nickname;

  if (!user) {
    console.error("로그인하지 않은 사용자는 설문조사에 참여할 수 없습니다.");
  }

  const { error } = await supabase
    .from("survey")
    .insert([{ user_id: user?.id, ...userResult, nickname }]);

  if (error) {
    console.error("사용자 설문조사 결과 저장 실패", error);
  }

  return { message: "Success" };
};
