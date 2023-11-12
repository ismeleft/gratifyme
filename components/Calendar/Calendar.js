import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendar.module.css";
import { useRouter } from "next/router";
import { collection, query } from "firebase/firestore";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  // const [markedDates, setMarkDates] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchEntries = async () => {
  //     const query = query(
  //       collection(db, "diaryEntries"),
  //       where("userId", "==", "your-user-id")
  //     );
  //     const querySnapshot = await getDocs(query);
  //     const dates = querySnapshot.docs.map((doc) => {
  //       return {
  //         ...doc.data(),
  //         date: doc.data().date.toDate(),
  //       };
  //     });
  //     setMarkDates(dates);
  //   };
  //   fetchEntries();
  // }, []);

  const handleEventClick = (event) => {
    // Handle the click on an existing event
    console.log("使用者點選了事件：", event);
    // Here you can navigate to the editor page with the event details
  };

  const handleSlotSelect = (slotInfo) => {
    // Handle the click on a blank date slot
    const { start, end } = slotInfo;
    console.log("使用者點選了日期：", start, end);
    // Navigate to the editor page with the selected date
    // Assuming you have a route like '/editor/[date]'
    router.push(`/editor/${end.toISOString()}`);
  };

  return (
    <div className={styles.myCalendarWrapper}>
      <Calendar
        className={styles.rbcCalendar}
        views={["month"]}
        style={{ height: 400, width: 450 }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleSlotSelect}
        tileClassName={({ date, view }) => {
          // 檢查是否為已編輯的日期
          if (isEdited(date)) {
            return "highlight";
          }
        }}
      />
    </div>
  );
};

export default MyCalendar;
