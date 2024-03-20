"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { IntakeDiary } from "@/store/Intake";
import { supabase } from "@/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addIntake } from "@/lib/mypage/mutation";

// 시간대 설정
moment.locale("en");
const localizer = momentLocalizer(moment);

const MyIntakeHistory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const queryClient = useQueryClient();

  const fetchIntakeList = async () => {
    const { data, error } = await supabase.from("intake").select("*");
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
    setSelectedSlot({ start, end });
    setModalOpen(true);
  };
  const handleModalSubmit = async () => {
    if (title && contents && selectedSlot) {
      try {
        await addIntakeMutation.mutateAsync({
          intake_id: crypto.randomUUID(),
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

  const handleSelectEvent = (event: IntakeDiary) => {
    window.alert(event.title);
    window.alert(event.contents);
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
      나의 섭취 이력
      <div style={{ height: "500px", margin: "50px" }}>
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          localizer={localizer}
          events={intake} // 여기서 myEvents를 사용합니다.
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
        />
      </div>
      {modalOpen && (
        <div className="bg-red-100 p-10">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            placeholder="Contents"
          />
          <button onClick={handleModalSubmit}>Save</button>
        </div>
      )}
    </div>
  );
};

export default MyIntakeHistory;
