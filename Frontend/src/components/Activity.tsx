import { Activity } from "@/types/dataTypes";
import React from "react";

const Activity: React.FC<Activity> = ({ date, description, name }) => {
  return (
    <div className="pb-3 border-b border-b-white">
      <h3 className="text-white font-bold xl:text-[30px] lg:text-[30px] sm:text-base md:text-base">
        {name}
      </h3>
      <h3 className="text-[#FFD600] font-bold xl:text-[30px] lg:text-[30px] sm:text-base md:text-base mb-6">
        {date}
      </h3>
      <p className="xl:text-[18px] lg:text-[18px] sm:text-base md:text-base text-[#a198ac]">
        {description}
      </p>
    </div>
  );
};

export default Activity;
