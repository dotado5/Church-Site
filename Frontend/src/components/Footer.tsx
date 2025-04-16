import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3 mt-5">
      <div className="flex gap-[8px]">
        <Link href={""}>
          <img src={"/images/instagram.png"} alt="" />
        </Link>
        <Link href={""}>
          <img src="/imgs/twitter.png" alt="" />
        </Link>
        <Link href={""}>
          <img src="/images/youtube.png" alt="" />
        </Link>
      </div>
      <h3 className="text-white xl:text-[18px] lg:text-[18px] sm:text-sm md:text-sm">
        Copyright MOJ {new Date().getFullYear()}. All right Reserved.
      </h3>
    </div>
  );
};
