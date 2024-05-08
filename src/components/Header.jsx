import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase/FirebaseConfig";
import Link from "next/link";
import "../styles/globals.css";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setUser(authUser ? authUser : null);
    });
  }, [user, auth]);

  return (
    <header>
      <div className="navbar bg-accent-3 font-short-stack flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="btn btn-ghost text-4xl bg-accent-6 text-accent-2"
          >
            Brew Review
          </Link>
          <Link href="/group/list" className="btn btn-ghost text-xl">
            View Groups
          </Link>
          {user && (
            <Link href="/group/create" className="btn btn-ghost text-xl">
              Create Groups
            </Link>
          )}
        </div>

        <div className="dropdown dropdown-end dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="text-3xl bg-accent-3 border-0 flex"
          >
            ⠇
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 mt-1 shadow bg-accent-1 rounded-box w-30"
          >
            <li>
              {!user && (
                <Link href="/login" className="btn btn-ghost text-lg ml-auto">
                  Login
                </Link>
              )}
              {user && (
                <Link href="/logout" className="btn btn-ghost text-lg ml-auto">
                  Logout
                </Link>
              )}
            </li>
            
              {user && (
                <li>
                <Link href="/profile" className="btn btn-ghost text-lg ml-auto">
                  Profile
                </Link>
                </li>
              )}
            
          </ul>
        </div>
      </div>
    </header>
  );
}
