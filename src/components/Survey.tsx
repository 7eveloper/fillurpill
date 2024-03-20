"use client";
import { addSurvey } from "@/app/server-actions/addSurvey";
import { User } from "@/lib/zustandStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Survey = () => {
  const [userResult, setUserResult] = useState<User>({
    // email: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
  });
  // console.log(userResult);
  const [clickList, setClickList] = useState([false, false, false, false]);
  const router = useRouter();
  const genderList = ["남성", "여성"];
  const ageList = ["10대", "2-30대", "3-40대", "4-50대", "5-60대", "70대 이상"];
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  //   useEffect(() => {
  //     const fetch = async () => {
  //       const { data } = await supabase.auth.getUser();
  //       if (data) {
  //         setUserResult({ ...userResult, email: data.user?.email as string });
  //       }
  //     };
  //     fetch();
  //   }, []);

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
    return genderList.map((gender, idx) => (
      <button
        key={idx}
        onClick={() => {
          handleClick(0, gender);
        }}
      >
        {gender}
      </button>
    ));
  }
  if (clickList[0] && !clickList[1]) {
    return ageList.map((age, idx) => (
      <button
        key={idx}
        onClick={() => {
          handleClick(1, age);
        }}
      >
        {age}
      </button>
    ));
  }
  if (clickList[0] && clickList[1] && !clickList[2]) {
    return (
      <>
        <p>당신의 몸무게를 입력해주세요</p>
        <input
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        ></input>
        <button
          onClick={() => {
            if (isNaN(Number(weight))) {
              alert("숫자만 입력 가능합니다");
            } else {
              handleClick(2, weight);
            }
          }}
        >
          클릭
        </button>
      </>
    );
  }
  if (clickList[0] && clickList[1] && clickList[2] && !clickList[3]) {
    return (
      <>
        <p>당신의 키를 입력해주세요</p>
        <input
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        ></input>
        <button
          onClick={() => {
            if (isNaN(Number(height))) {
              alert("숫자만 입력 가능합니다");
            } else {
              handleClick(3, height);
            }
          }}
        >
          클릭
        </button>
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

export default Survey;
