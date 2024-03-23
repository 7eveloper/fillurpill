"use client";
import { isThereClientSession } from "@/hooks/clientSession";
import { supabase } from "@/lib/supabase";
import { User, UserData, zustandStore } from "@/store/zustandStore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { alertMsg } from "@/lib/utils";

const MyInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formModified, setFormModified] = useState(false); // 양식이 수정되었는지 추적

  const fetchIntakeList = async () => {
    const { supabase, user } = await isThereClientSession();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user?.id || "")
      .single();
    if (error) {
      throw new Error(error.message);
    }
    setUser(data);
  };
  useEffect(() => {
    fetchIntakeList();
  }, [id]);

  const fetchSurveyList = async () => {
    const { supabase, user } = await isThereClientSession();
    const { data, error } = await supabase
      .from("survey")
      .select("*")
      .eq("user_id", user?.id || "")
      .single();
    if (error) {
      throw new Error(error.message);
    }
    setFormData(data);
  };
  useEffect(() => {
    fetchSurveyList();
  }, [id]);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "height" || name === "weight") {
      // 입력값이 숫자인지 확인
      if (!/^\d+$/.test(value)) {
        // 숫자가 아니면 입력하지 않음
        return;
      }
    }
    setFormData((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
    setFormModified(true); // 입력이 변경되었을 때 양식을 수정된 상태로 표시
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
    setFormModified(true); // 선택이 변경되었을 때 양식을 수정된 상태로 표시
  };
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { supabase, user } = await isThereClientSession();
    if (!user) {
      throw new Error("user 정보를 찾을수 없습니다");
    }
    const { data, error } = await supabase
      .from("users")
      .update(user)
      .eq("user_id", user?.id || "");
    if (error) {
      throw new Error(error.message);
    }
    setUser(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      isNaN(parseInt(formData?.weight || "")) ||
      parseInt(formData?.weight || "0") < 0 ||
      parseInt(formData?.weight || "0") > 200
    ) {
      alertMsg(
        "입력 오류",
        "몸무게는 숫자이어야 하며, 범위는 0 ~ 200kg여야 합니다!"
      );
      return;
    }
    const { supabase, user } = await isThereClientSession();
    const { data, error } = await supabase
      .from("survey")
      .update(formData)
      .eq("user_id", user?.id || "");
    if (error) {
      throw new Error(error.message);
    }
    setFormData(data);
    setEditMode(false);
    setFormModified(false); // 제출 후 양식 수정 상태 재설정
  };
  const handleCancelEdit = () => {
    setFormData(formData);
    setEditMode(false);
    setFormModified(false);
  };
  const isFormModified = () => {
    if (!formData || !user) return false;
    return Object.keys(formData).some(
      (key) => formData[key as keyof User] !== user[key as keyof UserData]
    );
  };
  return (
    <div className="rounded-lg w-full min-h-[700px] bg-white relative">
      <h1 className="text-[28px] pl-5 border-b-4 border-black">기본 정보</h1>
      <form onSubmit={handleUserSubmit}>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="email">
            이메일
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={user?.email || ""}
            onChange={handleInputChange}
            className="p-2 border rounded-md opacity-30" // 수정 모드에 따라 흐리게 표시
            readOnly
          />
        </div>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="nickname">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={user?.nickname || ""}
            onChange={handleUserInputChange}
            className="p-2 border rounded-md" // 수정 모드에 따라 흐리게 표시
          />
          <button type="submit">저장</button>
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="height">
            키
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData?.height || ""}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
          />
          cm
        </div>
        <div className="my-5 pl-5 pb-5 border-b-2 border-gray">
          <label className="w-[120px] inline-block" htmlFor="weight">
            몸무게
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData?.weight || ""}
            onChange={handleInputChange}
            readOnly={!editMode}
            className={`p-2 border rounded-md ${!editMode ? "opacity-30" : ""}`} // 수정 모드에 따라 흐리게 표시
          />
          kg
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
              <Button type="button" onClick={handleCancelEdit}>
                취소
              </Button>
              <Button
                className="ml-5"
                type="submit"
                disabled={!formModified || !isFormModified()}
              >
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
