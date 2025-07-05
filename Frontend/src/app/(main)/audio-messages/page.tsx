"use client";

import React, { useState, useEffect } from "react";
import WithNavbar from "@/Layout/WithNavbar";
import { PageHeader } from "@/components/PageHeader";
import Loader from "@/components/Loader/Loader";
import { Footer } from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import { AudioMessage } from "@/types/dataTypes";
import useAudioMessage from "@/hooks/useAudioMessage";

const AudioMessages: React.FC = () => {
  const [audioMessages, setAudioMessages] = useState<AudioMessage[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { getAllAudioMessages, getAudioMessagesByCategory, getAudioMessageCategories } = useAudioMessage();

  useEffect(() => {
    loadAudioMessages();
    loadCategories();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await getAudioMessageCategories();
      if (response?.data?.status === "Success" && response.data.data) {
        setCategories(['all', ...response.data.data]);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      // Fallback to default categories if API fails
      setCategories(['all', 'Sermons', 'Youth', 'Worship', 'Teaching', 'Prayer']);
    }
  };

  const loadAudioMessages = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (selectedCategory === 'all') {
        response = await getAllAudioMessages();
      } else {
        response = await getAudioMessagesByCategory(selectedCategory);
      }
      
      if (response?.data?.status === "Success" && response.data.data) {
        setAudioMessages(response.data.data);
      } else {
        setError("Failed to load audio messages");
      }
    } catch (error) {
      console.error("Error loading audio messages:", error);
      setError("Failed to load audio messages. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter messages by category (for UI purposes when using getAllAudioMessages)
  const filteredMessages = selectedCategory === 'all' 
    ? audioMessages 
    : audioMessages.filter(message => message.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <PageHeader 
          title="Audio Messages" 
          description="Listen to Inspiring Messages, Sermons, and Teachings from Our Community Leaders"
          yellowText={false}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader text="Loading audio messages..." textColor="text-white" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <PageHeader 
          title="Audio Messages" 
          description="Listen to Inspiring Messages, Sermons, and Teachings from Our Community Leaders"
          yellowText={false}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <PageHeader 
        title="Audio Messages" 
        description="Listen to Inspiring Messages, Sermons, and Teachings from Our Community Leaders"
        yellowText={false}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8 flex justify-center">
          <div className="bg-[#2a2a2a] rounded-lg p-1 flex flex-wrap gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md transition-all duration-300 capitalize ${
                  selectedCategory === category
                    ? 'bg-[#FFD600] text-black font-semibold'
                    : 'text-white hover:bg-[#3a3a3a]'
                }`}
              >
                🎵 {category}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMessages.map((message) => (
            <div
              key={message._id}
              className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-[#43315A] to-[#2a1f3d]">
                <img
                  src={message.thumbnail || '/images/Frame.png'}
                  alt={message.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 hover:bg-opacity-30 transition-all cursor-pointer">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#FFD600] text-black text-xs px-2 py-1 rounded-full font-semibold">
                    {message.category}
                  </span>
                  <span className="text-gray-400 text-sm">{message.duration}</span>
                </div>

                <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
                  {message.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {message.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>By {message.speaker}</span>
                  <span>{new Date(message.date).toLocaleDateString()}</span>
                </div>

                {/* Audio Player */}
                <AudioPlayer
                  audioUrl={message.audioUrl}
                  title={message.title}
                  duration={message.duration}
                  className="bg-[#1a1a1a]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-white text-xl font-semibold mb-2">
              No Audio Messages Found
            </h3>
            <p className="text-gray-400">
              No messages available for the selected category.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WithNavbar(AudioMessages); 