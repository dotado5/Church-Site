import Image from "next/image";
import React from "react";

export interface CoordinatorsBoxProps {
  img: any;
  name: string;
  position: string;
  number: string;
}

const CoordinatorsBox: React.FC<CoordinatorsBoxProps> = ({
  img,
  name,
  number,
  position,
}) => {
  // Handle image URL to ensure it loads from frontend static assets
  const getImageSrc = (imagePath: string) => {
    // If it's already a full URL, use as-is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it starts with /images/, it's a local static asset - use as-is
    if (imagePath.startsWith('/images/')) {
      return imagePath;
    }
    
    // If it's just a filename, add the /images/ prefix
    if (!imagePath.startsWith('/')) {
      return `/images/${imagePath}`;
    }
    
    return imagePath;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Fallback to a default coordinator image or placeholder
    target.src = "/images/pastor.svg";
  };

  return (
    <div className="relative h-[440px] sm:h-[250px] md:h-[250px] w-full">
      <img 
        src={getImageSrc(img)} 
        alt={`${name} - ${position}`} 
        className="object-cover w-full h-full"
        onError={handleImageError}
        loading="lazy"
      />
      <div className="absolute bottom-[0px] z-[999] bg-black w-full py-[16px] pl-[8px]">
        <h4 className="text-white text-[20px] sm:text-base md:text-base font-medium">
          {name}
        </h4>
        <p className="text-[#BFBFBF] text-[20px] sm:text-base md:text-base font-medium">
          {position}
        </p>
        <p className="text-[#BFBFBF] text-[20px] sm:text-base md:text-base font-medium">
          {number}
        </p>
      </div>
    </div>
  );
};

export default CoordinatorsBox;
