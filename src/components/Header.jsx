import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/globals.css";

export default function Header() {
  function useUserSession(initialUser) {
    const [user, setUser] = useState(initialUser);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged((authUser) => {
        setUser(authUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);

    useEffect(() => {
      onAuthStateChanged((authUser) => {
        if (user === undefined) return;
        if (user?.email !== authUser?.email) {
          router.refresh();
        }
      });
    }, [user]);

    return user;
  }

  return (
    <div className="navbar bg-accent-3 font-short-stack">
      <Link
        href="/"
        className="btn btn-ghost text-4xl bg-accent-6 text-accent-2"
      >
        Brew Review
      </Link>
      <Link href="/group/list" className="btn btn-ghost text-xl">
        View Groups
      </Link>
      <Link href="/group/create" className="btn btn-ghost text-xl">
        Create Groups
      </Link>
      <Link href="/login" className="btn btn-ghost text-xl ml-auto">
        Login
      </Link>
    </div>
  );
}
