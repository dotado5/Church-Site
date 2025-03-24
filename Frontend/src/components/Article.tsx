import Image from "next/image";
import React from "react";

export interface ArticleProps {
  src: any;
  title: string;
  author: string;
  description: string;
  length: string;
  dateUploaded: string;
  homePage?: boolean;
}

export const Article: React.FC<ArticleProps> = ({
  src,
  title,
  author,
  description,
  length,
  dateUploaded,
  homePage,
}) => {
  return (
    <>
      {homePage ? (
        <div className=" bg-default xl:w-[300px] lg:w-[300px] xl:h-[450px] lg:h-[450px] text-white article-box">
          <Image src={src} alt="" className="w-full" />
          <h6 className="text-button mt-4 xl:text-[20px] lg:text-[20px] sm:text-base md:text-base sm:px-2 md:px-2">
            {title}
          </h6>
          <p className="sm:px-2 md:px-2 sm:text-[12px] md:text-[12px]">
            {author}
          </p>
          <p className="sm:px-2 md:px-2 sm:text-[12px] md:text-[12px]">
            {description}
          </p>
          <div className="flex gap-2 sm:gap-1 md:gap-1 sm:flex-col md:flex-col mt-3 sm:px-2 md:px-2">
            <span className="flex gap-2 sm:text-[10px] md:text-[10px] sm:items-center md:items-center">
              <Image
                src="/images/dot.svg"
                alt=""
                className="sm:w-[5px] sm:h-[5px]"
              />{" "}
              {length}
            </span>
            <span className="flex gap-2 sm:text-[10px] md:text-[10px] sm:items-center md:items-center">
              <Image
                src="/images/dot.svg"
                alt=""
                className="sm:w-[5px] sm:h-[5px]"
              />{" "}
              {dateUploaded}
            </span>
          </div>
        </div>
      ) : (
        <div className=" bg-default xl:w-[640px] xl:h-[460px] lg:w-[640px] lg:h-[460px] text-white article-box">
          <Image
            src={src}
            alt=""
            className="xl:w-[640px] xl:h-[238px] lg:w-[640px] lg:h-[238px] h-[150px] object-cover"
          />
          <div className="w-full flex justify-between p-[16px] sm:pb-0 md:pb-0 md:flex-col sm:flex-col">
            <p className="w-[109px] h-[39px] sm:h-auto md:h-auto sm:pt-0 md:pt-0 bg-[#D0CBD6] rounded-xl text-[#43315A] text-center pt-[7px]">
              Medium
            </p>
            <p className="text-white text-[20px] w-[132px] sm:text-base md:text-base">
              24 hours ago
            </p>
          </div>
          <h6 className="text-button mt-4 sm:mt-1 md:mt-1 text-[30px] sm:text-base md:text-base font-bold pl-[16px]">
            {title}
          </h6>
          <p className="font-medium text-[20px] pl-[16px] sm:text-[12px] md:text-[12px]">
            {author}
          </p>
          <p className="pl-[16px] sm:text-[12px] md:text-[12px]">
            {description}
          </p>
        </div>
      )}
    </>
  );
};
