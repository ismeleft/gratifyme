import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import Image from "next/image";
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

  // 創建一個本地狀態來存儲 userName
  const [userName, setUserName] = useState(userNameFromContext);

  useEffect(() => {
    // 確保代碼在瀏覽器端執行
    if (typeof window !== "undefined") {
      // 從 localStorage 獲取用戶名
      const storedUserName = localStorage.getItem("userName");
      //加了console.log就可以順利印出email
      console.log(storedUserName);
      setUserName(storedUserName);
    }
  }, []);
  // 新增這個 useEffect 來響應 userNameFromContext 的改變
  useEffect(() => {
    if (userNameFromContext) {
      setUserName(userNameFromContext);
    }
  }, [userNameFromContext]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // 清除 localStorage 中的用戶名
      localStorage.removeItem("userName");
      setUserName(""); // 重置 userName 狀態
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
