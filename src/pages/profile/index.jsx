"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/globals.css";
import { useRouter } from "next/router";
import { doUpdateUsername } from "../../lib/firebase/firebase";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  async function updateUser() {
    const auth = getAuth();
    await auth.authStateReady();
    const user = auth.currentUser;
    if (user !== null) {
      setUsername(user.displayName);
      console.log(username);
      setEmail(user.email);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  const validateForm = () => {
    let errorList = [];
    if (!username) errorList.push("Username is required.");
    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await doUpdateUsername(inputUsername);
        setInputUsername('');
        updateUser();
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  return (
    <div className="bg-accent-1 flex font-short-stack inset-0 flex justify-center pt-3">
      <div className="m-auto p-10 bg-accent-2 rounded-lg shadow-lg w-1/3 rounded-md">
        <h1 className="text-3xl text-center font-bold text-accent-6">
          Profile
        </h1>
        <p className="text-xl pt-3 text-accent-6">Username: {username}</p>
        <p className="text-xl pt-3 text-accent-6">Email: {email}</p>
        <form className="flex flex-col gap-1 mt-4" onSubmit={handleSubmit}>
          <label className="mt-4 text-accent-6 text-2xl">Change Username</label>
          <input
            className="rounded-md border-2 border-accent-5 p-2"
            type="username"
            id="username"
            name="username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
          {errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
          <button
            className="bg-accent-5 text-accent-1 p-2 rounded-md mt-4 font-bold text-1xl w-36 mx-auto"
            type="submit"
          >
            Change Name
          </button>
        </form>
      </div>
    </div>
  );
}
