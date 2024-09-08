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
    <div className={` w-[1000px] mx-auto text-center ${className}`}>
      <h1 className="text-white text-[65px] text-center ">{title}</h1>
      <p className="text-white text-[15px] font-normal text-center ">
        {description}
        {yellowText && <span></span>}
      </p>
    </div>
  );
};
