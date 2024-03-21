"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { IntakeDiary } from "@/store/Intake";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addIntake, deleteIntake } from "@/lib/mypage/mutation";
import { isThereClientSession } from "@/hooks/clientSession";

// 시간대 설정

const localizer = momentLocalizer(moment);

const MyIntakeHistory = () => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const queryClient = useQueryClient();

  const fetchIntakeList = async () => {
    //supabase intake테이블을 전부 가져오는거
    const { supabase, user } = await isThereClientSession();
    const { data, error } = await supabase
      .from("intake")
      .select("*")
      .eq("user_id", user?.id);
    console.log(data);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const {
    data: intake,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["intake"],
    queryFn: fetchIntakeList,
  });

  const addIntakeMutation = useMutation({
    mutationFn: addIntake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intake"] });
    },
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const nextDay = new Date(start);
    const endDay = new Date(end);
    endDay.setDate(endDay.getDate() + 1);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedSlot({ start: nextDay, end: endDay });
    setModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (title && contents && selectedSlot) {
      try {
        await addIntakeMutation.mutateAsync({
          id: crypto.randomUUID(),
          start: selectedSlot.start,
          end: selectedSlot.end,
          title,
          contents,
        });
        setModalOpen(false);
        setSelectedSlot(null);
        setTitle("");
        setContents("");
      } catch (error) {
        console.error("Error inserting data into Supabase", error);
      }
    }
  };

  const deleteIntakeMutation = useMutation({
    mutationFn: deleteIntake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intake"] });
    },
  });
  const handleSelectEvent = async (event: IntakeDiary) => {
    const isConfirmed = window.confirm("선택한 항목을 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        // 클릭된 이벤트의 id를 가져옵니다.
        const intakeId = event.id;
        console.log("제발", intakeId);
        // 해당 id를 사용하여 삭제를 시도합니다.
        deleteIntakeMutation.mutate(intakeId);
        console.log("왜안됨", intakeId);
        console.log("Intake deleted successfully!");
      } catch (error) {
        console.error("Error deleting intake", error);
      }
    }
  };
  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2024, 2, 19),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <div>
      <h1 className="text-[28px] pl-5 border-b-4 border-black">
        나의 섭취 이력
      </h1>
      <div
        style={{
          width: "800px",
          height: "600px",
          marginLeft: "20px",
          marginTop: "30px",
        }}
      >
        <Calendar
          views={[Views.MONTH, Views.AGENDA]}
          defaultDate={defaultDate}
          selectable
          localizer={localizer}
          events={intake} // 여기서 myEvents를 사용합니다.
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          scrollToTime={scrollToTime}
          view={view} // Include the view prop
          date={date} // Include the date prop
          onView={(view) => setView(view)}
          onNavigate={(date) => {
            setDate(new Date(date));
          }}
        />
      </div>
      {modalOpen && (
        <div className="fixed top-24 w-96 z-50 flex flex-col justify-between items-center bg-white rounded-2xl shadow-xl  transition-transform duration-300 ease-out">
          <div className="flex w-full h-10 bg-gray-200 rounded-t-2xl justify-end">
            <button
              className="mr-2 font-semibold text-gray-600 border-none border-r border-gray-400 hover:text-black cursor-pointer focus:outline-none"
              onClick={() => setModalOpen(false)}
            >
              닫기
            </button>
          </div>
          <div className="w-full h-80 flex flex-col justify-between items-center">
            <input
              type="text"
              className="w-11/12 h-10 my-2 border-b border-gray-300 outline-none text-lg"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-11/12 h-36 my-2 border border-gray-300 rounded-md resize-none outline-none text-sm"
              placeholder="내용을 입력하세요"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full h-16 bg-gray-200 rounded-b-2xl flex justify-center items-center">
            <button
              className="w-20 h-10 mr-4 bg-green-900 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleModalSubmit}
            >
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIntakeHistory;
