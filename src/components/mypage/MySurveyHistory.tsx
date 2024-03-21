"use client";
import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const localizer = momentLocalizer(moment);

const MySurveyHistory = () => {
  const events = [
    {
      title: "회의",
      contents: "회의 내용",
      start: new Date(2024, 3, 1, 10, 0),
      end: new Date(2024, 3, 1, 12, 0),
    },
    {
      title: "점심 약속",
      contents: "점심 약속 내용",
      start: new Date(2024, 3, 2, 12, 0),
      end: new Date(2024, 3, 2, 14, 0),
    },
  ];
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dayMaxEvents={true}
    />
  );
};

export default MySurveyHistory;
