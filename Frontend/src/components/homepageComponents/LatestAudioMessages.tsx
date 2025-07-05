import React, { useEffect, useState } from "react";
import { AudioMessage } from "@/types/dataTypes";
import AudioPlayer from "../AudioPlayer";
import { motion } from "motion/react";
import useAudioMessage from "@/hooks/useAudioMessage";

const LatestAudioMessages: React.FC = () => {
  const [audioMessages, setAudioMessages] = useState<AudioMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { getLatestAudioMessages } = useAudioMessage();

  useEffect(() => {
    fetchLatestAudioMessages();
  }, []);

  async function fetchLatestAudioMessages() {
    try {
      setLoading(true);
      const response = await getLatestAudioMessages(3); // Get 3 latest messages
      
      if (response?.data?.status === "Success" && response.data.data) {
        setAudioMessages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching latest audio messages:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex flex-col items-center mt-[3em]">
        <div className="animate-pulse">
          <h6 className="text-button xl:text-[20px] lg:text-[20px] font-medium sm:text-base md:text-base text-center">
            AUDIO MESSAGES
          </h6>
          <h1 className="text-white xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold mb-5 text-center">
            Latest Audio Messages
          </h1>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#2a2a2a] rounded-lg p-6 animate-pulse">
              <div className="h-40 bg-gray-600 rounded mb-4"></div>
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded mb-4"></div>
              <div className="h-12 bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (audioMessages.length === 0) {
    return null; // Don't show section if no messages
  }

  return (
    <motion.div 
      className="mx-auto flex flex-col items-center mt-[3em]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h6 
        className="text-button xl:text-[20px] lg:text-[20px] font-medium sm:text-base md:text-base"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        AUDIO MESSAGES
      </motion.h6>
      
      <motion.h1 
        className="text-white xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Latest Audio Messages
      </motion.h1>

      <div className="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {audioMessages.map((message, index) => (
          <motion.div
            key={message._id}
            className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            viewport={{ once: true }}
          >
            {/* Thumbnail */}
            <div className="relative h-40 bg-gradient-to-br from-[#43315A] to-[#2a1f3d]">
              <img
                src={message.thumbnail || '/images/Frame.png'}
                alt={message.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-[#FFD600] text-black text-xs px-2 py-1 rounded-full font-semibold">
                  {message.category}
                </span>
                <span className="text-gray-400 text-sm">{message.duration}</span>
              </div>

              <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
                {message.title}
              </h3>

              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {message.description}
              </p>

              <div className="text-sm text-gray-400 mb-4">
                <span>By {message.speaker}</span>
              </div>

              {/* Audio Player */}
              <AudioPlayer
                audioUrl={message.audioUrl}
                title={message.title}
                duration={message.duration}
                className="bg-[#1a1a1a]"
                showProgress={false}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <a
          href="/audio-messages"
          className="bg-[#FFD600] text-black px-8 py-3 rounded-lg hover:bg-[#e6c200] transition-colors font-semibold inline-flex items-center gap-2"
        >
          View All Audio Messages
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default LatestAudioMessages; 