"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import { useArticles } from "@/hooks/useArticles";
import { ArticleWithAuthor } from "@/types/dataTypes";
import { fetchData } from "@/utils/fetchData";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

const ArticlePage: React.FC<ArticlePageProps> = ({ params }) => {
  const { getArticleByIdWithAuthor } = useArticles();
  const [article, setArticle] = useState<ArticleWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  async function fetchArticle(id: string) {
    try {
      setLoading(true);
      setError(null);
      const articleResponse = await fetchData(() => getArticleByIdWithAuthor(id));

      if (articleResponse?.status === 200) {
        setArticle(articleResponse.data as ArticleWithAuthor);
      } else {
        setError("Article not found");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Failed to load article");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Loader text="Loading article..." textColor="my-[10%]" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-white mb-6">{error || "The article you're looking for doesn't exist."}</p>
          <button
            onClick={() => router.push("/blogs")}
            className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const authorName = article.author 
    ? article.author.fullName 
    : "Unknown Author";

  return (
    <div className="w-full min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <div className="w-full h-[500px] relative">
        <img
          src={article.displayImage}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/Frame.png";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 pb-12">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.push("/blogs")}
                className="text-white hover:text-[#FFD600] transition-colors"
              >
                ← Back to Blog
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                {article.author?.profileImage && (
                  <img
                    src={article.author.profileImage}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/Frame.png";
                    }}
                  />
                )}
                <span className="text-lg">{authorName}</span>
              </div>
              <span>•</span>
              <span>{article.formattedDate}</span>
              <span>•</span>
              <span>{article.estimatedReadTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              style={{ 
                fontSize: '18px', 
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap'
              }}
            >
              {article.text}
            </div>
          </div>
        </div>

        {/* Author Info */}
        {article.author && (
          <div className="mt-12 bg-[#2a2a2a] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">About the Author</h3>
            <div className="flex items-center gap-4">
              <img
                src={article.author.profileImage}
                alt={authorName}
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/Frame.png";
                }}
              />
              <div>
                <h4 className="text-xl font-semibold text-white">{authorName}</h4>
                <p className="text-gray-300 mt-2">
                  {article.author.firstName} {article.author.lastName} is a contributing author to Mojites Talk Corner.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => router.push("/blogs")}
            className="bg-[#FFD600] text-black px-8 py-3 rounded-lg hover:bg-[#e6c200] transition-colors font-semibold"
          >
            Read More Articles
          </button>
        </div>
      </div>

      <Footer />
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#FFD600] text-black p-3 rounded-full shadow-lg hover:bg-[#e6c200] transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default WithNavbar(ArticlePage); 