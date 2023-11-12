import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendar.module.css";
import { useRouter } from "next/router";
import { collection, query } from "firebase/firestore";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const router = useRouter();

  const handleEventClick = (event) => {
    // Handle the click on an existing event
    console.log("使用者點選了事件：", event);
    // Here you can navigate to the editor page with the event details
  };

  const handleSlotSelect = (slotInfo) => {
    const { start, end } = slotInfo;
    console.log("使用者點選了日期：", start, end);

    router.push(`/editor/${end.toISOString()}`);
  };

  return (
    <div className={styles.myCalendarWrapper}>
      <Calendar
        className={styles.rbcCalendar}
        views={["month"]}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleSlotSelect}
      />
    </div>
  );
};

export default MyCalendar;
