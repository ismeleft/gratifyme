import React from "react";
import styles from "./ToggleButton.module.css";

const ToggleButton = ({ isChecked, onToggle, onSave }) => {
  const handleToggle = () => {
    if (isChecked) {
      onSave();
    }
    onToggle();
  };

  return (
    <div className={styles.toggleBtn}>
      <input
        id="toggleCheckbox"
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onChange={handleToggle} // 這裡呼叫從Editor傳過來的onToggle函數
      />
      <label htmlFor="toggleCheckbox" className={styles.slider}></label>
      <label htmlFor="toggleCheckbox" className={styles.toggleText}>
        {isChecked ? "edit mode" : "reading mode"}
      </label>
    </div>
  );
};

export default ToggleButton;
