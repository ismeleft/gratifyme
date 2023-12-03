import React from "react";
import styles from "./ToggleButton.module.css";

const ToggleButton = ({ isChecked, onToggle }) => {
  const handleToggle = () => {
    onToggle();
  };

  return (
    <div className={styles.toggleBtn}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle} // 這裡呼叫從Editor傳過來的onToggle函數
      />
      <span></span>
    </div>
  );
};

export default ToggleButton;
