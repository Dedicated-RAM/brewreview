"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../../styles/globals.css";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebase/FirebaseConfig";
import { useRouter } from "next/router";
//import { doSignInWithEmailAndPassword } from "../../lib/firebase/auth.js";

export default function Logout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) setUser(authUser);
    });
  }, []);

  const router = useRouter();

  if (!user) {
    return <p>You were not logged in!</p>;
  } else {
    signOut(auth).then(() => {
      router.push("/");
    });
  }
}
