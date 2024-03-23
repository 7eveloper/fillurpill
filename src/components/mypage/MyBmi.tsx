"use client";
import { isThereClientSession } from "@/hooks/clientSession";
import { User } from "@/store/zustandStore";
import React, { useEffect, useState } from "react";

const MyBmi = () => {
  const [myBmi, setMyBmi] = useState<User | null>(null);

  useEffect(() => {
    fetchBmi();
  }, []);
  const fetchBmi = async () => {
    try {
      const { supabase, user } = await isThereClientSession();
      const { data, error } = await supabase
        .from("survey")
        .select("*")
        .eq("user_id", user?.id || "")
        .single();
      if (error) {
        throw new Error(error.message);
      }
      setMyBmi(data);
    } catch (error) {
      console.error("Error fetching BMI:", error);
    }
  };
  console.log(myBmi);
  return (
    <div>
      <h1 className="text-[28px] pl-5 border-b-4 border-black">나의 BMI계산</h1>
      MyBmi
    </div>
  );
};

export default MyBmi;
