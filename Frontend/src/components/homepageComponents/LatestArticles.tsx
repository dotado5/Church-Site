import React from "react";
import { Article, ArticleProps } from "../Article";

export const articles: ArticleProps[] = [
  {
    src: "/images/article1.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
  {
    src: "/images/article2.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
  {
    src: "/images/article3.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
  {
    src: "/images/article4.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
  {
    src: "/images/article5.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
  {
    src: "/images/article6.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
  {
    src: "/images/article7.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
  {
    src: "/images/article8.svg",
    title: "Youth with a Difference",
    author: "Author: Fatoki Victor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Parturient curabitur ipsum vitae ultricies vitae. Aenean arcu hac est.",
    length: "5 mins read",
    dateUploaded: "24 hours ago",
  },
];

const LatestArticles: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center mt-[3em]">
      <h6 className="text-button xl:text-[20px] lg:text-[20px] font-medium sm:text-base md:text-base">
        MOJITES THOUGHT
      </h6>
      <h1 className="text-white xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold mb-5">
        Latest Articles
      </h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 xl:gap-4 lg:gap-4 sm:gap-2 md:gap-2 ">
        {articles.map((article, index) => (
          <Article
            src={article.src}
            title={article.title}
            author={article.author}
            description={article.description}
            length={article.length}
            dateUploaded={article.dateUploaded}
            key={index}
            homePage={true}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
