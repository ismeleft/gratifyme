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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      if (currentUser) {
        fetchEditedDates(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  //抓取已編輯的日記
  const fetchEditedDates = async (uid) => {
    const diaryEntriesRef = collection(
      firebase.db,
      "users",
      uid,
      "diaryEntries"
    );

    //抓取firestore的資料，根據日期抓取資料
    const querySnapshot = await getDocs(diaryEntriesRef);
    const dates = {};
    querySnapshot.forEach((doc) => {
      const dateString = doc.id.split("T")[0];
      //把日期加到dates
      dates[dateString] = true;
    });
    //更新狀態重新渲染
    setIsEditedDate(dates);
  };

  //日記上的標示
  const dayPropGetter = (date) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    //檢查是否已編輯
    if (isEditedDate[dateString]) {
      return {
        className: styles.editedDate,
      };
    }
  };

  const handleSlotSelect = (slotInfo) => {
    const { start, end } = slotInfo;
    router.push(`/editor/${end.toISOString()}`);
  };

  const handleSelect = (info) => {
    const { end } = info;
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
        onSelectEvent={handleSelect}
        onSelectSlot={handleSlotSelect}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};

export default MyCalendar;
