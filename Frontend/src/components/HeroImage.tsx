import Image from "next/image";
import React from "react";

export interface HeroImageProps {
  src: string;
  className: string;
  floatAnimation?: string;
  delay?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ 
  src, 
  className, 
  floatAnimation = "float-gentle", 
  delay = "" 
}) => {
  return (
    <img
      src={src}
      alt=""
      className={`${className} ${floatAnimation} ${delay} sm:w-[32px] sm:h-[32px] md:w-[40px] md:h-[40px] transition-all duration-300 hover:brightness-110`}
      style={{
        animationDuration: `${6 + Math.random() * 4}s`, // Random duration between 6-10s
      }}
    />
  );
};

export default HeroImage;
