import React from "react";
import styles from "./Nav.module.css";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            {/* <Image
              src="/images/diaryIcon.png"
              width={50}
              height={50}
              alt="icon"
            /> */}
            Gratify<span className={styles.logoText}>ME</span>
          </Link>
        </div>
        <div className={styles.navItem}>
          <div className={styles.diary}>
            <Link href="/diary">Diary</Link>
          </div>
          <div className={styles.signin}>SignUp/Login</div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
