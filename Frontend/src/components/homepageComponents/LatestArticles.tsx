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
    <div className="mx-auto flex flex-col items-center">
      <h6 className="text-button text-[20px]">MOJITES THOUGHT</h6>
      <h1 className="text-white text-[54px] font-bold mb-5">Latest Articles</h1>
      <div className="grid grid-cols-4 gap-4">
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
