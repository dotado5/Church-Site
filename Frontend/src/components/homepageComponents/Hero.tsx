import React from "react";
import { PageHeader } from "../PageHeader";
import { Button } from "../Button";
import HeroImage, { HeroImageProps } from "../HeroImage";

const Hero: React.FC = () => {
  const images: HeroImageProps[] = [
    {
      src: "/images/Group1.svg",
      className:
        "absolute top-[-1em] right-[223px] sm:top-[32%] sm:right-[-0.5em] md:top-[32%] md:right-[-0.5em]",
    },
    {
      src: "/images/Group3.svg",
      className:
        "absolute bottom-[-1%] left-[30%] sm:bottom-[43%] sm:left-[15%] md:bottom-[43%] md:left-[6%]",
    },
    {
      src: "/images/Group4.svg",
      className:
        "absolute top-[18%] left-[12%] sm:top-[27%] sm:left-0 md:top-[27%] md:left-0",
    },
    {
      src: "/images/Group5.svg",
      className:
        " absolute right-[50%] top-[2em] sm:top-[12%] sm:right-[48%] md:top-[12%] md:right-[48%]",
    },
    {
      src: "/images/Group6.svg",
      className:
        "absolute bottom-[25%] right-[10%] sm:bottom-[8%] sm:right-[5%] md:bottom-[8%] md:right-[15%]",
    },
  ];

  return (
    <div className="relative flex flex-col items-center gap-5">
      {images.map((image, index) => (
        <HeroImage src={image.src} className={image.className} key={index} />
      ))}
      <PageHeader
        title={" Minds Of Josiah: Where Teens Sparkle and Faith Shines!"}
        description={
          " At MOJ, we believe in the unique potential that resides within every teenager. MOJ is not just a church—it's a community where teens soar to new heights. Our mission is to create an environment where teens can thrive intellectually, emotionally, and spiritually."
        }
        yellowText={false}
        className="mt-[6em]"
      />
      <Button content={"Become a Member"} icon={true} />
    </div>
  );
};

export default Hero;
