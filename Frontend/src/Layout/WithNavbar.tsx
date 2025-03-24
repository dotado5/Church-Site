/** @format */

import { Navbar } from "@/components/Navbar";
import { ComponentType } from "react";

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
