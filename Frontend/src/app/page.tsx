"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import Activities from "@/components/homepageComponents/Activities";
import { DescriptionBox } from "@/components/homepageComponents/DescriptionBox";
import Hero from "@/components/homepageComponents/Hero";
import LatestArticles from "@/components/homepageComponents/LatestArticles";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const pathName = usePathname();

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col mb-10">
        <Hero />
        <section className="xl:w-[1300px] xl:h-[700px] lg:w-[1300px] lg:h-[700px] mx-auto mt-5">
          <Image src="/images/groupPic.svg" alt="" className="w-full h-full" />
        </section>
        <DescriptionBox />
        <LatestArticles />
        <Activities />
        <Footer />
      </div>
    </main>
  );
}

export default WithNavbar(Home);
