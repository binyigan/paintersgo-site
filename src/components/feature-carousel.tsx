"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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

const DRAG_CANCEL_PX = 10;
const DRAG_RESET_MS = 80;
const SCROLL_SETTLE_MS = 120;

export function FeatureCarousel({ items }: { items: FeatureCarouselItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollSettleTimerRef = useRef<number | null>(null);
  const pointerResetTimerRef = useRef<number | null>(null);
  const pointerStateRef = useRef({
    dragging: false,
    moved: false,
    x: 0,
    y: 0,
  });

  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const previewItem = previewIndex === null ? null : safeItems[previewIndex];

  const getClosestIndex = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return activeIndex;
    }

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - center);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [activeIndex]);

  const closePreview = useCallback(() => {
    setPreviewIndex(null);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollSettleTimerRef.current !== null) {
        window.clearTimeout(scrollSettleTimerRef.current);
      }

      if (pointerResetTimerRef.current !== null) {
        window.clearTimeout(pointerResetTimerRef.current);
      }
    };
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    const target = cardRefs.current[index];

    if (!scroller || !target) {
      return;
    }

    const left = target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scroller.scrollTo({
      left,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const currentScroller = scroller;

    function handleScroll() {
      if (scrollSettleTimerRef.current !== null) {
        window.clearTimeout(scrollSettleTimerRef.current);
      }

      scrollSettleTimerRef.current = window.setTimeout(() => {
        scrollSettleTimerRef.current = null;
        setActiveIndex((current) => {
          const closestIndex = getClosestIndex();

          return current === closestIndex ? current : closestIndex;
        });
      }, SCROLL_SETTLE_MS);
    }

    currentScroller.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      currentScroller.removeEventListener("scroll", handleScroll);

      if (scrollSettleTimerRef.current !== null) {
        window.clearTimeout(scrollSettleTimerRef.current);
        scrollSettleTimerRef.current = null;
      }
    };
  }, [getClosestIndex, safeItems.length]);

  useEffect(() => {
    if (!previewItem) {
      return;
    }

    const prevOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePreview();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePreview, previewItem]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerResetTimerRef.current !== null) {
      window.clearTimeout(pointerResetTimerRef.current);
      pointerResetTimerRef.current = null;
    }

    pointerStateRef.current = {
      dragging: true,
      moved: false,
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerState = pointerStateRef.current;

    if (!pointerState.dragging) {
      return;
    }

    const deltaX = Math.abs(event.clientX - pointerState.x);
    const deltaY = Math.abs(event.clientY - pointerState.y);

    if (deltaX > DRAG_CANCEL_PX || deltaY > DRAG_CANCEL_PX) {
      pointerState.moved = true;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    pointerStateRef.current.dragging = false;
    pointerResetTimerRef.current = window.setTimeout(() => {
      pointerStateRef.current.moved = false;
      pointerResetTimerRef.current = null;
    }, DRAG_RESET_MS);
  }, []);

  const openPreview = useCallback((index: number) => {
    setActiveIndex(index);
    setPreviewIndex(index);
  }, []);

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
          className="flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerCancel={handlePointerUp}
          onPointerUp={handlePointerUp}
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
                  "group relative flex min-h-[28rem] w-[84vw] shrink-0 snap-center overflow-hidden rounded-[1.25rem] border border-outline-variant/20 bg-surface-container-low text-left transition-colors duration-200 hover:border-primary/35 hover:bg-surface-container focus-visible:ring-2 focus-visible:ring-primary/55 sm:w-[27rem] md:min-h-[34rem] md:rounded-[1.5rem]",
                  isActive ? "bg-surface-container ring-2 ring-primary/40" : "opacity-85 hover:opacity-100",
                )}
                onClick={(event) => {
                  if (pointerStateRef.current.moved) {
                    event.preventDefault();
                    return;
                  }

                  openPreview(index);
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
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.media.src}
                    alt={item.media.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 27rem, 82vw"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.22)_36%,rgba(0,0,0,0.84)_100%)]"
                />
                <div className="relative z-10 mt-auto p-5 md:p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 backdrop-blur-md md:mb-5">
                    <Icon className={cn("h-5 w-5", item.iconClassName)} />
                  </div>
                  <h3 className="mb-3 font-headline text-xl font-bold text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/78 md:text-base">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-secondary">Tap to preview</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 md:mt-6 md:gap-2">
          {safeItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.id}-dot`}
                type="button"
                aria-label={item.title}
                aria-current={isActive ? "true" : undefined}
                className="flex h-9 min-w-9 items-center justify-center rounded-full transition focus-visible:ring-2 focus-visible:ring-primary/55"
                onClick={() => {
                  setActiveIndex(index);
                  scrollToCard(index);
                }}
              >
                <span
                  className={cn(
                    "block h-2.5 rounded-full transition-all duration-300",
                    isActive ? "w-9 bg-primary" : "w-2.5 bg-outline-variant",
                  )}
                />
              </button>
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
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3 sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
              aria-label="Close preview"
              onClick={closePreview}
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
