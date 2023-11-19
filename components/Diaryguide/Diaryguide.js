import React from "react";
import styles from "./Diaryguide.module.css";

const Diaryguide = () => {
  return (
    <div className={styles.diaryGuide}>
      <p className={styles.diaryGuideTitle}>GratifyME Instructions:</p>
      <p className={styles.diaryGuideText}>
        Please feel comfortable in this space.
        <br />
        Writing is not absolute,
        <br />
        but this tool can help you record.
        <br />
        Of course, you can also use this tool as a general life record.
      </p>
      <br />
    </div>
  );
};

export default Diaryguide;
