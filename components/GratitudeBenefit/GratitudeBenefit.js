import React from "react";
import styles from "./GratitudeBenefit.module.css";
import Image from "next/image";
import { GratitudeBenefitData } from "./GratitudeBenefitData";

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

const GratitudeBenefitItem = ({ gratitudeObj }) => {
  const { photoName, title, description } = gratitudeObj;
  return (
    <li className={styles.gratitudeBenefitItem}>
      <Image
        className={styles.gratitudeBenefitItemImage}
        src={photoName}
        alt={title}
        width={50}
        height={50}
      />
      <div className={styles.gratitudeBenefitItemInfo}>
        <h3 className={styles.gratitudeBenefitItemTitle}>{title}</h3>
        <p className={styles.gratitudeBenefitItemText}>{description}</p>
      </div>
    </li>
  );
};

export default React.memo(GratitudeBenefit);
