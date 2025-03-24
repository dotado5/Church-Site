import React from "react";
import Activity from "../Activity";

const Activities = () => {
  return (
    <div className="flex flex-col items-center xl:w-[1250px] lg:w-[1250px] mx-auto sm:mt-[4em] md:mt-[4em]">
      <h6 className="text-button xl:text-[20px] lg:text-[20px] sm:text-base md:text-base">
        KEEP IN LOOP WITH MOJ
      </h6>
      <h1 className="text-white xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold mb-5">
        Activities Timeline
      </h1>

      <div className="w-full">
        <div className="w-full flex border-b-2 border-b-[#FFFFFF] pb-8">
          <h2 className="w-1/2 text-[#a198ac] font-bold text-[42px] sm:hidden md:hidden">
            JANUARY 2024
          </h2>
          <h2 className="w-[43%] text-[#a198ac] font-bold text-[20px] xl:hidden lg:hidden">
            JAN 2024
          </h2>
          <div className="w-1/2 flex flex-col gap-5">
            <Activity />
            <Activity />
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
