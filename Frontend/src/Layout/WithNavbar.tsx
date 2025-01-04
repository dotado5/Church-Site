/** @format */

import { Footer } from "@/components/Footer";
import { PageLinkProps } from "@/components/Link";
import { Navbar } from "@/components/Navbar";
import { ComponentType } from "react";

// const WithNavbar = <Props extends object>(
//   WrappedComponent: ComponentType<Props>
// ) => {
//   return (props: Props) => {
//     const links: PageLinkProps[] = [
//       {
//         src: "/",
//         content: "Home",
//       },
//       {
//         src: "/coordinators",
//         content: "Coordinators",
//       },
//       {
//         src: "/blogs",
//         content: "Blogs",
//       },
//       {
//         src: "/gallery",
//         content: "Gallery",
//       },
//       {
//         src: "/contact",
//         content: "Contact",
//       },
//     ];
//     return (
//       <>
//         <Navbar links={links} />
//         <WrappedComponent {...(props as Props)} />
//       </>
//     );
//   };
// };

const WithNavbar = <Props extends object>(
  WrappedComponent: ComponentType<Props>
) => {
  const WithNavbarComponent = (props: Props) => {
    return (
      <>
        <Navbar />
        <WrappedComponent {...(props as Props)} />
      </>
    );
  };

  WithNavbarComponent.displayName = `WithNavbar(${getDisplayName(
    WrappedComponent
  )})`;

  return WithNavbarComponent;
};

function getDisplayName(WrappedComponent: ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default WithNavbar;
