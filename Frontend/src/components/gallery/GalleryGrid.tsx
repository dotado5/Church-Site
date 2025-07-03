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
    
    // Create varied layout pattern
    if (index % 7 === 0 || index % 7 === 3) {
      // Large items
      return "col-span-2 row-span-2";
    } else if (aspectRatio > 1.5) {
      // Wide items
      return "col-span-2 row-span-1";
    } else if (aspectRatio < 0.7) {
      // Tall items
      return "col-span-1 row-span-2";
    } else {
      // Regular items
      return "col-span-1 row-span-1";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader text="Loading gallery..." textColor="text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Failed to Load Gallery</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#FFD600] text-black px-6 py-3 rounded-lg hover:bg-[#e6c200] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">No Photos Yet</h3>
          <p className="text-gray-300">
            Our gallery is currently empty. Check back soon for amazing memories from MOJ events!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Stats */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#2a2a2a] rounded-lg px-6 py-3">
          <p className="text-white text-center">
            <span className="text-[#FFD600] font-bold text-lg">{memories.length}</span>
            <span className="ml-2">
              {memories.length === 1 ? 'Photo' : 'Photos'} in Gallery
            </span>
          </p>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[200px] sm:auto-rows-[150px]">
        {memories.map((memory, index) => (
          <PhotoCard
            key={memory._id}
            memory={memory}
            onClick={() => openLightbox(index)}
            className={`${getGridItemClass(memory, index)} min-h-[150px]`}
          />
        ))}
      </div>

      {/* Load More Hint */}
      {memories.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              💡 Click any photo to view in full screen
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Use arrow keys to navigate when viewing photos
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
    </>
  );
};

export default GalleryGrid; 