"use client";

import { useState } from "react";
import Link from "next/link";
import "../../styles/globals.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    let errorList = [];
    if (!username) errorList.push("Username is required.");
    if (!password) errorList.push("Password is required.");
    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert("username: " + username + "\npassword: " + password);
    }
  };

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 flex justify-center items-center pt-3">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/2 rounded-md">
        <h1 className="text-6xl font-bold text-center text-accent-6">
          Brew Review
        </h1>
        <form className="flex flex-col gap-1 mt-4" onSubmit={handleSubmit}>
          <label className="mt-4 text-accent-6 text-2xl" htmlFor="username">
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
          <label className="mt-4 text-accent-6 text-2xl" htmlFor="password">
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
          <div className="flex justify-center items-center space-x-4">
            <button
              className="bg-accent-5 text-accent-1 p-2 rounded-md mt-4 font-bold text-2xl w-56 mx-auto"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-center p-2">
            <div className="border-b-2 border-accent-5 flex-grow mx-2"></div>
            <p>or</p>
            <div className="border-b-2 border-accent-5 flex-grow mx-2"></div>
          </div>
          <Link href="/register">
            <button className="flex justify-center bg-accent-5 text-accent-1 p-2 rounded-md font-bold w-56 text-2xl mx-auto">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
