"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import LatestArticles from "@/components/articlePageComponents/LatestArticles";
import { useArticles } from "@/hooks/useArticles";
import { ArticleWithAuthor, ArticlesPagination } from "@/types/dataTypes";
import { fetchData } from "@/utils/fetchData";
import React, { useEffect, useState, useCallback } from "react";
import Loader from "@/components/Loader/Loader";

const Articles = () => {
  const { getAllArticlesWithAuthors } = useArticles();
  const [articles, setArticles] = useState<ArticleWithAuthor[]>([]);
  const [pagination, setPagination] = useState<ArticlesPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching articles for page:", currentPage);
        
        const articlesResponse = await fetchData(() => getAllArticlesWithAuthors(currentPage, 12));
        
        if (!isMounted) return; // Prevent state update if component unmounted
        
        if (articlesResponse?.status === 200) {
          setArticles(articlesResponse.data.data as ArticleWithAuthor[]);
          setPagination(articlesResponse.data.pagination as ArticlesPagination);
          console.log("Articles loaded successfully:", articlesResponse.data.data.length);
        } else {
          console.error("Failed to fetch articles:", articlesResponse);
          setError("Failed to load articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        if (isMounted) {
          setError("Unable to load articles. Please check your connection and try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [currentPage, getAllArticlesWithAuthors]); // getAllArticlesWithAuthors is now properly memoized

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="w-[1300px] h-[700px] sm:w-full md:w-full mx-auto flex flex-col items-center justify-center">
        <Loader text="Loading articles..." textColor="my-[10%]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[1300px] h-[700px] sm:w-full md:w-full mx-auto flex flex-col items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Unable to Load Articles</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[1300px] h-auto sm:w-full md:w-full mx-auto flex flex-col items-center mt-[100px] sm:mt-6 md:mt-6">
      <div className="flex flex-col items-center mb-[128px]">
        <h1 className="text-[65px] font-bold text-white text-center sm:text-[36px] md:text-[42px]">
          Mojites Talk Corner: Safe Space to Share, Learn, and Grow Together
        </h1>
      </div>

      <LatestArticles 
        articles={articles} 
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
};

export default WithNavbar(Articles); 