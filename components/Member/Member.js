import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../Member/Member.module.css";
import Image from "next/image";
import firebase from "@/utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useUser } from "@/hooks/useUser";

export default function Member() {
  const router = useRouter();
  const loginForm = useForm();
  const registerForm = useForm();
  const [showLogin, setShowLogin] = useState(false);
  const { setUserName } = useUser();

  const handleClose = () => {
    router.push("/", undefined, { shallow: true });
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  const onSubmitLogin = (data) => {
    const { email, password } = data;
    if (showLogin) {
      signInWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // 儲存到 localStorage
          localStorage.setItem("userName", user.email);
          // 更新 Context 中的 userName
          setUserName(user.email);

          router.push("/");
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert(error);
        });
    }
  };

  const onSubmitRegister = (data) => {
    const { email, password } = data;
    createUserWithEmailAndPassword(firebase.auth, email, password)
      .then((userCredential) => {
        alert("Signup success, please login now!");
      })
      .catch((error) => {
        console.error("Register error:", error);
        alert(error);
      });
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebase.auth, provider);
      const user = result.user;
      console.log(user);
      localStorage.setItem("userName", user.displayName || user.email);
      setUserName(user.displayName || user.email);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.memberContainer}>
      <h1 className={styles.memberpageTitle}>
        Login and enjoy the diary journey!
      </h1>
      {!showLogin && (
        <div className={styles.signupContainer}>
          <form onSubmit={registerForm.handleSubmit(onSubmitRegister)}>
            <h1 className={styles.signupTitle}>Create your account</h1>
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogle}
            >
              <Image
                className={styles.googleImage}
                src="/images/google.png"
                alt="google-button"
                width={20}
                height={20}
              ></Image>
              Sign in with Google
            </button>
            <div className={styles.signupHint}>
              or use your email for registration
            </div>
            <br />
            <input
              type="text"
              placeholder="name"
              defaultValue=""
              {...registerForm.register("name", { required: true })}
            />
            <br />
            <input
              type="email"
              placeholder="email"
              defaultValue=""
              {...registerForm.register("email", { required: true })}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              {...registerForm.register("password", {
                required: true,
                minLength: 6,
              })}
            />
            <br />
            {registerForm.formState.errors.name && <div>Name is required.</div>}
            {registerForm.formState.errors.email && (
              <div>Email is required.</div>
            )}
            {registerForm.formState.errors.password && (
              <div>Password is required.</div>
            )}
            <button type="submit" className={styles.memberformBtn}>
              Sign up
            </button>
            <p className={styles.signupHint} onClick={toggleForm}>
              Or you have account? Login
            </p>
          </form>
          <div onClick={handleClose} className={styles.closeWindow}>
            X
          </div>
        </div>
      )}
      {showLogin && (
        <div className={styles.loginContainer}>
          <form onSubmit={loginForm.handleSubmit(onSubmitLogin)}>
            <h1 className={styles.loginTitle}>Login your account</h1>
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogle}
            >
              <Image
                className={styles.googleImage}
                src="/images/google.png"
                alt="google-button"
                width={20}
                height={20}
              ></Image>
              Continue in with Google
            </button>
            <span className={styles.loginHint}>or use your account</span>
            <br />
            <input
              type="email"
              placeholder="email"
              defaultValue=""
              {...loginForm.register("email", { required: true, minLength: 6 })}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              {...loginForm.register("password", { required: true })}
            />
            <br />
            {loginForm.formState.errors.email && <div>Email is required.</div>}
            {loginForm.formState.errors.password && (
              <div>Password is required.</div>
            )}
            <button type="submit" className={styles.memberformBtn}>
              Login
            </button>
            <p className={styles.loginHint} onClick={toggleForm}>
              Do not have account? Sign up
            </p>
          </form>
          <div onClick={handleClose} className={styles.closeWindow}>
            X
          </div>
        </div>
      )}
    </div>
  );
}
