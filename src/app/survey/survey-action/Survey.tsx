"use client";
import { addSurvey } from "./surveyAction";
import { User } from "@/store/zustandStore";
import { useState } from "react";

const Survey = () => {
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
        <Header text="성별" />
        <div className="mx-auto w-full flex gap-4 justify-center">
          {genderList.map((gender, idx) => (
            <SurveyDrawerFooter key={idx}>
              <Button
                onClick={() => {
                  handleClick(0, gender);
                }}
                variant="outline"
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
        <Header text="나이" />
        <div className="mx-auto w-full flex gap-6 justify-center">
          {ageList.map((age, idx) => (
            <Button
              key={idx}
              onClick={() => {
                handleClick(1, age);
              }}
              variant="outline"
            >
              {age}
            </Button>
          ))}
        </div>
      </>
    );
  }

  if (clickList[0] && clickList[1] && !clickList[2]) {
    return (
      <>
        <Header text="몸무게" />
        <div className="mx-auto w-full flex justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row w-[500px]"
          >
            <Input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mr-4"
              placeholder="kg"
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
            >
              클릭
            </Button>
          </form>
        </div>
      </>
    );
  }
  if (clickList[0] && clickList[1] && clickList[2] && !clickList[3]) {
    return (
      <>
        <Header text="키" />
        <div className="mx-auto w-full flex justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row w-[500px]"
          >
            <Input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mr-4"
              placeholder="cm"
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
            >
              클릭
            </Button>
          </form>
        </div>
      </>
    );
  }

  if (clickList.every((click) => click === true)) {
    return (
      <>
        당신은{userResult.age}입니다
        <button onClick={handleSubmit}>제출하기</button>
      </>
    );
  }
};

import { Button } from "@/components/ui/button";
import {
  SurveyDrawer,
  SurveyDrawerContent,
  SurveyDrawerDescription,
  SurveyDrawerFooter,
  SurveyDrawerHeader,
  SurveyDrawerTitle,
  SurveyDrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

export default function SurveyDrawerDemo() {
  return (
    <SurveyDrawer>
      <SurveyDrawerTrigger asChild>
        <Button variant="outline" className="w-[500px]">
          설문조사 하러가기
        </Button>
      </SurveyDrawerTrigger>

      <SurveyDrawerContent>
        <Survey />
      </SurveyDrawerContent>
    </SurveyDrawer>
  );
}

export const Header = ({ text }: { text: string }) => {
  return (
    <SurveyDrawerHeader>
      <SurveyDrawerTitle>{text}</SurveyDrawerTitle>
      <SurveyDrawerDescription>
        당신의 {text}을/를 알려주세요.
      </SurveyDrawerDescription>
    </SurveyDrawerHeader>
  );
};
