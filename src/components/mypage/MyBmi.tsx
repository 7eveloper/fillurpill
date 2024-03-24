"use client";
import { isThereClientSession } from "@/hooks/clientSession";
import { User } from "@/store/zustandStore";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const MyBmi = () => {
  const [myBmi, setMyBmi] = useState<number | null>(null); // BMI 값을 저장할 상태
  const [bmiChart, setBmiChart] = useState<Chart | null>(null); // Chart.js 객체를 저장할 상태

  useEffect(() => {
    fetchBmi(); // 컴포넌트가 마운트될 때 BMI를 가져오는 함수 호출
  }, []);
  useEffect(() => {
    if (myBmi !== null) {
      // BMI가 계산되면 차트 생성
      createBmiChart();
    }
  }, [myBmi]);
  const fetchBmi = async () => {
    try {
      const { supabase, user } = await isThereClientSession(); // 클라이언트 세션 가져오기
      const { data, error } = await supabase
        .from("survey")
        .select("*")
        .eq("user_id", user?.id || "")
        .single(); // 사용자의 BMI 데이터 가져오기
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        // BMI 데이터가 있을 때만 BMI 계산 실행
        calculateBmi(data);
      }
    } catch (error) {
      console.error("Error fetching BMI:", error);
    }
  };

  const calculateBmi = (userData: User) => {
    // 키와 몸무게가 있는 경우에만 BMI 계산 수행
    if (userData.height && userData.weight) {
      const heightInMeter = parseFloat(userData.height) / 100; // 키를 미터 단위로 변환
      const weightInKg = parseFloat(userData.weight); // 몸무게를 kg 단위로 변환
      const bmi = weightInKg / (heightInMeter * heightInMeter); // BMI 계산식 적용
      setMyBmi(bmi); // 계산된 BMI를 상태에 저장
    }
  };
  const createBmiChart = () => {
    const ctx = document.getElementById("bmiChart") as HTMLCanvasElement;
    if (ctx) {
      // 차트 생성
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["나의 BMI"],
          datasets: [
            {
              label: "BMI",
              data: [myBmi],
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      setBmiChart(chart);
    }
  };
  return (
    <div>
      <h1 className="text-[28px] pl-5 border-b-4 border-black">나의 BMI계산</h1>

      {myBmi !== null && (
        <div>
          <p>나의 BMI: {myBmi.toFixed(2)}</p>

          <p>
            {myBmi < 18.5
              ? "저체중"
              : myBmi < 23
              ? "정상"
              : myBmi < 25
              ? "과체중"
              : "비만"}
          </p>
          <canvas id="bmiChart" width={400} height={200}></canvas>
        </div>
      )}
    </div>
  );
};

export default MyBmi;
