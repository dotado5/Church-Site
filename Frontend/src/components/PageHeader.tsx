import React from "react";
import { motion } from "motion/react";

interface PageHeaderProps {
  title: string;
  description: string;
  yellowText: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  yellowText,
  className,
}) => {
  const titleWords = title.split(" ");
  
  return (
    <div
      className={`w-full max-w-4xl xl:max-w-5xl mx-auto text-center px-4 sm:px-6 ${className}`}
    >
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[65px] font-bold text-center leading-tight sm:leading-tight md:leading-tight lg:leading-tight mb-4 sm:mb-6">
        {titleWords.map((word, index) => (
          <React.Fragment key={index}>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {index < titleWords.length - 1 && " "}
          </React.Fragment>
        ))}
      </h1>
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: titleWords.length * 0.1 + 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-normal text-center leading-relaxed max-w-3xl mx-auto"
      >
        {description}
        {yellowText && <span className="text-[#FFD600]"></span>}
      </motion.p>
    </div>
  );
};
