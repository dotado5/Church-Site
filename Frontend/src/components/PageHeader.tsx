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
      className={`w-full max-w-4xl xl:max-w-5xl mx-auto text-center px-4 sm:px-6 ${className}`}
    >
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[65px] font-bold text-center leading-tight sm:leading-tight md:leading-tight lg:leading-tight mb-4 sm:mb-6">
        {title}
      </h1>
      <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-normal text-center leading-relaxed max-w-3xl mx-auto">
        {description}
        {yellowText && <span className="text-[#FFD600]"></span>}
      </p>
    </div>
  );
};
