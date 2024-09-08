"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Coordinators = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, []);

  return <div>coordinator</div>;
};

export default WithNavbar(Coordinators);
