import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const router = useRouter();
  const isLogin = useAuth();
  const handleSignupLoginClick = () => {
    router.push("/?showMember=true", undefined, { shallow: true });
  };

  const handleGoToDiary = () => {
    router.push("/diary");
  };
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
      {isLogin ? (
        <div className={styles.startHint}>
          <button className={styles.startHintBtn} onClick={handleGoToDiary}>
            start your journey
          </button>
        </div>
      ) : (
        <div className={styles.startHint}>
          <button
            className={styles.startHintBtn}
            onClick={handleSignupLoginClick}
          >
            Join us
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
