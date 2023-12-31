import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className={styles.footerWrapper} role="contentinfo">
      <p className={styles.footerText}>Copyright 2023 @ GratifyME</p>
      <div className={styles.contactIcon}>
        <a href="https://github.com/ismeleft/gratifyme" target="_blank">
          <Image
            src={"/images/github.png"}
            alt="github"
            width={30}
            height={30}
          />
        </a>
        <a href="mailto:leftleft0813@gmail.com">
          <Image src={"/images/email.png"} alt="email" width={30} height={30} />
        </a>
      </div>
    </div>
  );
};
