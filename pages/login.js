import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";

export default function Login() {
  const [show, setShow] = useState(false);
  // formik hook
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Check if the provided email and password match the stored values
    if (values.email === storedEmail && values.password === storedPassword) {
      // If login is successful, redirect to the user's page
  router.push("http://localhost:3000/homepage");
     

    } else {
      // If login fails, display an error message or handle the failure
      alert("Invalid credentials");
    }
  }
  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">
            Task Project
          </h1>
          <p className="w-3/4 mx-auto text-gray-400">Welcome to My App </p>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={(e) => {
    e.preventDefault();
    formik.handleSubmit(e);
}}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500">{formik.errors.email}</span>
          ) : (
            <></>
          )}

          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )}
          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              Sign In with Google{" "}
              <Image
                src={"/assets/google.svg"}
                alt="Google Signin"
                width="20"
                height={20}
              ></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          don't have an account yet?{" "}
          <Link className="text-blue-800" href={"/register"}>
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
}
