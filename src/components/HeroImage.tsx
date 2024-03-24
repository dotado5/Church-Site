import React from "react";

export interface HeroImageProps {
  src: string;
  className: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ src, className }) => {
  return <img src={src} alt="" className={className} />;
};

export default HeroImage;
