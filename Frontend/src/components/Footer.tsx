import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex">
        <Link href={""}>
          <img src={"/images/instagram.png"} alt="" />
        </Link>
        <Link href={""}>
          <img src="/images/twitter.png" alt="" />
        </Link>
        <Link href={""}>
          <img src="/images/youtube.png" alt="" />
        </Link>
      </div>
      <h3 className="text-white text-[18px]">
        Copyright MOJ 2024. All right Reserved.
      </h3>
    </div>
  );
};
