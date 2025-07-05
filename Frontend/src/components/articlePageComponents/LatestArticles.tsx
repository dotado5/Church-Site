import React from "react";
import { EnhancedArticle } from "../Article";
import { ArticleWithAuthor, ArticlesPagination } from "@/types/dataTypes";
import Loader from "../Loader/Loader";

interface LatestArticlesProps {
  articles: ArticleWithAuthor[];
  pagination: ArticlesPagination | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({
  articles,
  pagination,
  currentPage,
  onPageChange,
}) => {
  if (articles.length === 0) {
    return <Loader text="No articles found..." textColor="mt-[2em]" />;
  }

  const renderPaginationButtons = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const buttons = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.totalPages;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (pagination.hasPrevPage) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 text-white bg-[#43315A] rounded hover:bg-[#5a4273] transition-colors"
        >
          Previous
        </button>
      );
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 mx-1 rounded transition-colors ${
            page === currentPage
              ? "bg-[#FFD600] text-black font-bold"
              : "text-white bg-[#43315A] hover:bg-[#5a4273]"
          }`}
        >
          {page}
        </button>
      );
    }

    // Next button
    if (pagination.hasNextPage) {
      buttons.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 text-white bg-[#43315A] rounded hover:bg-[#5a4273] transition-colors"
        >
          Next
        </button>
      );
    }

    return (
      <div className="flex flex-col items-center mt-8 gap-4">
        <div className="flex justify-center items-center">
          {buttons}
        </div>
        <p className="text-white text-sm">
          Showing {articles.length} of {pagination.totalArticles} articles 
          (Page {currentPage} of {totalPages})
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start gap-[48px] mb-[128px] w-full">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-white text-[42px] font-bold">Latest Articles</h3>
        {pagination && (
          <p className="text-[#BFBFBF] text-lg">
            {pagination.totalArticles} article{pagination.totalArticles !== 1 ? 's' : ''} found
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-2 w-full gap-[20px] gap-y-[40px] sm:grid-cols-1 md:grid-cols-1">
        {articles.map((article) => (
          <EnhancedArticle
            key={article._id}
            article={article}
            homePage={false}
          />
        ))}
      </div>

      {renderPaginationButtons()}
    </div>
  );
};

export default LatestArticles; 