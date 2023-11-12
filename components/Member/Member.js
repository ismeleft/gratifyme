import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../Member/Member.module.css";
import { useRouter } from "next/router";

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
  const onSubmit = (data) => console.log(data);

  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <div className={styles.container}>
      {!showLogin && (
        <div className={styles.signupContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.signupTitle}>Create your account</h1>
            <span className={styles.signupHint}>
              or use your email for registration
            </span>
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
              {...register("password", { required: true })}
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
            <span className={styles.loginHint}>or use your account</span>
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
              {...register("password", { required: true })}
            />
            <br />
            {errors.email && <div>Email is required.</div>}
            {errors.password && <div>Password is required.</div>}
            <button type="submit" className={styles.memberformBtn}>
              Login
            </button>
            <p className={styles.loginHint} onClick={toggleForm}>
              Don't have account? Sign up
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
