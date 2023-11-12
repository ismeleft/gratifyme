import styles from "../styles/page.module.css";
import Nav from "../components/Nav/Nav";
import Header from "../components/Header/Header";
import Member from "@/components/Member/Member";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const showMember = router.query.showMember === "true";
  return (
    <div className={styles.homeLayout}>
      <div className={styles.headerLayout}>
        <Header />
        <Nav />
      </div>
      {showMember && <Member />}
    </div>
  );
}
