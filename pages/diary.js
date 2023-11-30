import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav from "../components/Nav/Nav";
import MyCalendar from "../components/Calendar/Calendar";
import Diaryguide from "@/components/Diaryguide/Diaryguide";
// import MobileBackground from "@/components/MobileBackground/MobileBackground";
import styles from "../styles/page.module.css";

const Diary = () => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router, auth]);

  return (
    <div className={styles.diaryWrapper}>
      <Nav className={styles.diaryNav} />
      {/* <MobileBackground className={styles.mobileBackground} /> */}
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
    </div>
  );
};

export default Diary;
