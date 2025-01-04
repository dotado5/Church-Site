import Image from "next/image";
import React from "react";
import iframe from "../../../public/images/Figmap.png";

const IFrameBox = () => {
  return (
    <div className="mb-[128px]">
      {/* <iframe src=""></iframe> */}
      <Image src={iframe} alt={""} />
    </div>
  );
};

export default IFrameBox;
