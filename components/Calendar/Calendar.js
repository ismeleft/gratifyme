import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendar.module.css";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import firebase from "@/utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const router = useRouter();
  const [isEditedDate, setIsEditedDate] = useState({});
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      if (currentUser) {
        fetchEditedDates(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);
  const fetchEditedDates = async (uid) => {
    const diaryEntriesRef = collection(
      firebase.db,
      "users",
      uid,
      "diaryEntries"
    );
    const querySnapshot = await getDocs(diaryEntriesRef);
    const dates = {};
    querySnapshot.forEach((doc) => {
      const docId = doc.id;
      const utcDate = new Date(docId);
      const localDate = new Date(
        utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
      );

      const dateString = moment(localDate).format("YYYY-MM-DD");
      dates[dateString] = true;
    });
    setIsEditedDate(dates);
  };

  const dayPropGetter = (date) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    if (isEditedDate[dateString]) {
      return {
        className: styles.editedDate,
      };
    }
  };

  const handleEventClick = (event) => {
    console.log("使用者點選了事件：", event);
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
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};

export default MyCalendar;
