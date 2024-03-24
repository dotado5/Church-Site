import React, { useEffect, useState } from "react";
import { PageLink, PageLinkProps } from "./Link";

interface NavbarProps {
  links: PageLinkProps[];
}

export const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [currentAddress, setCurrentAddress] = useState<string | string[]>();

  useEffect(() => {
    const address = window.localStorage.getItem("currentAddress");
    if (address) {
      setCurrentAddress(address);
    }
  }, []);

  return (
    <header className="flex items-center mt-5">
      <img src="/images/logo.svg" alt="icon" className="ml-7" />
      <nav className="mx-[25%]">
        <ul className="flex  w-[550px] bg-white gap-2  pl-[5%] py-2 rounded-full">
          {links.map((link, index) => (
            <li
              key={index}
              className={`navLinks text-md rounded-3xl p-3  ${
                link.src === currentAddress ? "bg-default text-white" : ""
              } `}
            >
              <PageLink src={link.src} content={link.content} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
