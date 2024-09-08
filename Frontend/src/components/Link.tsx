import Link from "next/link";

export interface PageLinkProps {
  src: string;
  content: string;
  className?: any;
  icon?: any;
  onClick?: () => void;
}

export const PageLink: React.FC<PageLinkProps> = ({
  src,
  content,
  className,
  icon,
  onClick,
}) => {
  return (
    <div className="">
      <Link href={src} className={`${className} `}>
        {content}
      </Link>
    </div>
  );
};
