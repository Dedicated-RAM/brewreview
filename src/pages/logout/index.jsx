"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../../styles/globals.css";
import { doSignOut } from "../../lib/firebase/firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function Logout() {
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) router.push("/login");
      else {
        (async () => {
          await doSignOut();
          router.push("/");
        })();
      }
    });
  }, []);
}
