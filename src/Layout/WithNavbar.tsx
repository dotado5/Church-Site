/** @format */

import { PageLinkProps } from "@/components/Link";
import { Navbar } from "@/components/Navbar";
import { ComponentType } from "react";

export const withNavbar = <Props extends object>(
  WrappedComponent: ComponentType<Props>
) => {
  return (props: Props) => {
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
        src: "/blog",
        content: "Blog",
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
      <>
        <Navbar links={links} />
        <WrappedComponent {...(props as Props)} />
      </>
    );
  };
};
