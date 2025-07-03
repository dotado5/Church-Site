"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import LatestArticles from "@/components/blogPageComponents/LatestArticles";
import { useArticles } from "@/hooks/useArticles";
import { ArticleWithAuthor, ArticlesPagination } from "@/types/dataTypes";
import { fetchData } from "@/utils/fetchData";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

const Blogs = () => {
  const { getAllArticlesWithAuthors } = useArticles();
  const [articles, setArticles] = useState<ArticleWithAuthor[]>([]);
  const [pagination, setPagination] = useState<ArticlesPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  async function fetchArticles(page: number = 1) {
    try {
      setLoading(true);
      const articlesResponse = await fetchData(() => getAllArticlesWithAuthors(page, 12));

      if (articlesResponse?.status === 200) {
        setArticles(articlesResponse.data.data as ArticleWithAuthor[]);
        setPagination(articlesResponse.data.pagination as ArticlesPagination);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-[1300px] h-[700px] sm:w-full md:w-full mx-auto flex flex-col items-center justify-center">
        <Loader text="Loading articles..." textColor="my-[10%]" />
      </div>
    );
  }

  return (
    <div className="w-[1300px] h-auto sm:w-full md:w-full mx-auto flex flex-col items-center mt-[100px] sm:mt-6 md:mt-6">
      <div className="flex flex-col items-center mb-[128px]">
        <h1 className="text-[65px] font-bold text-white text-center sm:text-[36px] md:text-[42px]">
          Mojites Talk Corner: Safe Space to Share, Learn, and Grow Together
        </h1>
        <p className="text-white text-[18px] sm:text-base md:text-base text-center">
          For Media enquiries, please contact{" "}
          <span className="text-[#FFD600] ">fatokivictor2@gmail.com</span>
        </p>
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

export default WithNavbar(Blogs);
