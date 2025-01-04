import React from "react";
import Activity from "../Activity";

const Activities = () => {
  return (
    <div className="flex flex-col items-center w-[1250px] mx-auto ">
      <h6 className="text-button text-[20px]">KEEP IN LOOP WITH MOJ</h6>
      <h1 className="text-white text-[54px] font-bold mb-5">
        Activities Timeline
      </h1>

      <div className="w-full">
        <div className="w-full flex border-b-2 border-b-[#FFFFFF] pb-8">
          <h2 className="w-1/2 text-[#a198ac] font-bold text-[42px]">
            JANUARY 2024
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
