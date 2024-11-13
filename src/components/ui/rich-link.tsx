import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Globe } from "lucide-react";

type RichLinkProps = {
  url: string;
  popup?: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
};

const RichLink = ({ url, popup, image, imageAlt, children }: RichLinkProps) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex group relative"
  >
    <span className="relative">
      {children}
      <span className="absolute -bottom-[-4px] left-0 h-[1px] w-full bg-white/50" />
      <span className="absolute -bottom-[-4px] left-0 h-[1.3px] w-full bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </span>
    <span className="inlineitems-center transition-transform duration-300 group-hover:scale-110">
      <ArrowUpRight
        size={15}
        className="text-white/70 transition-colors duration-300 group-hover:text-white"
      />
    </span>

    {/* Tooltip */}
    <span className="delay-300 z-50 absolute -bottom-11 -right-40 -translate-x-1/2 px-3 py-2 bg-black/95 text-white text-xs rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 whitespace-nowrap flex items-center border border-white/10">
      {image && (
        <Image
          className="flex-shrink-0 mr-2"
          src={image}
          alt={imageAlt || ""}
          width={12}
          height={12}
          priority
        />
      )}
      <span className="pr-3 blod">
        {popup ? (
          <>{popup}</>
        ) : (
          <>
            {url}
            <Globe size={12} className="ml-1 inline" />
          </>
        )}
      </span>
    </span>
  </Link>
);

export default RichLink;
