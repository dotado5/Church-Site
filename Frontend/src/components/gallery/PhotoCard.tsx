import React from "react";
import { Memory } from "@/types/dataTypes";

interface PhotoCardProps {
  memory: Memory;
  onClick: () => void;
  className?: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ memory, onClick, className = "" }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/Frame.png"; // Fallback image
  };

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden rounded-lg bg-gray-800 ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <img
        src={memory.imageUrl}
        alt={`Gallery image ${memory._id}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={handleImageError}
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
          <div className="bg-[#FFD600] text-black px-4 py-2 rounded-full text-sm font-medium">
            View Image
          </div>
        </div>
      </div>
      
      {/* Image type badge */}
      {memory.imgType && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs uppercase">
          {memory.imgType}
        </div>
      )}
    </div>
  );
};

export default PhotoCard; 