import { Coordinator } from "@/types/dataTypes";
import React from "react";

const CoordOfMonthBox: React.FC<Coordinator> = ({ 
  name, 
  occupation, 
  phone_number, 
  image_url, 
  about, 
  isFeatured 
}) => {
  return (
    <div className="flex flex-col items-center gap-[48px] mb-[128px] sm:mt-6 md:mt-6">
      <div className="flex flex-col items-center gap-[16px]">
        <h1 className="text-white text-[65px] sm:text-[36px] md:text-[42px] font-bold text-center">
          Coordinator of the Month
        </h1>
        <p className="text-[22px] text-white text-center sm:text-base md:text-base">
          We take pride in celebrating our coordinators which is why we
          celebrate a coordinator every month
        </p>
      </div>

      <div className="flex gap-10 sm:flex-col-reverse md:flex-col-reverse">
        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h2 className="text-white text-[32px] sm:text-[24px] md:text-[28px] font-bold">
              {name}
            </h2>
            <p className="text-[#BFBFBF] text-[20px] sm:text-[16px] md:text-[18px] font-medium">
              {occupation}
            </p>
            <p className="text-[#BFBFBF] text-[18px] sm:text-[14px] md:text-[16px] font-medium">
              {phone_number}
            </p>
          </div>
          
          <p className="text-[18px] text-white sm:text-base md:text-base leading-relaxed">
            {about}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <img 
            src={image_url} 
            alt={`${name} - Coordinator of the Month`} 
            className="object-contain max-w-[400px] max-h-[500px] sm:max-w-[300px] sm:max-h-[400px] md:max-w-[350px] md:max-h-[450px]" 
          />
        </div>
      </div>
    </div>
  );
};

export default CoordOfMonthBox;
