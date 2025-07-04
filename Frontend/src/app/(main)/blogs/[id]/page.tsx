"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import React from "react";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

// Real article data from the API for immediate display
const getArticleData = (id: string) => {
  const articles = {
    "68670b6848956cf1930160f9": {
      _id: "68670b6848956cf1930160f9",
      displayImage: "/images/article1.svg",
      title: "Walking in Faith: Trusting God's Plan",
      author: {
        _id: "68670b6848956cf1930160ec",
        firstName: "John",
        lastName: "Adebayo",
        fullName: "John Adebayo",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
      },
      text: "Community and fellowship are essential elements of the Christian faith. Walking in Faith: Trusting God's Plan highlights the importance of coming together as believers to encourage, support, and love one another.\n\nThe early church in Acts provides a beautiful example of Christian community. They devoted themselves to the apostles' teaching, fellowship, breaking of bread, and prayer. They shared everything they had and ensured that no one among them was in need.\n\nToday, our church family continues this tradition of authentic fellowship. We celebrate together, mourn together, and grow together in our faith journey. Through small groups, ministry teams, and church events, we build meaningful relationships that reflect God's love.\n\nFellowship is not just about social interaction; it's about spiritual connection. When we gather in Jesus' name, He is present among us, blessing our time together and strengthening our bonds as brothers and sisters in Christ.\n\nLet us continue to prioritize fellowship, making time for meaningful connections that build up the body of Christ and advance His kingdom on earth.",
      formattedDate: "December 1, 2024",
      estimatedReadTime: "3 min read"
    },
    "68670b6848956cf1930160fa": {
      _id: "68670b6848956cf1930160fa",
      displayImage: "/images/article2.svg",
      title: "The Power of Prayer in Daily Life",
      author: {
        _id: "68670b6848956cf1930160ed",
        firstName: "Grace",
        lastName: "Okafor",
        fullName: "Grace Okafor",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
      },
      text: "Prayer is the cornerstone of our relationship with God. It is through prayer that we commune with our Heavenly Father, express our gratitude, seek His guidance, and find comfort in times of trouble.\n\nJesus himself set the example for us, often withdrawing to quiet places to pray. He taught us the Lord's Prayer, showing us how to approach God with reverence, humility, and trust.\n\nIn our daily lives, prayer should not be relegated to just formal occasions or times of crisis. It should be a constant conversation with God, acknowledging His presence in every moment of our day.\n\nWhen we pray, we align our hearts with God's will. We invite His peace into our troubled minds and His strength into our weary bodies. Prayer transforms not just our circumstances, but more importantly, it transforms us.\n\nLet us commit to making prayer a priority in our lives, knowing that God hears us and delights in our communion with Him.",
      formattedDate: "November 15, 2024",
      estimatedReadTime: "2 min read"
    },
    "68670b6848956cf1930160fb": {
      _id: "68670b6848956cf1930160fb",
      displayImage: "/images/article3.svg",
      title: "Building Community Through Fellowship",
      author: {
        _id: "68670b6848956cf1930160ec",
        firstName: "John",
        lastName: "Adebayo",
        fullName: "John Adebayo",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
      },
      text: "The Christian life is not meant to be lived in isolation. From the very beginning, God declared that 'it is not good for man to be alone.' This principle extends beyond marriage to encompass our entire spiritual journey.\n\nIn Acts 2:42, we see the early church devoted to fellowship, breaking bread together, and sharing their lives with one another. They understood that faith grows stronger in community.\n\nTrue fellowship goes beyond casual social interaction. It involves sharing our joys and sorrows, bearing one another's burdens, and encouraging each other in our walk with Christ.\n\nWhen we gather together in Jesus' name, we experience His presence in a unique way. Our individual faith is strengthened by the collective faith of the community.\n\nLet us prioritize fellowship in our church and in our daily lives, creating spaces where authentic relationships can flourish and where God's love can be tangibly experienced.",
      formattedDate: "October 20, 2024",
      estimatedReadTime: "2 min read"
    }
  };

  return articles[id as keyof typeof articles] || null;
};

const ArticlePage: React.FC<ArticlePageProps> = ({ params }) => {
  const article = getArticleData(params.id);

  if (!article) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#1a1a1a]">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or hasn't been loaded yet.</p>
          <a
            href="/blogs"
            className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors inline-block"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <div className="w-full h-[500px] relative">
        <img
          src={article.displayImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 pb-12">
            <div className="flex items-center gap-4 mb-4">
              <a
                href="/blogs"
                className="text-white hover:text-[#FFD600] transition-colors"
              >
                ← Back to Blog
              </a>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <img
                  src={article.author.profileImage}
                  alt={article.author.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-lg">{article.author.fullName}</span>
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
              className="text-gray-800 leading-relaxed text-lg"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {article.text}
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="mt-12 bg-[#2a2a2a] rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">About the Author</h3>
          <div className="flex items-center gap-4">
            <img
              src={article.author.profileImage}
              alt={article.author.fullName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-semibold text-white">{article.author.fullName}</h4>
              <p className="text-gray-300 mt-2">
                {article.author.firstName} {article.author.lastName} is a contributing author to Mojites Talk Corner.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <a
            href="/blogs"
            className="bg-[#FFD600] text-black px-8 py-3 rounded-lg hover:bg-[#e6c200] transition-colors font-semibold inline-block"
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