"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type MutedInlineVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "controls" | "muted" | "playsInline"
> & {
  src: string;
};

export function MutedInlineVideo({ src, onLoadedMetadata, ...props }: MutedInlineVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.removeAttribute("controls");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", "");
    video.setAttribute("x5-video-player-type", "h5-page");
    video.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");

    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        video.pause();
      });
    }
  }, []);

  return (
    <video
      {...props}
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      onLoadedMetadata={(event) => {
        const video = event.currentTarget;

        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        video.controls = false;
        video.removeAttribute("controls");
        onLoadedMetadata?.(event);
      }}
    />
  );
}
