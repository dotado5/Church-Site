"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Blogs = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return <div>blog</div>;
};

export default WithNavbar(Blogs);
