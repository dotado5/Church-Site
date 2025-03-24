import React from "react";
import { MdArrowOutward } from "react-icons/md";

interface ButtonProps {
  content: string;
  icon: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ content, icon, className }) => {
  return (
    <button
      className={`flex bg-button p-4 rounded-full items-center gap-2 ${className}`}
    >
      {content}
      {icon && <MdArrowOutward />}
    </button>
  );
};
