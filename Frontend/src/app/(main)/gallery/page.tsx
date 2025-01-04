"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Gallery = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return (
    <div>
      <div className="flex flex-col items-center mb-[128px]">
        <h1 className="text-[65px] font-bold text-white text-center">
          MOJ in Frames: A Visual Journey
        </h1>
        <p className="text-white text-[18px] text-center">
          Explore Memorable Moments, Events, and Celebrations Captured in Our
          Gallery.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default WithNavbar(Gallery);
