import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/customUi/TabNavigation";
import MyInfo from "@/components/mypage/MyInfo";
import MyIntakeHistory from "@/components/mypage/MyIntakeHistory";

const MyPage = () => {
  return (
    <div className="w-[1500px] mx-auto">
      <Tabs defaultValue="내 정보 관리" className="flex">
        <TabsList className="flex flex-col w-[200px] h-[700px] bg-green-700">
          <TabsTrigger
            className="text-white font-bold h-[50px] hover:bg-slate-400"
            value="내 정보 관리"
          >
            내 정보 관리
          </TabsTrigger>
          <TabsTrigger
            className="text-white font-bold h-[50px] hover:bg-slate-400"
            value="나의 섭취 이력"
          >
            나의 섭취 이력
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full ml-3" value="내 정보 관리">
          <MyInfo />
        </TabsContent>
        <TabsContent className="w-full ml-3" value="나의 섭취 이력">
          <MyIntakeHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyPage;
