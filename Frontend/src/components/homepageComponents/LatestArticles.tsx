import React, { useEffect, useState } from "react";
import { EnhancedArticle } from "../Article";
import { Article as ArticleType, ArticleWithAuthor } from "@/types/dataTypes";
import { useArticles } from "@/hooks/useArticles";
import { fetchData } from "@/utils/fetchData";
import Loader from "../Loader/Loader";

const LatestArticles = ({
  fetchArticles,
}: {
  fetchArticles: ArticleType[];
}) => {
  const { getAllArticlesWithAuthors } = useArticles();
  const [enhancedArticles, setEnhancedArticles] = useState<ArticleWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnhancedArticles();
  }, []);

  async function fetchEnhancedArticles() {
    try {
      setLoading(true);
      const articlesResponse = await fetchData(() => getAllArticlesWithAuthors(1, 4));

      if (articlesResponse?.status === 200) {
        setEnhancedArticles(articlesResponse.data.data as ArticleWithAuthor[]);
      }
    } catch (error) {
      console.error("Error fetching enhanced articles:", error);
      // Fallback: use the passed articles if enhanced fetch fails
      const fallbackArticles: ArticleWithAuthor[] = fetchArticles.slice(0, 4).map((article, index) => ({
        _id: `fallback-${index}`,
        displayImage: article.displayImage || "/images/Frame.png",
        title: article.title,
        authorId: article.authorId,
        author: {
          _id: "unknown",
          firstName: "Unknown",
          lastName: "Author",
          fullName: "Unknown Author",
          profileImage: "/images/Frame.png",
        },
        text: article.text,
        excerpt: article.text.substring(0, 100) + "...",
        date: article.date,
        formattedDate: new Date(article.date).toLocaleDateString(),
        timeAgo: "Recently",
        readTime: article.readTime,
        estimatedReadTime: "5 mins read",
      }));
      setEnhancedArticles(fallbackArticles);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader text="" textColor="mt-[2em]" />;
  }

  if (enhancedArticles.length === 0) {
    return <Loader text="" textColor="mt-[2em]" />;
  }

  return (
    <div className="mx-auto flex flex-col items-center mt-[3em]">
      <h6 className="text-button xl:text-[20px] lg:text-[20px] font-medium sm:text-base md:text-base">
        MOJITES THOUGHT
      </h6>
      <h1 className="text-white xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold mb-5">
        Latest Articles
      </h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 xl:gap-4 lg:gap-4 sm:gap-2 md:gap-2 ">
        {enhancedArticles.map((article) => (
          <EnhancedArticle
            key={article._id}
            article={article}
            homePage={true}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
