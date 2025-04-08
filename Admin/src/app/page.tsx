"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    setIsLoggedIn(true);
    router.push("/");
  };

  if (isLoggedIn) {
    return (
      <div className=" h-screen flex items-center justify-center flex-col">
        <h1 className="text-xl ">MOJ Admin Login</h1>
        <form
          className="bg-white p-8 shadow-lg rounded-lg"
          onSubmit={handleLogin}
        >
          <h1 className="text-2xl mb-4">Login</h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome Someone</h1>
        <div className="w-full"></div>
      </main>
    </div>
  );
}
