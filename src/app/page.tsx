"use client";

import { withNavbar } from "@/Layout/WithNavbar";
import { DescriptionBox } from "@/components/homepageComponents/DescriptionBox";
import Hero from "@/components/homepageComponents/Hero";
import LatestArticles from "@/components/homepageComponents/LatestArticles";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const pathName = usePathname();

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, []);

  return (
    <main className="flex min-h-screen flex-col  ">
      <div>
        <Hero />
        <section className="w-[1300px] h-[700px] mx-auto mt-5">
          <img src="/images/groupPic.svg" alt="" className="w-full h-full" />
        </section>
        <DescriptionBox />
        <LatestArticles />
      </div>
    </main>
  );
}

export default withNavbar(Home);
