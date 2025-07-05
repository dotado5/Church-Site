"use client";

import React, { useState, useEffect } from "react";
import { useMemories } from "@/hooks/useMemories";
import { ActivityWithMemories, Memory } from "@/types/dataTypes";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const LatestEvents: React.FC = () => {
  const [latestEvent, setLatestEvent] = useState<ActivityWithMemories | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getGalleryByEvents } = useMemories();

  useEffect(() => {
    fetchLatestEvent();
  }, []);

  useEffect(() => {
    if (latestEvent && latestEvent.previewMemories.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => 
          prev === latestEvent.previewMemories.length - 1 ? 0 : prev + 1
        );
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [latestEvent]);

  const fetchLatestEvent = async () => {
    try {
      setLoading(true);
      const response = await getGalleryByEvents();
      
      if (response?.data?.data && response.data.data.length > 0) {
        // Get the most recent event (first in array as they're sorted by date desc)
        const mostRecentEvent = response.data.data[0];
        if (mostRecentEvent.memoryCount > 0) {
          setLatestEvent(mostRecentEvent);
        }
      }
    } catch (error) {
      console.error("Error fetching latest event:", error);
      setError("Failed to load latest event");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const nextSlide = () => {
    if (latestEvent) {
      setCurrentSlide((prev) => 
        prev === latestEvent.previewMemories.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (latestEvent) {
      setCurrentSlide((prev) => 
        prev === 0 ? latestEvent.previewMemories.length - 1 : prev - 1
      );
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="py-16 bg-default">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-600 rounded w-64 mx-auto mb-4"></div>
              <div className="h-64 bg-gray-600 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !latestEvent) {
    return null; // Don't show anything if there's an error or no event
  }

  return (
    <section className="py-16 bg-default">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h6 className="text-white xl:text-[20px] lg:text-[20px] font-medium sm:text-base md:text-base mb-4">
            LATEST MOMENTS
          </h6>
          <h2 className="text-white xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold mb-4">
            Event Highlights
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Take a look at the beautiful moments captured from our most recent church event
          </p>
        </motion.div>

        {/* Event Details and Slideshow */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
          >
            {/* Event Info Header */}
            <div className="bg-default text-white p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{latestEvent.name}</h3>
                  <p className="text-gray-300 mb-2 font-medium">{formatDate(latestEvent.date)}</p>
                  <p className="text-gray-400 text-sm max-w-2xl">
                    {latestEvent.description}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-white">{latestEvent.memoryCount}</span>
                    <p className="text-sm text-gray-300 font-medium">Photos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slideshow */}
            <div className="relative">
              <div className="aspect-video relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={latestEvent.previewMemories[currentSlide]?.imageUrl}
                    alt={`${latestEvent.name} - Photo ${currentSlide + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/Frame.png"; // Fallback image
                    }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {latestEvent.previewMemories.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-default hover:bg-gray-700 text-white rounded-full p-3 transition-all duration-200 shadow-lg"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-default hover:bg-gray-700 text-white rounded-full p-3 transition-all duration-200 shadow-lg"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Slide Counter */}
                {latestEvent.previewMemories.length > 1 && (
                  <div className="absolute top-4 right-4 bg-default text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                    {currentSlide + 1} / {latestEvent.previewMemories.length}
                  </div>
                )}
              </div>

              {/* Dot Indicators */}
              {latestEvent.previewMemories.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {latestEvent.previewMemories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? 'bg-default shadow-lg'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="p-6 bg-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-sm">
                  Want to see more photos from this event?
                </p>
              </div>
              <Link
                href={`/gallery?event=${latestEvent._id}`}
                className="inline-flex items-center px-6 py-3 bg-default hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>View All Photos</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestEvents; 