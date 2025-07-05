"use client";

import React, { useState } from "react";
import { Memory, ActivityWithMemories } from "@/types/dataTypes";
import PhotoCard from "./PhotoCard";
import Lightbox from "./Lightbox";
import Loader from "../Loader/Loader";

interface EventGalleryGridProps {
  events: ActivityWithMemories[];
  loading?: boolean;
  error?: string | null;
  onEventSelect: (eventId: string | null) => void;
}

const EventGalleryGrid: React.FC<EventGalleryGridProps> = ({ 
  events, 
  loading = false, 
  error = null,
  onEventSelect 
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allMemories, setAllMemories] = useState<Memory[]>([]);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  const openLightbox = (memories: Memory[], index: number, eventId?: string) => {
    setAllMemories(memories);
    setCurrentImageIndex(index);
    setCurrentEventId(eventId || null);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setAllMemories([]);
    setCurrentEventId(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allMemories.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allMemories.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to get grid item class based on image dimensions
  const getGridItemClass = (memory: Memory, index: number) => {
    const aspectRatio = memory.width / memory.height;
    
    // Create varied layout pattern
    if (index % 7 === 0 || index % 7 === 3) {
      // Large items
      return "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2";
    } else if (aspectRatio > 1.5) {
      // Wide items
      return "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1";
    } else if (aspectRatio < 0.7) {
      // Tall items
      return "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2";
    } else {
      // Regular items
      return "col-span-1 row-span-1";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-20">
        <Loader text="Loading events..." textColor="text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-20">
        <div className="text-center text-white max-w-md px-4">
          <div className="text-red-500 text-4xl sm:text-6xl mb-4">📷</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Gallery Error</h3>
          <p className="text-gray-300 text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-20">
        <div className="text-center text-white max-w-md px-4">
          <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📸</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No Events Yet</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Our gallery is being prepared. Check back soon for beautiful moments from our church events!
          </p>
        </div>
      </div>
    );
  }

  // Filter events that have memories
  const eventsWithMemories = events.filter(event => 
    event.previewMemories && event.previewMemories.length > 0
  );

  if (eventsWithMemories.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-20">
        <div className="text-center text-white max-w-md px-4">
          <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📸</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No Photos Yet</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Photos from our church events will be displayed here. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6">
      {/* Overall Stats */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="bg-[#2a2a2a] rounded-lg px-6 py-4 text-center">
          <p className="text-white text-sm sm:text-base mb-2">
            <span className="text-[#FFD600] font-bold text-xl sm:text-2xl">
              {eventsWithMemories.length}
            </span>
            <span className="ml-2">
              {eventsWithMemories.length === 1 ? 'Event' : 'Events'}
            </span>
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Total Photos: {eventsWithMemories.reduce((total, event) => total + event.memoryCount, 0)}
          </p>
        </div>
      </div>

      {/* Events Sections */}
      <div className="space-y-12 sm:space-y-16">
        {eventsWithMemories.map((event, eventIndex) => (
          <section key={event._id} className="w-full">
            {/* Event Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {event.name}
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base mb-2">
                    {formatDate(event.date)}
                  </p>
                  {event.description && (
                    <p className="text-gray-300 text-sm sm:text-base">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex flex-col items-end">
                  <div className="bg-[#FFD600] text-black px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {event.memoryCount} photos
                  </div>
                  <button
                    onClick={() => onEventSelect(event._id)}
                    className="text-[#FFD600] hover:underline text-sm"
                  >
                    View all from this event →
                  </button>
                </div>
              </div>
              
              {/* Event Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#FFD600] to-transparent"></div>
            </div>

            {/* Event Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[200px]">
              {event.previewMemories?.map((memory, index) => (
                <PhotoCard
                  key={memory._id}
                  memory={memory}
                  onClick={() => openLightbox(event.previewMemories || [], index, event._id)}
                  className={`${getGridItemClass(memory, index)} min-h-[120px] sm:min-h-[150px] cursor-pointer transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]`}
                />
              ))}
            </div>

            {/* View More Button */}
            {event.memoryCount > (event.previewMemories?.length || 0) && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => onEventSelect(event._id)}
                  className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors font-medium"
                >
                  View All {event.memoryCount} Photos from {event.name}
                </button>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Mobile Instructions */}
      <div className="mt-12 sm:mt-16 text-center max-w-sm mx-auto">
        <p className="text-gray-400 text-xs sm:text-sm">
          💡 <span className="hidden sm:inline">Click</span><span className="sm:hidden">Tap</span> any photo to view in full screen
        </p>
        <p className="text-gray-400 text-xs mt-1 hidden sm:block">
          Use arrow keys to navigate when viewing photos
        </p>
        <p className="text-gray-400 text-xs mt-1 sm:hidden">
          Swipe left or right to navigate photos
        </p>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentImage={allMemories[currentImageIndex]}
        images={allMemories}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default EventGalleryGrid; 