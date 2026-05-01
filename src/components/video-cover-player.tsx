"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { MutedInlineVideo } from "@/components/muted-inline-video";

type VideoCoverPlayerProps = {
  src: string;
  poster: string;
  alt: string;
  buttonLabel: string;
  className?: string;
  mediaClassName?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  fill?: boolean;
};

export function VideoCoverPlayer({
  src,
  poster,
  alt,
  buttonLabel,
  className,
  mediaClassName,
  priority = false,
  sizes = "100vw",
  width = 720,
  height = 400,
  fill = false,
}: VideoCoverPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      {isPlaying ? (
        <MutedInlineVideo
          src={src}
          poster={poster}
          preload="auto"
          className={cn("h-full w-full object-cover", mediaClassName)}
        />
      ) : (
        <>
          {fill ? (
            <Image
              src={poster}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className={cn("object-cover object-center", mediaClassName)}
            />
          ) : (
            <Image
              src={poster}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              className={cn("h-full w-full object-cover object-center", mediaClassName)}
            />
          )}
          <button
            type="button"
            aria-label={buttonLabel}
            className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/50 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-black/65 focus-visible:ring-2 focus-visible:ring-white/70 active:scale-95"
            onClick={() => setIsPlaying(true)}
          >
            <Play className="ml-1 h-7 w-7 fill-current" />
          </button>
        </>
      )}
    </div>
  );
}
