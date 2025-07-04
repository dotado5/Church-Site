import React from "react";
import { PageHeader } from "../PageHeader";
import { Button } from "../Button";
import HeroImage, { HeroImageProps } from "../HeroImage";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

const Hero: React.FC = () => {
  const images: HeroImageProps[] = [
    {
      src: "/images/Group1.svg",
      className:
        "absolute top-8 right-8 sm:top-[25%] sm:right-4 md:top-[20%] md:right-8 lg:top-[-1em] lg:right-[223px]",
      floatAnimation: "float-wave",
      delay: "float-delay-1",
    },
    {
      src: "/images/Group3.svg",
      className:
        "absolute bottom-[35%] left-4 sm:bottom-[40%] sm:left-8 md:bottom-[35%] md:left-12 lg:bottom-[-1%] lg:left-[30%]",
      floatAnimation: "float-drift",
      delay: "float-delay-2",
    },
    {
      src: "/images/Group4.svg",
      className:
        "absolute top-[20%] left-2 sm:top-[25%] sm:left-4 md:top-[22%] md:left-6 lg:top-[18%] lg:left-[12%]",
      floatAnimation: "float-bounce",
      delay: "float-delay-3",
    },
    {
      src: "/images/Group5.svg",
      className:
        "absolute top-[8%] right-[45%] sm:top-[12%] sm:right-[40%] md:top-[10%] md:right-[42%] lg:right-[50%] lg:top-[2em]",
      floatAnimation: "float-sway",
      delay: "float-delay-4",
    },
    {
      src: "/images/Group6.svg",
      className:
        "absolute bottom-[15%] right-2 sm:bottom-[20%] sm:right-4 md:bottom-[18%] md:right-6 lg:bottom-[25%] lg:right-[10%]",
      floatAnimation: "float-spiral",
      delay: "float-delay-5",
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative flex flex-col items-center gap-4 sm:gap-5 lg:gap-5 px-4 sm:px-6 lg:px-0">
          {images.map((image, index) => (
            <HeroImage
              src={image.src}
              className={image.className}
              floatAnimation={image.floatAnimation}
              delay={image.delay}
              key={index}
            />
          ))}
          <PageHeader
            title={" Minds Of Josiah: Where Teens Sparkle and Faith Shines!"}
            description={
              " At MOJ, we believe in the unique potential that resides within every teenager. MOJ is not just a church—it's a community where teens soar to new heights. Our mission is to create an environment where teens can thrive intellectually, emotionally, and spiritually."
            }
            yellowText={false}
            className="mt-16 sm:mt-20 md:mt-24 lg:mt-[6em] max-w-6xl"
          />
          <div className="mt-4 sm:mt-6">
            <Button content={"Become a Member"} icon={true} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hero;
