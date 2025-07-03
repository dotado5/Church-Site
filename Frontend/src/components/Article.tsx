import Image from "next/image";
import React from "react";
import { ArticleWithAuthor } from "@/types/dataTypes";
import Link from "next/link";

export interface ArticleProps {
  src: any;
  title: string;
  author: string;
  description: string;
  length: string;
  dateUploaded: string;
  homePage?: boolean;
}

interface EnhancedArticleProps {
  article: ArticleWithAuthor;
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
          <img src={src} alt="" className="w-full" />
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
              <img
                src="/images/dot.svg"
                alt=""
                className="sm:w-[5px] sm:h-[5px]"
              />{" "}
              {length}
            </span>
            <span className="flex gap-2 sm:text-[10px] md:text-[10px] sm:items-center md:items-center">
              <img
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
          <img
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

export const EnhancedArticle: React.FC<EnhancedArticleProps> = ({
  article,
  homePage = false,
}) => {
  const authorName = article.author 
    ? `Author: ${article.author.fullName}` 
    : "Unknown Author";

  return (
    <>
      {homePage ? (
        <Link href={`/blogs/${article._id}`} className="block">
          <div className=" bg-default xl:w-[300px] lg:w-[300px] xl:h-[450px] lg:h-[450px] text-white article-box cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
            <img 
              src={article.displayImage} 
              alt={article.title} 
              className="w-full h-[200px] object-cover" 
            />
            <div className="p-2">
              <h6 className="text-button mt-4 xl:text-[20px] lg:text-[20px] sm:text-base md:text-base sm:px-2 md:px-2 line-clamp-2">
                {article.title}
              </h6>
              <p className="sm:px-2 md:px-2 sm:text-[12px] md:text-[12px] text-[#BFBFBF]">
                {authorName}
              </p>
              <p className="sm:px-2 md:px-2 sm:text-[12px] md:text-[12px] line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex gap-2 sm:gap-1 md:gap-1 sm:flex-col md:flex-col mt-3 sm:px-2 md:px-2">
                <span className="flex gap-2 sm:text-[10px] md:text-[10px] sm:items-center md:items-center">
                  <img
                    src="/images/dot.svg"
                    alt=""
                    className="sm:w-[5px] sm:h-[5px]"
                  />{" "}
                  {article.estimatedReadTime}
                </span>
                <span className="flex gap-2 sm:text-[10px] md:text-[10px] sm:items-center md:items-center">
                  <img
                    src="/images/dot.svg"
                    alt=""
                    className="sm:w-[5px] sm:h-[5px]"
                  />{" "}
                  {article.timeAgo}
                </span>
              </div>
              <div className="mt-3 sm:px-2 md:px-2">
                <span className="text-[#FFD600] text-sm font-medium hover:underline">
                  Read More →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/blogs/${article._id}`} className="block">
          <div className=" bg-default xl:w-[640px] xl:h-[460px] lg:w-[640px] lg:h-[460px] text-white article-box cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
            <img
              src={article.displayImage}
              alt={article.title}
              className="xl:w-[640px] xl:h-[238px] lg:w-[640px] lg:h-[238px] h-[150px] object-cover"
            />
            <div className="w-full flex justify-between p-[16px] sm:pb-0 md:pb-0 md:flex-col sm:flex-col">
              <p className="w-[109px] h-[39px] sm:h-auto md:h-auto sm:pt-0 md:pt-0 bg-[#D0CBD6] rounded-xl text-[#43315A] text-center pt-[7px]">
                Medium
              </p>
              <p className="text-white text-[20px] w-[132px] sm:text-base md:text-base">
                {article.timeAgo}
              </p>
            </div>
            <h6 className="text-button mt-4 sm:mt-1 md:mt-1 text-[30px] sm:text-base md:text-base font-bold pl-[16px]">
              {article.title}
            </h6>
            <p className="font-medium text-[20px] pl-[16px] sm:text-[12px] md:text-[12px] text-[#BFBFBF]">
              {authorName}
            </p>
            <p className="pl-[16px] sm:text-[12px] md:text-[12px]">
              {article.excerpt}
            </p>
            <div className="flex gap-2 mt-2 pl-[16px]">
              <span className="flex gap-2 text-[12px] items-center text-[#BFBFBF]">
                <img
                  src="/images/dot.svg"
                  alt=""
                  className="w-[5px] h-[5px]"
                />{" "}
                {article.estimatedReadTime}
              </span>
              <span className="flex gap-2 text-[12px] items-center text-[#BFBFBF]">
                <img
                  src="/images/dot.svg"
                  alt=""
                  className="w-[5px] h-[5px]"
                />{" "}
                {article.formattedDate}
              </span>
            </div>
            <div className="mt-3 pl-[16px]">
              <span className="text-[#FFD600] text-sm font-medium hover:underline">
                Read Full Article →
              </span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
