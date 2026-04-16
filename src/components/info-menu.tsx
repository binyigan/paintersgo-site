"use client";

import Link from "next/link";
import {
  ChevronRight,
  Languages,
  Layers3,
  Menu,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type InfoMenuCopy = {
  buttonLabel: string;
  authorTitle: string;
  workTitle: string;
  languageLabel: string;
  englishLabel: string;
  chineseLabel: string;
};

type InfoMenuProps = {
  locale: Locale;
  copy: InfoMenuCopy;
  authorHref: string;
  workHref: string;
  enHref: string;
  zhHref: string;
};

export function InfoMenu({
  locale,
  copy,
  authorHref,
  workHref,
  enHref,
  zhHref,
}: InfoMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-xl border border-outline-variant/15 text-on-surface transition-colors hover:border-primary/30 hover:bg-surface-container-highest"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">{copy.buttonLabel}</span>
      </button>

      <div
        className={cn(
          "pointer-events-none absolute right-0 top-[calc(100%+0.85rem)] z-50 w-[min(21rem,calc(100vw-2rem))] origin-top-right rounded-[1.25rem] border border-outline-variant/15 bg-surface-container/92 p-4 opacity-0 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300",
          open && "pointer-events-auto scale-100 opacity-100",
          !open && "scale-95",
        )}
      >
        <div className="grid gap-3">
          <Link
            href={authorHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl border border-outline-variant/10 bg-surface-container-high/80 px-4 py-3 text-on-surface transition-colors hover:border-primary/20 hover:bg-surface-container-highest"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/[0.12] text-primary">
              <UserRound className="h-4 w-4" />
            </span>
            <span className="flex-1 font-headline text-sm font-bold">{copy.authorTitle}</span>
            <ChevronRight className="h-4 w-4 text-on-surface-variant" />
          </Link>

          <Link
            href={workHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl border border-outline-variant/10 bg-surface-container-high/80 px-4 py-3 text-on-surface transition-colors hover:border-secondary/20 hover:bg-surface-container-highest"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/[0.12] text-secondary">
              <Layers3 className="h-4 w-4" />
            </span>
            <span className="flex-1 font-headline text-sm font-bold">{copy.workTitle}</span>
            <ChevronRight className="h-4 w-4 text-on-surface-variant" />
          </Link>

          <section className="rounded-2xl border border-outline-variant/10 bg-surface-container-high/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-tertiary-dim/[0.12] text-tertiary-dim">
                  <Languages className="h-4 w-4" />
                </span>
                <p className="font-headline text-sm font-bold text-on-surface">
                  {copy.languageLabel}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-outline-variant/10 bg-surface-container px-1 py-1">
                <Link
                  href={enHref}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                    locale === "en"
                      ? "bg-primary text-primary-foreground"
                      : "text-on-surface-variant hover:text-on-surface",
                  )}
                >
                  {copy.englishLabel}
                </Link>
                <Link
                  href={zhHref}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                    locale === "zh"
                      ? "bg-primary text-primary-foreground"
                      : "text-on-surface-variant hover:text-on-surface",
                  )}
                >
                  {copy.chineseLabel}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
