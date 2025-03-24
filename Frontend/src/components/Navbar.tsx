"use client";

import React, { useEffect, useState } from "react";
import { PageLink, PageLinkProps } from "./Link";
import { usePathname } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";

export const Navbar = () => {
  const pathName = usePathname();
  const [currentAddress, setCurrentAddress] = useState<string | string[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathName) {
      setCurrentAddress(pathName);
    }
  }, [pathName]);

  const links: PageLinkProps[] = [
    {
      src: "/",
      content: "Home",
    },
    {
      src: "/coordinators",
      content: "Coordinators",
    },
    {
      src: "/blogs",
      content: "Blogs",
    },
    {
      src: "/gallery",
      content: "Gallery",
    },
    {
      src: "/contact",
      content: "Contact",
    },
  ];

  return (
    <header className="flex items-center mt-5 sm:w-full md:w-full">
      <Image
        src="/images/logo.svg"
        alt="icon"
        className="ml-7 sm:hidden md:hidden"
      />
      <nav className="mx-[25%] sm:hidden md:hidden">
        <ul className="flex w-[550px] bg-white gap-2  pl-[5%] py-2 rounded-full">
          {links.map((link, index) => (
            <PageLink
              src={link.src}
              content={link.content}
              className={
                link.src === currentAddress ? "bg-default text-white" : ""
              }
              key={index}
            />
          ))}
        </ul>
      </nav>

      {/* mobile navbar */}
      <nav className="xl:hidden lg:hidden sm:w-full md:w-full sm:mx-auto flex items-center justify-between bg-[#A198AC] rounded-full p-2">
        <Image src="/images/mobile_icon.png" alt="" />
        <Image
          src="/images/hamburger.png"
          alt=""
          onClick={() => setIsOpen(true)}
        />
      </nav>

      {/* Menu Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {isOpen && (
        <div className={`side-menu ${isOpen ? "open" : ""}`}>
          <IoCloseSharp
            className={`absolute p-2 w-[40px] h-[40px] rounded-full close-button`}
            onClick={() => setIsOpen(false)}
          />
          <ul>
            {links.map((link, index) => (
              <PageLink
                src={link.src}
                content={link.content}
                className={
                  link.src === currentAddress
                    ? "bg-default text-white pl-[1em]"
                    : "text-white"
                }
                key={index}
              />
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
