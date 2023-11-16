import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, getAuth } from "firebase/auth";
import useAuth from "@/hooks/useAuth";

const Nav = () => {
  const router = useRouter();
  const isLogin = useAuth();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToSignupLoginPage = () => {
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
          {isLogin ? (
            <div className={styles.diary}>
              <Link className={styles.diaryLink} href="/diary">
                Diary
              </Link>
            </div>
          ) : (
            <div className={styles.diary} onClick={redirectToSignupLoginPage}>
              Diary
            </div>
          )}

          {isLogin ? (
            <div className={styles.logout} onClick={handleLogout}>
              LogOut
            </div>
          ) : (
            <div className={styles.signin} onClick={redirectToSignupLoginPage}>
              SignUp/Login
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
