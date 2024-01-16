import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { CSSTransition } from "react-transition-group";

export default function Member() {
  const router = useRouter();
  const loginForm = useForm();
  const registerForm = useForm();
  const [showLogin, setShowLogin] = useState(false);
  const { setUserName } = useUser();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

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
          localStorage.setItem("userName", user.email);
          setUserName(user.email);

          router.push("/");
        })
        .catch((error) => {
          console.error("Login error:", error);
          setError(error.message);
          setShowError(true);
        });
    }
  };

  const onSubmitRegister = (data) => {
    const { email, password } = data;
    createUserWithEmailAndPassword(firebase.auth, email, password)
      .then((userCredential) => {
        setSuccessMessage("Signup success, please login now!");
        setShowSnackbar(true);
      })
      .catch((error) => {
        console.error("Register error:", error);
        setError(error.message);
        setShowError(true);
      });
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebase.auth, provider);
      const user = result.user;
      localStorage.setItem("userName", user.displayName || user.email);
      setUserName(user.displayName || user.email);
      router.push("/");
    } catch (error) {
      setError(error.message);
      setShowError(true);
    }
  };

  const renderErrorAlert = () => (
    <CSSTransition
      in={showError}
      timeout={300}
      classNames="fadeAlert"
      unmountOnExit
    >
      <Alert severity="error" className={styles.alert}>
        {error}
      </Alert>
    </CSSTransition>
  );

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <div className={styles.memberContainer}>
      {renderErrorAlert()}
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
              {...registerForm.register("name", {
                required: "Please enter your name",
                minLength: {
                  value: 2,
                  message: "Name needs to be at least 2 characters",
                },
              })}
            />
            <br />
            <input
              type="email"
              placeholder="email"
              defaultValue=""
              {...registerForm.register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              {...registerForm.register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password needs to be at least 6 characters",
                },
              })}
            />
            <br />
            {registerForm.formState.errors.name && (
              <div className={styles.errorMessage}>
                {registerForm.formState.errors.name.message}
              </div>
            )}
            {registerForm.formState.errors.email && (
              <div className={styles.errorMessage}>
                {registerForm.formState.errors.email.message}
              </div>
            )}
            {registerForm.formState.errors.password && (
              <div className={styles.errorMessage}>
                {registerForm.formState.errors.password.message}
              </div>
            )}
            <button type="submit" className={styles.memberformBtn}>
              Sign up
            </button>
            <p className={styles.signupHint} onClick={toggleForm}>
              Or you have account?
              <span className={styles.signupToLoginHint}>Login</span>
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
              defaultValue="test@test.com"
              {...loginForm.register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              defaultValue="test012"
              {...loginForm.register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password needs to be at least 6 characters",
                },
              })}
            />
            <br />
            {loginForm.formState.errors.email && (
              <div className={styles.errorMessage}>
                {loginForm.formState.errors.email.message}
              </div>
            )}
            {loginForm.formState.errors.password && (
              <div className={styles.errorMessage}>
                {loginForm.formState.errors.password.message}
              </div>
            )}
            <button type="submit" className={styles.memberformBtn}>
              Login
            </button>
            <p className={styles.loginHint} onClick={toggleForm}>
              Do not have account?{" "}
              <span className={styles.loginToSignupHint}>Sign up</span>
            </p>
          </form>
          <div onClick={handleClose} className={styles.closeWindow}>
            X
          </div>
        </div>
      )}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ top: "50px" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
