import React from "react";
import Nav from "../components/Nav/Nav";
import MyCalendar from "../components/Calendar/Calendar";
import Diaryguide from "@/components/Diaryguide/Diaryguide";
import styles from "../styles/page.module.css";
// import dynamic from "next/dynamic";

// const DynamicCalendar = dynamic(() => import("../components/Calendar"), {
//   ssr: false,
// });
const diary = () => {
  return (
    <>
      <Nav />
      <div className={styles.diaryLayout}>
        <Diaryguide />
        <MyCalendar />
      </div>
    </>
  );
};

export default diary;
