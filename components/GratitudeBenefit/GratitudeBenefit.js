import React from "react";
import styles from "./GratitudeBenefit.module.css";
import Image from "next/image";

const GratitudeBenefitData = [
  {
    title: "Enhanced Mental Health",
    photoName: "/gratitudeBenefitIcon/mental-health.png",
    description:
      "Writing in a gratitude journal regularly can lead to an increase in positive emotions. This is because focusing on the positive aspects of your life helps to foster a more optimistic outlook. ",
  },
  {
    title: "Improved Sleep Quality",
    photoName: "/gratitudeBenefitIcon/sleepy.png",
    description:
      "Reflecting on grateful moments before bed can promote a sense of calm and contentment, which is conducive to better sleep. ",
  },
  {
    title: "Increased Self-Awareness and Personal Growth",
    photoName: "/gratitudeBenefitIcon/plant.png",
    description:
      "Keeping a gratitude journal encourages self-reflection.  This heightened self-awareness can lead to a deeper understanding of yourself, your values, and what truly makes you happy, thus promoting personal growth.",
  },
];

const GratitudeBenefit = () => {
  return (
    <div className={styles.gratitudeBenefitWrapper}>
      <h2 className={styles.gratitudeBenefitTitle}>
        Benefits of writing a gratitude journal
      </h2>
      <div className={styles.gratitudeBenefitContainer}>
        <ul className={styles.gratitudeBenefitItems}>
          {GratitudeBenefitData.map((gratitudeBenefit) => {
            return (
              <GratitudeBenefitItem
                gratitudeObj={gratitudeBenefit}
                key={gratitudeBenefit.title}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const GratitudeBenefitItem = (props) => {
  return (
    <li className={styles.gratitudeBenefitItem}>
      <Image
        className={styles.gratitudeBenefitItemImage}
        src={props.gratitudeObj.photoName}
        alt={props.gratitudeObj.title}
        width={50}
        height={50}
      />
      <div className={styles.gratitudeBenefitItemInfo}>
        <h3 className={styles.gratitudeBenefitItemTitle}>
          {props.gratitudeObj.title}
        </h3>
        <p className={styles.gratitudeBenefitItemText}>
          {props.gratitudeObj.description}
        </p>
      </div>
    </li>
  );
};

export default GratitudeBenefit;
