import { Coordinator } from "@/types/dataTypes";
import React from "react";

const CoordOfMonthBox: React.FC<Coordinator> = ({ image_url, about }) => {
  return (
    <div className="flex flex-col items-center gap-[48px] mb-[128px] sm:mt-6 md:mt-6">
      <div className="flex flex-col items-center gap-[16px]">
        <h1 className="text-white text-[65px] sm:text-[36px] md:text-[42px] font-bold text-center">
          Coordinator of the Month
        </h1>
        <p className="text-[22px] text-white text-center sm:text-base md:text-base ">
          We take pride in celebrating our coordinators which is why we
          celebrate a coordinator every month
        </p>
      </div>

      <div className="flex gap-10 sm:flex-col-reverse md:flex-col-reverse">
        <p className="text-[18px] text-white sm:text-base md:text-base">
          {about}
        </p>
        <img src={image_url} alt={""} className="object-contain" />
      </div>
    </div>
  );
};

export default CoordOfMonthBox;
