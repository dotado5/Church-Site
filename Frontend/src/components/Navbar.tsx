"use client";

import React, { useEffect, useState } from "react";
import { PageLink, PageLinkProps } from "./Link";
import { usePathname } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";

export const Navbar = () => {
  const pathName = usePathname();
  const [currentAddress, setCurrentAddress] = useState<string | string[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathName) {
      setCurrentAddress(pathName);
    }
  }, [pathName]);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      src: "/articles",
      content: "Articles",
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
    <header className="mt-4 sm:mt-5 px-4 sm:px-6 lg:px-8 w-full relative z-50">
            
      {/* Always show this container, but change layout based on screen size */}
      <div className="flex items-center w-full">
        {/* Desktop Logo - Show from iPad size and up (explicit breakpoints) */}
        <div className="hidden md:block lg:block xl:block 2xl:block flex-shrink-0">
          <img
            src="/images/logo.svg"
            alt="MOJ Church Logo"
            className="h-12 w-auto"
          />
        </div>
        
        {/* Desktop Navigation - Show from iPad size and up (explicit breakpoints) */}
        <div className="hidden md:flex lg:flex xl:flex 2xl:flex flex-1 justify-center">
          <nav>
            <ul className="flex bg-white gap-2 px-6 py-2 rounded-full">
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
        </div>
        
        {/* Right spacer for balance - Show from iPad size and up (explicit breakpoints) */}
        <div className="hidden md:block lg:block xl:block 2xl:block flex-shrink-0 w-12"></div>

         {/* Mobile Navigation - Only show on small screens (explicit breakpoints) */}
        <nav className="flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden items-center justify-between bg-[#A198AC] rounded-full p-3 sm:p-4 w-full">
          <img 
            src="/images/mobile_icon.png" 
            alt="MOJ Mobile Icon" 
            className="h-8 w-8 sm:h-10 sm:w-10" 
          />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 touch-manipulation"
            aria-label="Open navigation menu"
          >
            <img 
              src="/images/hamburger.png" 
              alt="Menu" 
              className="h-6 w-6 sm:h-8 sm:w-8" 
            />
          </button>
        </nav>
      </div>

      {/* Menu Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Side Menu */}
      {isOpen && (
        <div className={`side-menu ${isOpen ? "open" : ""}`}>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full touch-manipulation"
            aria-label="Close navigation menu"
          >
            <IoCloseSharp className="w-6 h-6 text-[#A198AC]" />
          </button>
          
          {/* Mobile Menu Header */}
          <div className="p-6 pt-8 border-b border-white border-opacity-20">
            <div className="flex items-center gap-3">
              <img 
                src="/images/mobile_icon.png" 
                alt="MOJ" 
                className="h-10 w-10" 
              />
              <div>
                <h3 className="text-white font-semibold text-lg">Minds Of Josiah</h3>
                <p className="text-white text-opacity-80 text-sm">Where Teens Shine</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Links */}
          <ul className="flex flex-col mt-4">
            {links.map((link, index) => (
              <li key={index} className="border-b border-white border-opacity-10 last:border-b-0">
                <div onClick={handleLinkClick}>
                  <PageLink
                    src={link.src}
                    content={link.content}
                    className={`${
                      link.src === currentAddress
                        ? "bg-default text-white"
                        : "text-white hover:bg-white hover:bg-opacity-10"
                    } block py-4 px-6 text-lg transition-colors duration-200 touch-manipulation`}
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-center">
              <p className="text-white text-opacity-60 text-sm">
                © 2025 Minds Of Josiah
              </p>
              <p className="text-white text-opacity-60 text-xs mt-1">
                Building Faith, Building Community
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
