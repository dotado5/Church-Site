"use client";

import React, { useState } from "react";
import { Memory } from "@/types/dataTypes";
import PhotoCard from "./PhotoCard";
import Lightbox from "./Lightbox";
import Loader from "../Loader/Loader";

interface GalleryGridProps {
  memories: Memory[];
  loading?: boolean;
  error?: string | null;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ memories, loading = false, error = null }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? memories.length - 1 : prev - 1
    );
  };

  // Helper function to get grid item class based on image dimensions
  const getGridItemClass = (memory: Memory, index: number) => {
    const aspectRatio = memory.width / memory.height;
    
    // Create varied layout pattern - simplified for mobile
    if (index % 7 === 0 || index % 7 === 3) {
      // Large items - smaller on mobile
      return "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2";
    } else if (aspectRatio > 1.5) {
      // Wide items
      return "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1";
    } else if (aspectRatio < 0.7) {
      // Tall items - regular size on mobile
      return "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2";
    } else {
      // Regular items
      return "col-span-1 row-span-1";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-20">
        <Loader text="Loading gallery..." textColor="text-white" />
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

  if (memories.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-20">
        <div className="text-center text-white max-w-md px-4">
          <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📸</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No Photos Yet</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Our gallery is being prepared. Check back soon for beautiful moments from our church community!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6">
      {/* Gallery Stats */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="bg-[#2a2a2a] rounded-lg px-4 py-3 sm:px-6">
          <p className="text-white text-center text-sm sm:text-base">
            <span className="text-[#FFD600] font-bold text-lg sm:text-xl">{memories.length}</span>
            <span className="ml-2">
              {memories.length === 1 ? 'Photo' : 'Photos'} in Gallery
            </span>
          </p>
        </div>
      </div>

      {/* Mobile Instructions */}
      <div className="sm:hidden mb-4 text-center">
        <p className="text-gray-400 text-xs">
          Tap any photo to view full screen
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[200px]">
        {memories.map((memory, index) => (
          <PhotoCard
            key={memory._id}
            memory={memory}
            onClick={() => openLightbox(index)}
            className={`${getGridItemClass(memory, index)} min-h-[120px] sm:min-h-[150px] cursor-pointer transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]`}
          />
        ))}
      </div>

      {/* Load More Hint */}
      {memories.length > 0 && (
        <div className="flex justify-center mt-8 sm:mt-12">
          <div className="text-center max-w-sm px-4">
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
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentImage={memories[currentImageIndex]}
        images={memories}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default GalleryGrid; 