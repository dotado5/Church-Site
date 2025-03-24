"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const pages = [
  { name: "Home", path: "/" },
  { name: "Activities", path: "/activities" },
  { name: "Articles", path: "/articles" },
  { name: "Coordinators", path: "/coordinators" },
  { name: "Memories", path: "/memories" },
];

const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    setCurrentAddress(pathName);
  }, [pathName]);

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Admin Panel</h2>
      <nav>
        {pages.map((page) => (
          <button
            key={page.path}
            onClick={() => router.push(page.path)}
            className={`block w-full text-left py-2 px-4 hover:bg-gray-700 rounded mb-2 ${
              currentAddress === page.path && "bg-gray-700 "
            }`}
          >
            {page.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
