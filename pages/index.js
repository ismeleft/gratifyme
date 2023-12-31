import styles from "../styles/page.module.css";
// import Nav from "../components/Nav/Nav";
import Header from "../components/Header/Header";
import Member from "@/components/Member/Member";
import GratitudeBenefit from "@/components/GratitudeBenefit/GratitudeBenefit";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const showMember = router.query.showMember === "true";
  return (
    <>
      <div className={styles.homeLayout}>
        <div className={styles.headerLayout}>
          <Header />
        </div>
        {showMember && <Member />}
        <Image
          className={styles.mouseCursor}
          src={"/images/mouse-cursor.png"}
          alt="mouse-cursor"
          width={40}
          height={40}
        />
      </div>
      <div className={styles.middleLayout}>
        <GratitudeBenefit />
      </div>
    </>
  );
}
