import React from "react";
import { MdArrowOutward } from "react-icons/md";
import * as motion from "motion/react-client";

interface ButtonProps {
  content: string;
  icon: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ content, icon, className }) => {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      <button
        className={`flex bg-button p-4 rounded-full items-center gap-2 ${className}`}
      >
        {content}
        {icon && <MdArrowOutward />}
      </button>
    </motion.div>
  );
};
