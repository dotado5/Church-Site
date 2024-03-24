import React from "react";
import { MdArrowOutward } from "react-icons/md";

interface ButtonProps {
  content: string;
  icon: boolean;
}

export const Button: React.FC<ButtonProps> = ({ content, icon }) => {
  return (
    <div className="">
      <button className="flex bg-button p-4 rounded-full items-center gap-2">
        {content}
        {icon && <MdArrowOutward />}
      </button>
    </div>
  );
};
