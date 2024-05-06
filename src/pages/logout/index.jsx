"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../../styles/globals.css";
import { doSignOut } from "../../lib/firebase/firebase";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  (async () => {
    await doSignOut();
    router.push("/");
  })();
}
