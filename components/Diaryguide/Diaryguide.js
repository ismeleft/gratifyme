import React from "react";
import styles from "./Diaryguide.module.css";

const Diaryguide = () => {
  return (
    <div className={styles.diaryGuide}>
      <h3>Gratitude Journal Instructions:</h3>
      <p>
        Please feel comfortable in this space. Writing is not absolute, but this
        tool can help you record.
        <br />
        Of course, you can also use this tool as a general life record.
      </p>
      <br />

      {/* <h3>感恩日記可以包括以下4件事：</h3>
      <p>
        <br />
        01 感謝時刻：記錄3件值得感恩的事，記得至少要把最後一件留給自己。
        <br />
        02
        失落時刻：記錄自己失落的時刻，學著面對低潮跟挫折，搭配一句給自己打氣的安慰話語。
        <br />
        03 英雄時刻：記錄你的英雄，誰幫助了你？ 你想如何感謝對方？
        <br />
        04 「你的」英雄時刻：記錄你自己成為他人英雄的時刻，你幫助了誰？
      </p> */}
    </div>
  );
};

export default Diaryguide;
