import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Nav = () => {
  const router = useRouter();
  const [islogin, setIsLogin] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogin(!!user); // 如果user对象存在，设置isLoggedIn为true，否则为false
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

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
          {islogin ? (
            <div className={styles.diary}>
              <Link className={styles.diaryLink} href="/diary">
                Diary
              </Link>
            </div>
          ) : (
            <div className={styles.diary} onClick={handleSignupLoginClick}>
              Diary
            </div>
          )}

          {islogin ? (
            <div className={styles.logout} onClick={handleLogout}>
              LogOut
            </div>
          ) : (
            <div className={styles.signin} onClick={handleSignupLoginClick}>
              SignUp/Login
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
