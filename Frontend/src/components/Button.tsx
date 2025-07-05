import React from "react";
import { MdArrowOutward } from "react-icons/md";
import * as motion from "motion/react-client";

interface ButtonProps {
  content: string;
  icon: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ content, icon, className, onClick }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <button
        onClick={onClick}
        className={`flex bg-button hover:bg-[#e6c200] active:bg-[#d9b800] px-4 py-3 sm:px-6 sm:py-4 lg:p-4 rounded-full items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg font-medium min-w-[160px] sm:min-w-[180px] lg:min-w-[200px] transition-all duration-300 touch-manipulation ${className}`}
      >
        <span>{content}</span>
        {icon && <MdArrowOutward className="text-lg sm:text-xl" />}
      </button>
    </motion.div>
  );
};
