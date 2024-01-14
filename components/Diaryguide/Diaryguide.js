import React from "react";
import styles from "./Diaryguide.module.css";

const Diaryguide = () => {
  return (
    <section className={styles.diaryGuide}>
      <div>
        <p className={styles.diaryGuideTitle}>GratifyME Instructions:</p>
        <p className={styles.diaryGuideText}>
          Please feel comfortable in this space.
          <br />
          Writing is not mandatory,
          <br />
          but this tool can assist you in recording.
          <br />
          Of course, you may also use this tool for general life record.
        </p>
      </div>
    </section>
  );
};

export default Diaryguide;
