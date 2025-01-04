"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import LatestArticles from "@/components/blogPageComponents/LatestArticles";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Blogs = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return (
    <div className="w-[1300px] h-[700px] mx-auto flex flex-col items-center mt-[100px] ">
      <div className="flex flex-col items-center mb-[128px]">
        <h1 className="text-[65px] font-bold text-white text-center">
          Mojites Talk Corner: Safe Space to Share, Learn, and Grow Together
        </h1>
        <p className="text-white text-[18px] text-center">
          For Media enquiries, please contact
          <span className="text-[#FFD600] ">fatokivictor2@gmail.com</span>
        </p>
      </div>
      <LatestArticles />
      <Footer />
    </div>
  );
};

export default WithNavbar(Blogs);
