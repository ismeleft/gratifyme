import React from "react";
import Image from "next/image";
import styles from "../Section/Section.module.css";

const Section = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <section className={styles.sectionLeft}>
          <Image
            src="/images/writting.svg"
            width={300}
            height={300}
            alt="Picture of the author"
          />
        </section>
        <section className={styles.sectionRight}>
          <p className={styles.slogan}>
            Gather the power of gratitude with GratifyME—your personal
            journaling experience
          </p>
          <p className={styles.sloganNext}>
            Embrace positivity and share your happy moments.
          </p>
          <button className={styles.joinUs}>Join us</button>
        </section>
      </div>
    </section>
  );
};

export default Section;
