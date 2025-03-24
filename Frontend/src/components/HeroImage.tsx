import Image from "next/image";
import React from "react";

export interface HeroImageProps {
  src: string;
  className: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ src, className }) => {
  return (
    <Image
      src={src}
      alt=""
      className={`${className} sm:w-[32px] sm:h-[32px] md:w-[40px] md:h-[40px]`}
    />
  );
};

export default HeroImage;
