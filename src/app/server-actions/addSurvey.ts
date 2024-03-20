import { User } from "@/lib/zustandStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const addSurvey = async (userResult: User) => {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("로그인하지 않은 사용자는 설문조사에 참여할 수 없습니다.");
  }

  const { data, error } = await supabase
    .from("survey")
    .insert([{ user_id: user?.id, ...userResult }]);

  if (error) {
    console.error("사용자 설문조사 결과 저장 실패", error);
  }

  return { message: "Success" };
};
