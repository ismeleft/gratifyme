import React from "react";
import styles from "./Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  const handleSignupLoginClick = () => {
    router.push("/?showMember=true", undefined, { shallow: true });
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            Gratify<span className={styles.logoText}>ME</span>
          </Link>
        </div>
        <div className={styles.navItem}>
          <div className={styles.diary}>
            <Link href="/diary">Diary</Link>
          </div>
          <div className={styles.signin} onClick={handleSignupLoginClick}>
            SignUp/Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
