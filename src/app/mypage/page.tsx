import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/TabNavigation";
import MyInfo from "@/components/mypage/MyInfo";
import MyIntakeHistory from "@/components/mypage/MyIntakeHistory";
import MySurveyHistory from "@/components/mypage/MySurveyHistory";

const MyPage = () => {
  return (
    <div className="w-[1500px] mx-auto">
      <Tabs defaultValue="내 정보 관리" className="flex">
        <TabsList className="flex flex-col w-[200px]">
          <TabsTrigger value="내 정보 관리">내 정보 관리</TabsTrigger>
          <TabsTrigger value="나의 섭취 이력">나의 섭취 이력</TabsTrigger>
          <TabsTrigger value="내 설문조사 이력">내 설문조사 이력</TabsTrigger>
        </TabsList>
        <TabsContent value="내 정보 관리">
          <MyInfo />
        </TabsContent>
        <TabsContent value="나의 섭취 이력">
          <MyIntakeHistory />
        </TabsContent>
        <TabsContent value="내 설문조사 이력">
          <MySurveyHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyPage;
