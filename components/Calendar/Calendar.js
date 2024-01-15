import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Calendar.module.css";
import { useRouter } from "next/router";
import firebase from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const router = useRouter();
  const [isEditedDate, setIsEditedDate] = useState({});
  const [user, setUser] = useState(null);
  const auth = getAuth();

  //確認使用者登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchEditedDates(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchEditedDates = async (uid) => {
    try {
      const diaryEntriesRef = collection(
        firebase.db,
        "users",
        uid,
        "diaryEntries"
      );
      const querySnapshot = await getDocs(diaryEntriesRef);
      const dates = {};
      querySnapshot.forEach((doc) => {
        const dateString = doc.id.split("T")[0];
        dates[dateString] = true;
      });
      setIsEditedDate(dates);
    } catch (error) {
      console.error("Error fetching edited dates:", error);
    }
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

  const handleSlotSelect = useCallback(
    (slotInfo) => {
      const { end } = slotInfo;
      router.push(`/editor/${end.toISOString()}`);
    },
    [router]
  );

  const handleSelect = useCallback(
    (info) => {
      const { end } = info;
      router.push(`/editor/${end.toISOString()}`);
    },
    [router]
  );

  return (
    <div className={styles.myCalendarWrapper}>
      <Calendar
        className={styles.rbcCalendar}
        views={["month"]}
        localizer={localizer}
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

export default React.memo(MyCalendar);
