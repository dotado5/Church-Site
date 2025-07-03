import React from "react";
import CoordinatorsBox from "../CoordinatorsBox";
import { Coordinator } from "@/types/dataTypes";

interface CoordinatorsSpotlightProps {
  coordinators: Coordinator[];
}

const CoordinatorsSpotlight: React.FC<CoordinatorsSpotlightProps> = ({ coordinators }) => {
  return (
    <div className="flex flex-col items-center gap-[48px] mb-[128px] w-full">
      <div className="flex flex-col items-center gap-[16px]">
        <h1 className="text-white text-[65px] sm:text-[36px] md:text-[42px] font-bold text-center">
          Coordinators Spotlight
        </h1>
        <p className="text-[22px] text-white text-center sm:text-base md:text-base">
          Shining a Light on the Remarkable Contributions of Our MOJ
          Coordinators
        </p>
      </div>

      {coordinators.length > 0 ? (
        <div className="grid grid-cols-3 gap-[20px] sm:grid-cols-2 md:grid-cols-2 w-full">
          {coordinators.map((coordinator, index) => (
            <CoordinatorsBox
              img={coordinator.image_url}
              name={coordinator.name}
              position={coordinator.occupation}
              number={coordinator.phone_number}
              key={coordinator._id || index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[16px]">
          <p className="text-white text-[18px] text-center sm:text-base md:text-base">
            No coordinators available in the spotlight at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default CoordinatorsSpotlight;
