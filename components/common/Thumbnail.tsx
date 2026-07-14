import React from "react";
import { ImageIcon } from "lucide-react";

export default function Thumbnail({
  image,
  title,
  className = "",
}: {
  image?: string;
  title: string;
  className?: string;
}) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={title} className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-linear-to-br from-blue-50 to-slate-100 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-blue-300">
        <ImageIcon className="size-8" strokeWidth={1.5} />
        <span className="max-w-[80%] truncate text-center text-xs font-semibold text-blue-400">
          {title}
        </span>
      </div>
    </div>
  );
}
