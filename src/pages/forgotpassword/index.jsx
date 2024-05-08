"use client";

import { useState } from "react";
import Link from "next/link";
import "../../styles/globals.css";
import { doPasswordReset } from "../../lib/firebase/firebase";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const validateForm = () => {
    let errorList = [];
    if (!email) errorList.push("Email is required.");
    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await doPasswordReset(email);
        router.push("/");
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 flex justify-center items-center pt-3">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/3 rounded-md">
        <h1 className="text-3xl font-bold text-center text-accent-6">
          Forgot Password
        </h1>
        <form className="flex flex-col gap-1 mt-4" onSubmit={handleSubmit}>
          <label className="mt-4 text-accent-6 text-2xl" htmlFor="email">
            Email to reset password
          </label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <button
            className="flex justify-center bg-accent-5 text-accent-1 p-2 rounded-md font-bold w-36 text-1xl mx-auto"
            type="submit"
          >
            Send code
          </button>
        </form>
      </div>
    </div>
  );
}
