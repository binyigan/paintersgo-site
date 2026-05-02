"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Boxes,
  ImageUp,
  Layers3,
  ListTree,
  MousePointer2,
  Printer,
  ScanSearch,
  Users,
  WandSparkles,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { MutedInlineVideo } from "@/components/muted-inline-video";
import { VideoCoverPlayer } from "@/components/video-cover-player";

export type FeatureIconKey =
  | "wandSparkles"
  | "imageUp"
  | "layers3"
  | "boxes"
  | "listTree"
  | "scanSearch"
  | "mousePointer2"
  | "wrench"
  | "users"
  | "printer";

export type FeatureCarouselItem = {
  id: string;
  icon: FeatureIconKey;
  iconClassName: string;
  title: string;
  description: string;
  media: {
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
  };
};

const iconByKey: Record<FeatureIconKey, LucideIcon> = {
  wandSparkles: WandSparkles,
  imageUp: ImageUp,
  layers3: Layers3,
  boxes: Boxes,
  listTree: ListTree,
  scanSearch: ScanSearch,
  mousePointer2: MousePointer2,
  wrench: Wrench,
  users: Users,
  printer: Printer,
};

const AUTO_ADVANCE_MS = 3200;

export function FeatureCarousel({ items }: { items: FeatureCarouselItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const previewItem = previewIndex === null ? null : safeItems[previewIndex];

  useEffect(() => {
    if (safeItems.length === 0 || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeItems.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, safeItems.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const target = cardRefs.current[activeIndex];

    if (!scroller || !target) {
      return;
    }

    const left = target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2;

    scroller.scrollTo({
      left,
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!previewItem) {
      return;
    }

    const prevOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPreviewIndex(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewItem]);

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent"
        />

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onPointerDown={() => setIsPaused(true)}
          onKeyDown={() => setIsPaused(true)}
        >
          {safeItems.map((item, index) => {
            const Icon = iconByKey[item.icon];
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                type="button"
                className={cn(
                  "group relative flex min-h-[34rem] w-[82vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-surface-container focus-visible:ring-2 focus-visible:ring-primary/55 sm:w-[27rem]",
                  isActive ? "bg-surface-container ring-2 ring-primary/40" : "opacity-85 hover:opacity-100",
                )}
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex(index);
                  setPreviewIndex(index);
                }}
                aria-pressed={isActive}
                aria-label={`${item.title}: open media preview`}
              >
                {item.media.type === "video" ? (
                  <MutedInlineVideo
                    src={item.media.src}
                    poster={item.media.poster}
                    preload="metadata"
                    aria-label={item.media.alt}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <Image
                    src={item.media.src}
                    alt={item.media.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 640px) 27rem, 82vw"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.22)_36%,rgba(0,0,0,0.84)_100%)]"
                />
                <div className="relative z-10 mt-auto p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 backdrop-blur-md">
                    <Icon className={cn("h-5 w-5", item.iconClassName)} />
                  </div>
                  <h3 className="mb-3 font-headline text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-base leading-relaxed text-white/78">{item.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-secondary">Tap to preview</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {safeItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.id}-dot`}
                type="button"
                aria-label={item.title}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  isActive ? "w-8 bg-primary" : "bg-outline-variant",
                )}
                onClick={() => {
                  setIsPaused(true);
                  setActiveIndex(index);
                }}
              />
            );
          })}
        </div>
      </div>

      {previewItem ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewItem.title} media preview`}
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3 sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
              aria-label="Close preview"
              onClick={() => setPreviewIndex(null)}
            >
              <X className="h-5 w-5" />
            </button>

            {previewItem.media.type === "video" ? (
              <>
                <VideoCoverPlayer
                  src={previewItem.media.src}
                  poster={previewItem.media.poster ?? previewItem.media.src}
                  alt={previewItem.media.alt}
                  buttonLabel={`Play ${previewItem.title} video`}
                  width={576}
                  height={1280}
                  className="max-h-[78vh] w-full rounded-xl"
                  mediaClassName="rounded-xl object-contain"
                />
              </>
            ) : (
              <div className="relative h-[78vh] w-full overflow-hidden rounded-xl bg-black">
                <Image
                  src={previewItem.media.src}
                  alt={previewItem.media.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
