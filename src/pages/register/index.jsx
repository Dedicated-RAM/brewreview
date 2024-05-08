"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../styles/globals.css";
import { doCreateUserWithEmailAndPassword } from "../../lib/firebase/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const validateForm = () => {
    let errorList = [];
    if (!email) errorList.push("Email is required.");
    if (!username) errorList.push("Username is required.");
    if (!password) errorList.push("Password is required.");
    if (!confirmPassword) errorList.push("Confirm Password is required.");
    if (password !== confirmPassword) errorList.push("Passwords do not match.");
    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await doCreateUserWithEmailAndPassword(email, password, username);
        router.push("/");
      } catch (error) {
        if (error.message.includes("auth/weak-password"))
          setErrors(["Password should be at least 6 characters."]);
        else setErrors([error.message]);
      }
    }
  };

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 flex justify-center items-center pt-3 overflow-y-auto">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/3 rounded-md">
        <h1 className="text-4xl font-bold text-center text-accent-6">
          Register
        </h1>
        <form className="flex flex-col gap-1 mt-4" onSubmit={handleSubmit}>
          <label className="mt-4 text-accent-6 text-1xl" htmlFor="email">
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

          <label className="mt-4 text-accent-6 text-1xl" htmlFor="username">
            Username
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <label
            className="mt-4 text-accent-6 text-1xl"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <div className="flex justify-center items-center space-x-4">
            <button
              className="bg-accent-5 text-accent-1 p-2 rounded-md mt-4 font-bold text-1xl w-36 mx-auto"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="flex items-center justify-center p-2">
            <div className="border-b-2 border-accent-5 flex-grow mx-2"></div>
            <p>or</p>
            <div className="border-b-2 border-accent-5 flex-grow mx-2"></div>
          </div>
          <Link href="/login">
            <button className="flex justify-center bg-accent-5 text-accent-1 p-2 rounded-md font-bold w-36 text-1xl mx-auto">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
