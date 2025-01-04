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
        <div className=" bg-default w-[300px] h-[450px] text-white">
          <img src={src} alt="" />
          <h6 className="text-button mt-4 text-[20px]">{title}</h6>
          <p>{author}</p>
          <p>{description}</p>
          <div className="flex gap-2">
            <span className="flex gap-2">
              <img src="/images/dot.svg" alt="" /> {length}
            </span>
            <span className="flex gap-2">
              <img src="/images/dot.svg" alt="" /> {dateUploaded}
            </span>
          </div>
        </div>
      ) : (
        <div className=" bg-default w-[640px] h-[460px] text-white article">
          <Image src={src} alt="" className="w-[640px] h-[238px]" />
          <div className="w-full flex justify-between p-[16px]">
            <p className="w-[109px] h-[39px] bg-[#D0CBD6] rounded-xl text-[#43315A] text-center pt-[7px]">
              Medium
            </p>
            <p className="text-white text-[20px] w-[132px]">24 hours ago</p>
          </div>
          <h6 className="text-button mt-4 text-[30px] font-bold pl-[16px]">
            {title}
          </h6>
          <p className="font-medium text-[20px] pl-[16px]">{author}</p>
          <p className="pl-[16px]">{description}</p>
        </div>
      )}
    </>
  );
};
