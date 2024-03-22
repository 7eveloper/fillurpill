import { isThereClientSession } from "@/hooks/clientSession";
import { User } from "@/store/zustandStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SurveyDrawerDescription,
  SurveyDrawerFooter,
  SurveyDrawerHeader,
  SurveyDrawerTitle,
} from "@/components/ui/drawer";

export const Survey = () => {
  const [userResult, setUserResult] = useState<User>({
    gender: "",
    age: "",
    weight: "",
    height: "",
    nickname: "",
  });
  const [clickList, setClickList] = useState([false, false, false, false]);
  const genderList = ["남성", "여성"];
  const ageList = ["10대", "2-30대", "3-40대", "4-50대", "5-60대", "70대 이상"];
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await isThereClientSession();
      setUserResult({ ...userResult, nickname: user?.user_metadata.nickname });
    };
    fetchUser();
    // 처음에만 User 정보 가져오길 원해서 의존성 배열 비워 둠
  }, []);

  const handleClick = (idx: number, value: string) => {
    setClickList((prev) => {
      const newClickList = [...prev];
      newClickList[idx] = true;
      return newClickList;
    });
    setUserResult({
      ...userResult,
      [idx === 0
        ? "gender"
        : idx === 1
        ? "age"
        : idx === 2
        ? "weight"
        : "height"]: value,
    });
  };

  const handleGoBack = (idx: number) => {
    const resetIdx = idx - 1;
    setClickList((prev) => {
      const newClickList = [...prev];
      newClickList[resetIdx] = false;
      return newClickList;
    });
    setUserResult({
      ...userResult,
      [resetIdx === 0
        ? "gender"
        : resetIdx === 1
        ? "age"
        : resetIdx === 2
        ? "weight"
        : "height"]: "",
    });
  };

  const handleSubmit = async () => {
    try {
      await addSurvey(userResult);
    } catch (error) {
      console.log("저장실패!");
    }
  };

  if (!clickList[0]) {
    return (
      <>
        <Header text="성별" idx={0} handleGoBack={handleGoBack} />
        <div className="mx-auto w-full flex gap-4 justify-center h-56 px-14">
          {genderList.map((gender, idx) => (
            <SurveyDrawerFooter key={idx}>
              <Button
                onClick={() => {
                  handleClick(0, gender);
                }}
                variant="outline"
                className="h-44 text-2xl"
              >
                {gender}
              </Button>
            </SurveyDrawerFooter>
          ))}
        </div>
      </>
    );
  }
  if (clickList[0] && !clickList[1]) {
    return (
      <>
        <Header text="나이" idx={1} handleGoBack={handleGoBack} />
        <div className="mx-auto w-full flex gap-6 justify-center h-56 px-14">
          {ageList.map((age, idx) => (
            <SurveyDrawerFooter key={idx}>
              <Button
                onClick={() => {
                  handleClick(1, age);
                }}
                variant="outline"
                className="h-40 text-2xl"
              >
                {age}
              </Button>
            </SurveyDrawerFooter>
          ))}
        </div>
      </>
    );
  }

  if (clickList[0] && clickList[1] && !clickList[2]) {
    return (
      <>
        <Header text="몸무게" idx={2} handleGoBack={handleGoBack} />
        <div className="mx-auto w-full flex justify-center h-56 pt-20">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row w-[700px]"
          >
            <Input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mr-4 text-xl h-12"
              placeholder="kg"
              autoFocus
            ></Input>
            <Button
              onClick={() => {
                if (isNaN(Number(weight))) {
                  alert("숫자만 입력 가능합니다");
                } else if (!weight.length) {
                  alert("몸무게를 입력해주세요");
                } else {
                  handleClick(2, weight);
                }
              }}
              variant="outline"
              className="text-lg w-40 h-12"
            >
              Next
            </Button>
          </form>
        </div>
      </>
    );
  }
  if (clickList[0] && clickList[1] && clickList[2] && !clickList[3]) {
    return (
      <>
        <Header text="키" idx={3} handleGoBack={handleGoBack} />
        <div className="mx-auto w-full flex justify-center h-56 pt-20">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row w-[700px]"
          >
            <Input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mr-4 text-lg h-12"
              placeholder="cm"
              autoFocus
            ></Input>
            <Button
              onClick={() => {
                if (isNaN(Number(height))) {
                  alert("숫자만 입력 가능합니다");
                } else if (!height.length) {
                  alert("키를 입력해주세요");
                } else {
                  handleClick(3, height);
                }
              }}
              variant="outline"
              className="w-40 h-12 text-lg"
            >
              Next
            </Button>
          </form>
        </div>
      </>
    );
  }

  if (clickList.every((click) => click === true)) {
    return (
      <div>
        <div className="flex w-full items-center">
          <SurveyDrawerHeader>
            <SurveyDrawerTitle>
              {userResult.nickname}님의 건강정보
            </SurveyDrawerTitle>
          </SurveyDrawerHeader>
          <div className="mr-16 flex gap-4">
            <Button
              className="w-52 h-10 text-base"
              onClick={() => handleGoBack(3)}
            >
              뒤로가기
            </Button>
            <Button onClick={handleSubmit} className="w-52 h-10 text-base">
              제출하기
            </Button>
          </div>
        </div>

        <div className="flex w-full justify-center text-lg h-56 pt-28">
          <p className="text-2xl">
            <span className="font-bold">{userResult.nickname}님</span>은 몸무게{" "}
            {userResult.weight}kg, 키 {userResult.height}cm의 {userResult.age}{" "}
            {userResult.gender}
            입니다.
          </p>
        </div>
      </div>
    );
  }
};

export const Header = ({
  text,
  idx,
  handleGoBack,
}: {
  text: string;
  idx: number;
  handleGoBack: (idx: number) => void;
}) => {
  return (
    <div className="flex items-center">
      <SurveyDrawerHeader>
        <SurveyDrawerTitle>{text}</SurveyDrawerTitle>
        <SurveyDrawerDescription>
          당신의 {text}을/를 알려주세요.
        </SurveyDrawerDescription>
      </SurveyDrawerHeader>
      {text === "성별" ? null : (
        <div className="mr-16">
          <Button
            onClick={() => handleGoBack(idx)}
            className="w-52 h-10 text-base"
          >
            뒤로가기
          </Button>
        </div>
      )}
    </div>
  );
};

export const addSurvey = async (userResult: User) => {
  const { supabase, user } = await isThereClientSession();
  // const nickname = user?.user_metadata.nickname;

  // if (!user) {
  //   console.error("로그인하지 않은 사용자는 설문조사에 참여할 수 없습니다.");
  // }

  const { error } = await supabase
    .from("survey")
    .insert([{ user_id: user?.id, ...userResult }]);

  if (error) {
    console.error("사용자 설문조사 결과 저장 실패", error);
  }

  return { message: "Success" };
};
