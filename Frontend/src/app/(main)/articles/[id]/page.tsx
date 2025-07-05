"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import { useArticles } from "@/hooks/useArticles";
import { ArticleWithAuthor } from "@/types/dataTypes";
import React, { useEffect, useState } from "react";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

const ArticlePage: React.FC<ArticlePageProps> = ({ params }) => {
  const [article, setArticle] = useState<ArticleWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getArticleByIdWithAuthor } = useArticles();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching article with ID:", params.id);
        const response = await getArticleByIdWithAuthor(params.id);
        console.log("API Response:", response);
        
        if (response?.data?.status === "Success" && response.data.data) {
          console.log("Article loaded successfully:", response.data.data);
          setArticle(response.data.data);
        } else {
          console.error("Article not found or invalid response:", response);
          setError("Article not found");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(`Failed to load article: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id, getArticleByIdWithAuthor]); // getArticleByIdWithAuthor is now properly memoized

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#1a1a1a]">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD600] mx-auto mb-4"></div>
          <p className="text-lg">Loading article...</p>
          <p className="text-sm text-gray-400 mt-2">Article ID: {params.id}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
        <div className="text-center text-white max-w-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-4 text-sm sm:text-base">{error || "The article you're looking for doesn't exist or hasn't been loaded yet."}</p>
          <p className="mb-6 text-xs text-gray-400">Article ID: {params.id}</p>
          <a
            href="/articles"
            className="bg-[#FFD600] text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#e6c200] transition-colors inline-block text-sm sm:text-base font-medium"
          >
            Back to Articles
          </a>
        </div>
      </div>
    );
  }

  // Helper function to handle image URLs
  const getImageSrc = (imagePath: string) => {
    if (!imagePath) {
      return "/images/Frame.png"; // Default fallback image
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath.startsWith('/images/')) {
      return imagePath;
    }
    
    if (!imagePath.startsWith('/')) {
      return `/images/${imagePath}`;
    }
    
    return imagePath;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/Frame.png";
  };

  return (
    <div className="w-full min-h-screen bg-default">
      {/* Hero Section */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative">
        <img
          src={getImageSrc(article.displayImage)}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-6 sm:pb-12">
            <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <a
                href="/articles"
                className="text-white hover:text-[#FFD600] transition-colors text-sm sm:text-base"
              >
                ← Back to Articles
              </a>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white text-sm sm:text-base">
              {article.author && (
                <div className="flex items-center gap-2">
                  <img
                    src={getImageSrc(article.author.profileImage)}
                    alt={article.author.fullName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    onError={handleImageError}
                  />
                  <span className="text-sm sm:text-lg">{article.author.fullName}</span>
                </div>
              )}
              <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
                {article.author && <span className="hidden sm:inline">•</span>}
                <span>{article.formattedDate}</span>
                <span>•</span>
                <span>{article.estimatedReadTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-default">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <div 
              className="text-default leading-relaxed text-sm sm:text-base lg:text-lg"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {article.text}
            </div>
          </div>
        </div>

        {/* Author Info */}
        {article.author && (
          <div className="mt-8 sm:mt-12 bg-[#2a2a2a] rounded-lg p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">About the Author</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={getImageSrc(article.author.profileImage)}
                alt={article.author.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                onError={handleImageError}
              />
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {article.author.fullName}
                </h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {article.author.firstName} {article.author.lastName} is a contributing author to Mojites Talk Corner.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <a
            href="/articles"
            className="bg-[#FFD600] text-black px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:bg-[#e6c200] transition-colors font-semibold inline-block text-sm sm:text-base text-center min-w-[200px]"
          >
            Read More Articles
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WithNavbar(ArticlePage); 