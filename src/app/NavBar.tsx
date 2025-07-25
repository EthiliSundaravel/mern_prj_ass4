'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token/session existence (replace with your logic)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="w-full flex items-center justify-center gap-6 py-4 px-6 bg-white/80 backdrop-blur shadow-md rounded-b-2xl mb-8">
      <Link
        href="/"
        className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
      >
        Home
      </Link>
      <Link
        href="/about"
        className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
      >
        About
      </Link>

      {!isLoggedIn ? (
        <>
          <Link
            href="/login"
            className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/stock"
            className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
          >
            AI Stock Predictor
          </Link>
          <Link
            href="/logout"
            className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
          >
            Logout
          </Link>
        </>
      )}
    </nav>
  );
}
