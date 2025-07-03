"use client";

import React, { useEffect } from "react";
import { Memory } from "@/types/dataTypes";

interface LightboxProps {
  isOpen: boolean;
  currentImage: Memory | null;
  images: Memory[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentImage,
  images,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    
    // Prevent body scroll when lightbox is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentImage) return null;

  const currentIndex = images.findIndex(img => img._id === currentImage._id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/Frame.png";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-[#FFD600] transition-colors z-10 text-2xl"
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>

      {/* Previous button */}
      {!isFirst && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#FFD600] transition-colors z-10 text-2xl"
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
      )}

      {/* Next button */}
      {!isLast && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#FFD600] transition-colors z-10 text-2xl"
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      )}

      {/* Image container */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={currentImage.imageUrl}
          alt={`Gallery image ${currentImage._id}`}
          className="max-w-full max-h-full object-contain"
          onError={handleImageError}
        />
      </div>

      {/* Image info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm">
          {currentIndex + 1} of {images.length}
        </p>
        {currentImage.imgType && (
          <p className="text-xs text-gray-300 mt-1">
            Type: {currentImage.imgType.toUpperCase()}
          </p>
        )}
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close lightbox"
      />
    </div>
  );
};

export default Lightbox; 