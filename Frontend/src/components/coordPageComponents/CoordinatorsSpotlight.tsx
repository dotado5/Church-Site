import React from "react";
import smith from "../../../public/images/paul_smith.png";
import CoordinatorsBox, { CoordinatorsBoxProps } from "../CoordinatorsBox";

const dummyCoords: CoordinatorsBoxProps[] = [
  { img: smith, name: "Paul Smith", position: "CEO", number: "08033785061" },
  { img: smith, name: "Paul Smith", position: "CEO", number: "08033785061" },
  { img: smith, name: "Paul Smith", position: "CEO", number: "08033785061" },
  { img: smith, name: "Paul Smith", position: "CEO", number: "08033785061" },
  { img: smith, name: "Paul Smith", position: "CEO", number: "08033785061" },
  { img: smith, name: "Paul Smith", position: "CEO", number: "08033785061" },
];

const CoordinatorsSpotlight = () => {
  return (
    <div className="flex flex-col items-center gap-[48px] mb-[128px]">
      <div className="flex flex-col items-center gap-[16px]">
        <h1 className="text-white text-[65px] sm:text-[36px] md:text-[42px] font-bold text-center">
          Coordinators Spotlight
        </h1>
        <p className="text-[22px] text-white text-center sm:text-base md:text-base">
          Shining a Light on the Remarkable Contributions of Our MOJ
          Coordinators
        </p>
      </div>

      <div className="grid grid-cols-3 gap-[20px] sm:grid-cols-2 md:grid-cols-2">
        {dummyCoords.map((coord, index) => (
          <CoordinatorsBox
            img={coord.img}
            name={coord.name}
            position={coord.position}
            number={coord.number}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CoordinatorsSpotlight;
