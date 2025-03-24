import Link from "next/link";

export interface PageLinkProps {
  src: string;
  content: string;
  className?: string;
}

export const PageLink: React.FC<PageLinkProps> = ({
  src,
  content,
  className,
}) => {
  return (
    <div className={`navLinks text-md rounded-3xl p-3 ${className}`}>
      <Link href={src} className={`${className} `}>
        {content}
      </Link>
    </div>
  );
};
