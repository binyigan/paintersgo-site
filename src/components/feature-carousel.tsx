"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Boxes,
  ImageUp,
  Layers3,
  Printer,
  Users,
  WandSparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type FeatureIconKey =
  | "wandSparkles"
  | "imageUp"
  | "layers3"
  | "boxes"
  | "wrench"
  | "users"
  | "printer";

export type FeatureCarouselItem = {
  id: string;
  icon: FeatureIconKey;
  iconClassName: string;
  title: string;
  description: string;
};

const iconByKey: Record<FeatureIconKey, LucideIcon> = {
  wandSparkles: WandSparkles,
  imageUp: ImageUp,
  layers3: Layers3,
  boxes: Boxes,
  wrench: Wrench,
  users: Users,
  printer: Printer,
};

const AUTO_ADVANCE_MS = 3200;

export function FeatureCarousel({ items }: { items: FeatureCarouselItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const safeItems = useMemo(() => items.filter(Boolean), [items]);

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
    const target = cardRefs.current[activeIndex];
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  if (safeItems.length === 0) {
    return null;
  }

  return (
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
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => setIsPaused(true)}
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
                "group w-[82vw] shrink-0 snap-center rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low p-6 text-left transition-all duration-300 sm:w-[27rem]",
                isActive
                  ? "bg-surface-container ring-2 ring-primary/40"
                  : "opacity-85 hover:opacity-100",
              )}
              onClick={() => {
                setIsPaused(true);
                setActiveIndex(index);
              }}
              aria-pressed={isActive}
            >
              <Icon className={cn("mb-5 h-8 w-8", item.iconClassName)} />
              <h3 className="mb-3 font-headline text-2xl font-bold text-on-surface">{item.title}</h3>
              <p className="text-base leading-relaxed text-on-surface-variant">{item.description}</p>
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
  );
}
