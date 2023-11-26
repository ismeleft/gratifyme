import styles from "./BookBackground.module.css";

export default function DiaryBookBackground() {
  return (
    <div className={styles.diaryWrapper}>
      <div className={styles.pageLeft}></div>
      <div className={styles.pageRight}></div>
    </div>
  );
}
