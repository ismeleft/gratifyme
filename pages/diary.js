import React from "react";
import Nav from "../components/Nav/Nav";
import MyCalendar from "../components/Calendar/Calendar";
import Diaryguide from "@/components/Diaryguide/Diaryguide";
import styles from "../styles/page.module.css";

const diary = () => {
  return (
    <>
      <Nav />
      <div className={styles.diaryPage}>
        <div className={styles.diaryLayout}>
          <div className={styles.diaryGuide}>
            <Diaryguide />
          </div>
          <div className={styles.diaryCalendar}>
            <MyCalendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default diary;
