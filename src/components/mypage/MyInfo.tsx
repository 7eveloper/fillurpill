"use client";
import { isThereClientSession } from "@/hooks/clientSession";
import { supabase } from "@/lib/supabase";
import { User, zustandStore } from "@/store/zustandStore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const MyInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchIntakeList = async () => {
      const { supabase, user } = await isThereClientSession();
      console.log(user);
      // 사용자 정보를 받아온 후, formData에 설정할 수 있도록 email을 formData에 추가한다.
      if (!user) {
        // 사용자가 로그인되어 있지 않은 경우
        // 여기에서 적절한 처리를 해야 합니다.
        return;
      }
      setFormData((prevState) => ({
        ...prevState!,
        email: user.email, // 여기서 email을 formData에 추가함
      }));
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
    fetchIntakeList();
  }, [id]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };
  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
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
    setEditMode(false);
  };
  return (
    <div className="rounded-lg w-full min-h-[700px] bg-white relative">
      <h1 className="text-[28px] pl-5 border-b-4 border-black">기본 정보</h1>
      <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
        <label className="w-[120px] inline-block" htmlFor="email">
          이메일
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData?.nickname || ""}
          onChange={handleInputChange}
          className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="nickname">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData?.nickname || ""}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
          />
        </div>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="height">
            키
          </label>
          <input
            type="text"
            id="height"
            name="height"
            value={formData?.height || ""}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
          />
        </div>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="weight">
            몸무게
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData?.weight || ""}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
          />
        </div>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="gender">
            성별
          </label>
          <select
            id="gender"
            name="gender"
            value={formData?.gender || ""}
            onChange={handleSelectChange}
            className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
            disabled={!editMode}
          >
            <option value="">선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="age">
            나이
          </label>
          <select
            id="age"
            name="age"
            value={formData?.age || ""}
            onChange={handleSelectChange}
            className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
            disabled={!editMode}
          >
            <option value="">선택</option>
            <option value="10대">10대</option>
            <option value="2-30대">2-30대</option>
            <option value="3-40대">3-40대</option>
            <option value="4-50대">4-50대</option>
            <option value="5-60대">5-60대</option>
            <option value="70대 이상">70대 이상</option>
          </select>
        </div>
        <div className="absolute bottom-2 right-2">
          {!editMode ? ( // 수정 모드가 아닐 때
            <Button type="button" onClick={() => setEditMode(true)}>
              수정
            </Button>
          ) : (
            // 수정 모드일 때
            <>
              <Button type="button" onClick={() => setEditMode(false)}>
                취소
              </Button>
              <Button className="ml-5" type="submit">
                저장
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
