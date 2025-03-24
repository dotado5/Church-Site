import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  yellowText: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  yellowText,
  className,
}) => {
  return (
    <div
      className={` xl:w-[1000px] lg:w-[1000px] sm:w-auto md:w-auto mx-auto text-center ${className}`}
    >
      <h1 className="text-white xl:text-[65px] lg:text-[65px] font-bold sm:text-[36px] md:text-[42px] text-center ">
        {title}
      </h1>
      <p className="text-white text-[15px] font-normal text-center ">
        {description}
        {yellowText && <span></span>}
      </p>
    </div>
  );
};
