"use client";
import { isThereClientSession } from "@/hooks/clientSession";
import { supabase } from "@/lib/supabase";
import { User, zustandStore } from "@/store/zustandStore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);

  const fetchIntakeList = async () => {
    //supabase survey테이블을 전부 가져오는거
    const { supabase, user } = await isThereClientSession();
    console.log(user);
    const { data, error } = await supabase
      .from("survey")
      .select("*")
      .eq("user_id", user?.id)
      .single();
    console.log(data);
    if (error) {
      throw new Error(error.message);
    }
    setUser(data);
    setFormData(data);
  };
  useEffect(() => {
    fetchIntakeList();
  }, [id]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData);
    e.preventDefault();
    const { supabase, user } = await isThereClientSession();
    const { data, error } = await supabase
      .from("survey")
      .update(formData)
      .eq("user_id", user?.id);
    if (error) {
      throw new Error(error.message);
    }
    setUser(data);
  };
  return (
    <div className="w-[1200px] bg-slate-400 pl-5">
      <h1>내 정보 관리</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="height">키:</label>
          <input
            type="text"
            id="height"
            name="height"
            value={formData?.height || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="weight">몸무게:</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData?.weight || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="gender">gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData?.gender || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="nickname">nickname:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData?.nickname || ""}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more fields as needed */}
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default MyInfo;
