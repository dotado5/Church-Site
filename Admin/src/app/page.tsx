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
        <div className="w-full">
          <div className="w-full flex items-center">
            <p className="w-1/2">
              It is with great pleasure and a profound sense of responsibility
              that I stand before you as the coordinator of this esteemed teens'
              church. Here at MOJ, we recognize the unique qualities and
              aspirations of each individual, and our mission is to provide a
              platform for spiritual growth, intellectual development, and
              meaningful connections. As the coordinator, my primary goal is to
              ensure that every member of the MOJ family feels welcomed, valued,
              and supported in their journey of faith. We understand the
              challenges that teenagers face in today's rapidly changing world,
              and we are dedicated to creating an environment that addresses
              these challenges with wisdom, compassion, and relevance. I
              encourage each of you to actively participate in the various
              programs, discussions, and activities that MOJ offers. Your
              engagement is not only welcomed but crucial to the vibrancy and
              success of our community. Feel free to reach out to me or our
              dedicated team with any questions, suggestions, or concerns you
              may have. Welcome to Minds of Josiah, where faith is cultivated,
              minds are enriched, and community thrives.
            </p>
            <img
              src="/images/pastor.svg"
              alt=""
              className="w-1/2 h-full object-contain"
            />
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
