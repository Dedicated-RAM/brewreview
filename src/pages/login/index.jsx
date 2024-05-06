"use client";

import { useState } from "react";
import Link from "next/link";
import "../../styles/globals.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  doSignInWithEmailAndPassword,
  doSocialSignIn,
} from "../../lib/firebase/firebase";
import { useRouter } from "next/router";
//import { doSignInWithEmailAndPassword } from "../../lib/firebase/auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const validateForm = () => {
    let errorList = [];
    if (!email) errorList.push("Email is required.");
    if (!password) errorList.push("Password is required.");
    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      } catch (error) {
        if (error.message.includes("auth/invalid-credential"))
          setErrors(["Invalid Email/Password"]);
        else if (
          error.message.includes("auth/popup-closed-by-user") ||
          error.message.includes("auth/cancelled-popup-request")
        )
          setErrors(["Google Sign-in closed."]);
        else setErrors([error.message]);
      }
    }
  };

  const handleSocialSignIn = async () => {
    try {
      await doSocialSignIn();
      router.push("/");
    } catch (error) {
      if (error.message.includes("auth/invalid-credential"))
        setErrors(["Invalid Email/Password"]);
      else if (
        error.message.includes("auth/popup-closed-by-user") ||
        error.message.includes("auth/cancelled-popup-request")
      )
        setErrors(["Google Sign-in closed."]);
      else setErrors([error.message]);
    }
  };

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 flex justify-center items-center pt-3">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/3 rounded-md">
        <h1 className="text-3xl font-bold text-center text-accent-6">
          Brew Review
        </h1>
        <form className="flex flex-col gap-1 mt-4" onSubmit={handleSubmit}>
          <label className="mt-4 text-accent-6 text-2xl" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mt-4 text-accent-6 text-1xl" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <div className="flex justify-center items-center">
            <button
              className="bg-accent-5 text-accent-1 p-2 rounded-md mt-4 font-bold text-1xl w-36 mx-auto"
              type="submit"
            >
              Login
            </button>
            <button
              type="button"
              className="bg-accent-5 text-accent-1 p-2 rounded-md mt-4 font-bold text-1xl w-36 mx-auto"
              onClick={handleSocialSignIn}
            >
              Sign in with Google
            </button>
          </div>
          <div className="flex items-center justify-center p-2">
            <div className="border-b-2 border-accent-5 flex-grow mx-2"></div>
            <p>or</p>
            <div className="border-b-2 border-accent-5 flex-grow mx-2"></div>
          </div>
          <Link href="/register">
            <button className="flex justify-center bg-accent-5 text-accent-1 p-2 rounded-md font-bold w-36 text-1xl mx-auto">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
