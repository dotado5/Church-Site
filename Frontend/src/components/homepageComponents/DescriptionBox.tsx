import React from "react";

export const DescriptionBox: React.FC = () => {
  return (
    <section className=" flex xl:w-[1300px] lg:w-[1300px] sm:flex-col md:flex-col xl:h-[700px] lg:h-[700px] mx-auto mt-[4em]">
      <div>
        <h5 className="text-button font-medium xl:text-[20px] lg:text-[20px] sm:text-base md:text-base">
          PASTOR&apos;S CORNER
        </h5>
        <h1 className="xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold text-white xl:w-[565px] lg:w-[565px] ">
          Welcome to Minds of Josiah
        </h1>
        <p className="text-white text-[14px] font-normal mb-2 xl:w-[780px] lg:w-[780px]">
          It is with great pleasure and a profound sense of responsibility that
          I stand before you as the coordinator of this esteemed teens&apos;
          church. <br />
          <br />
          Here at MOJ, we recognize the unique qualities and aspirations of each
          individual, and our mission is to provide a platform for spiritual
          growth, intellectual development, and meaningful connections. <br />{" "}
          As the coordinator, my primary goal is to ensure that every member of
          the MOJ family feels welcomed, valued, and supported in their journey
          of faith. We understand the challenges that teenagers face in
          today&apos;s rapidly changing world, and we are dedicated to creating
          an environment that addresses these challenges with wisdom,
          compassion, and relevance. <br /> <br /> I encourage each of you to
          actively participate in the various programs, discussions, and
          activities that MOJ offers. Your engagement is not only welcomed but
          crucial to the vibrancy and success of our community. Feel free to
          reach out to me or our dedicated team with any questions, suggestions,
          or concerns you may have. <br /> <br /> Welcome to Minds of Josiah,
          where faith is cultivated, minds are enriched, and community thrives.
        </p>
        <span className="text-white font-medium xl:text-[20px] lg:text-[20px] sm:text-base md:text-base ">
          Sincerely
        </span>
        <br />
        <span className="xl:text-[20px] lg:text-[20px] text-button font-medium sm:text-base md:text-base">
          Dr. Oluwole Odetunmibi
        </span>
        <br />
        <span className="xl:text-[15px] lg:text-[15px] text-button font-medium sm:text-base md:text-base">
          MOJ Pastor
        </span>
      </div>
      <div className="pastorImg xl:h-[633.42px] lg:h-[633.42px] sm:h-[406px] md:h-[406px] w-full"></div>
    </section>
  );
};
