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
  return (
    <div className="relative h-[440px]">
      <Image src={img} alt={""} className="object-cover" />
      <div className="absolute bottom-[0px] z-[999] bg-black w-full py-[16px] pl-[8px]">
        <h4 className="text-white text-[20px] font-medium">{name}</h4>
        <p className="text-[#BFBFBF] text-[20px] font-medium">{position}</p>
        <p className="text-[#BFBFBF] text-[20px] font-medium">{number}</p>
      </div>
    </div>
  );
};

export default CoordinatorsBox;