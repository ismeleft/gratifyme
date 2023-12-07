import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, getAuth } from "firebase/auth";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

const Nav = () => {
  const router = useRouter();
  const isLogin = useAuth();
  const auth = getAuth();
  // 從 useUser 中獲取 userName
  const { userName: userNameFromContext } = useUser();

  const [userName, setUserName] = useState(userNameFromContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userName");
      //加了console.log就可以順利印出email
      console.log(storedUserName);
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    if (userNameFromContext) {
      setUserName(userNameFromContext);
    }
  }, [userNameFromContext]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userName");
      setUserName("");
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
            <>
              <p className={styles.username}>Welcome, {userName} </p>
              <div className={styles.diary}>
                <Link className={styles.diaryLink} href="/diary">
                  Diary
                </Link>
              </div>
            </>
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
