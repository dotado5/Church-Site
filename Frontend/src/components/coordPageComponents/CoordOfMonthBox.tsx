import Image from "next/image";
import React from "react";
import theRealBusayor from "../../../public/images/busayor.png";

const CoordOfMonthBox = () => {
  return (
    <div className="flex flex-col items-center gap-[48px] mb-[128px]">
      <div className="flex flex-col items-center gap-[16px]">
        <h1 className="text-white text-[65px] font-bold text-center">
          Coordinator of the Month
        </h1>
        <p className="text-[22px] text-white text-center ">
          We take pride in celebrating our coordinators which is why we
          celebrate a coordinator every month
        </p>
      </div>

      <div className="flex gap-10">
        <p className="text-[18px] text-white">
          Busayo is an ambitious user interface designer. who is passionate
          about creating user-friendly and visually appealing digital products.
          I am on the verge of completing a UX design course, and I’m now eager
          to showcase my skills and start building a career in the field. I have
          always been interested in design and technology, Despite the fact that
          I am now studying Crop and Environmental Protection at Ladoke Akintola
          University of Technology Ogbomosho, I learned that my actual love was
          in Design. I am enrolled in a Coursera Google UX Design Course and I
          have rapidly gained a strong foundation in user research, wireframing,
          and prototyping. As a rookie UI designer, I am eager to work on a
          variety of projects and expand my portfolio. I am particularly
          interested in designing solutions to real-world challenges and meeting
          consumer demands. I have an eye for detail and thrive in creating
          visually appealing, user-friendly designs. I'm an excellent
          communicator who enjoys collaborating with various stakeholders to
          create effective designs. I am also competent at clearly and
          persuasively conveying my concepts and thoughts to others. I've had
          the honor of working as a UI Designer for a Financial Organization and
          an Event Planning and Management Company. In each of these projects, I
          brought my abilities and passion to bear, creating designs that were
          user-friendly, visually beautiful, and effective in reaching the
          client's goals. While I’m not designing I am either at the Farm or
          working as a Project Management Team Member at nowsoundsfriday a
          subsidiary of TheRealNOW Company. I prefer to stay current on design
          trends and tools. I like reading design blogs and publications,
          attending webinars, and working on personal projects to improve my
          design capabilities. Overall, Busayo is a talented rookie UI designer
          with a passion for creating effective and user-centered designs. His
          skills, enthusiasm, and dedication makes him a valuable addition to
          any design team, and his willingness to learn and grow ensures that
          he’s always striving to improve and innovate.
        </p>
        <Image src={theRealBusayor} alt={""} />
      </div>
    </div>
  );
};

export default CoordOfMonthBox;
