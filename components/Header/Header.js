import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Gather the power of gratitude with GratifyME</h1>
      <p className={styles.slogan}>
        Embrace positivity <br />
        and share your happy moments.
      </p>
      <div className={styles.joinUs}>
        Sign up and start your personal journaling experience.
      </div>
      <div className={styles.line}>
        <button>Join us</button>
      </div>
    </div>
  );
};

export default Header;
