"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Contact = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return <div>contact</div>;
};

export default WithNavbar(Contact);
