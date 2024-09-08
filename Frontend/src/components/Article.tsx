import React from "react";

export interface ArticleProps {
  src: string;
  title: string;
  author: string;
  description: string;
  length: string;
  dateUploaded: string;
}

export const Article: React.FC<ArticleProps> = ({
  src,
  title,
  author,
  description,
  length,
  dateUploaded,
}) => {
  return (
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
  );
};
