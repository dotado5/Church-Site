"use client";

import { withNavbar } from "@/Layout/WithNavbar";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const params = useParams();

  const pathName = usePathname();

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, []);

  return (
    <main className="flex min-h-screen flex-col  ">
      <div>Hey</div>
    </main>
  );
}

export default withNavbar(Home);
