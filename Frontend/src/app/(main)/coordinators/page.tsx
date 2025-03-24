"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import CoordOfMonthBox from "@/components/coordPageComponents/CoordOfMonthBox";
import CoordinatorsSpotlight from "@/components/coordPageComponents/CoordinatorsSpotlight";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Coordinators = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return (
    <div className="w-[1300px] h-[700px] mx-auto sm:w-full md:w-full">
      <CoordOfMonthBox />
      <CoordinatorsSpotlight />
      <Footer />
    </div>
  );
};

export default WithNavbar(Coordinators);
