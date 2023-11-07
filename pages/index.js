import styles from "../styles/page.module.css";
import Nav from "../components/Nav/Nav";
import Section from "../components/Section/Section";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <div className={styles.homeLayout}>
      <div className={styles.headerLayout}>
        <Header />
        <Nav />
      </div>
      {/* <Section /> */}
    </div>
  );
}
