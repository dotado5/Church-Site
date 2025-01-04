import React from "react";
import { articles } from "../homepageComponents/LatestArticles";
import { Article } from "../Article";
import frame from "../../../public/images/Frame.png";

const LatestArticles = () => {
  return (
    <div className="flex flex-col items-start gap-[48px] mb-[128px]">
      <h3 className="text-white text-[42px] font-bold">Latest Articles</h3>
      <div className="grid grid-cols-2 w-full gap-[20px] gap-y-[40px]">
        {articles.map((article, index) => (
          <Article
            src={frame}
            title={article.title}
            author={article.author}
            description={article.description}
            length={article.length}
            dateUploaded={article.dateUploaded}
            key={index}
            homePage={false}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
