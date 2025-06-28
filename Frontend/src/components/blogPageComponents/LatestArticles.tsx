import React from "react";
import { articles } from "../homepageComponents/LatestArticles";
import { Article } from "../Article";
import { Article as ArticleType } from "@/types/dataTypes";
import Loader from "../Loader/Loader";

const LatestArticles = ({
  fetchArticles,
}: {
  fetchArticles: ArticleType[];
}) => {
  if (fetchArticles.length === 0) {
    return <Loader text={""} textColor={"mt-[2em]"} />;
  }
  return (
    <div className="flex flex-col items-start gap-[48px] mb-[128px]">
      <h3 className="text-white text-[42px] font-bold">Latest Articles</h3>
      <div className="grid grid-cols-2 w-full gap-[20px] gap-y-[40px]">
        {articles.slice(0, 3).map((article, index) => (
          <Article
            src={"/images/Frame.png"}
            title={fetchArticles[index].title}
            author={article.author}
            description={fetchArticles[index].text.slice(0, 100)}
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
