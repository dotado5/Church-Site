"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Gallery = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, []);

  return <div>gallery</div>;
};

export default WithNavbar(Gallery);
