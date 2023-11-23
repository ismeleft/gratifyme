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

export default function Member() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => {
    router.push("/", undefined, { shallow: true });
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  const onSubmit = (data) => {
    const { email, password } = data;
    if (showLogin) {
      signInWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential) => {
          router.push("/");
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert(error);
        });
    } else {
      createUserWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential) => {
          alert("Sign in success, please login now!");
        })
        .catch((error) => {
          console.error("Register error:", error);
          alert(error);
        });
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(firebase.auth, provider);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.memberpageTitle}>
        Login and enjoy the diary journey!
      </h1>
      {!showLogin && (
        <div className={styles.signupContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.signupTitle}>Create your account</h1>
            <button className={styles.googleButton} onClick={handleGoogle}>
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
              {...register("name", { required: true })}
            />
            <br />
            <input
              type="email"
              placeholder="email"
              defaultValue=""
              {...register("email", { required: true })}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <br />
            {errors.name && <div>Name is required.</div>}
            {errors.email && <div>Email is required.</div>}
            {errors.password && <div>Password is required.</div>}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.loginTitle}>Login your account</h1>
            <button className={styles.googleButton} onClick={handleGoogle}>
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
              {...register("email", { required: true, minLength: 6 })}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
            <br />
            {errors.email && <div>Email is required.</div>}
            {errors.password && <div>Password is required.</div>}
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
