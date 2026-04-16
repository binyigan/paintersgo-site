"use client";

import Link from "next/link";
import {
  ChevronDown,
  Download,
  Languages,
  Layers3,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type QuickLink = {
  href: string;
  label: string;
  tone: "primary" | "secondary" | "neutral" | "download";
};

type InfoMenuCopy = {
  buttonLabel: string;
  buttonHint: string;
  authorTitle: string;
  authorBody: string;
  workTitle: string;
  workBody: string;
  languageLabel: string;
  quickLinksLabel: string;
  englishLabel: string;
  chineseLabel: string;
};

type InfoMenuProps = {
  locale: Locale;
  copy: InfoMenuCopy;
  quickLinks: QuickLink[];
  enHref: string;
  zhHref: string;
};

function quickLinkClassName(tone: QuickLink["tone"]): string {
  if (tone === "download") {
    return "bg-primary-gradient text-primary-foreground hover:brightness-110";
  }

  if (tone === "primary") {
    return "border-primary/30 bg-primary/10 text-primary hover:bg-primary/[0.16]";
  }

  if (tone === "secondary") {
    return "border-secondary/25 bg-secondary/10 text-secondary hover:bg-secondary/[0.16]";
  }

  return "border-outline-variant/15 bg-surface-container-high text-on-surface hover:bg-surface-container-highest";
}

export function InfoMenu({ locale, copy, quickLinks, enHref, zhHref }: InfoMenuProps) {
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
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
        className="glass-panel inline-flex min-h-11 items-center gap-3 rounded-xl border border-outline-variant/15 px-4 py-2 text-left text-on-surface transition-colors hover:border-primary/30 hover:bg-surface-container-highest"
      >
        <span className="hidden h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.14] text-primary sm:inline-flex">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="hidden flex-col sm:flex">
          <span className="text-sm font-bold">{copy.buttonLabel}</span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-on-surface-variant">
            {copy.buttonHint}
          </span>
        </span>
        <span className="text-sm font-bold sm:hidden">{copy.buttonLabel}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-on-surface-variant transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "pointer-events-none absolute right-0 top-[calc(100%+0.85rem)] z-50 w-[min(25rem,calc(100vw-2rem))] origin-top-right rounded-[1.4rem] border border-outline-variant/15 bg-surface-container/92 p-5 opacity-0 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300",
          open && "pointer-events-auto scale-100 opacity-100",
          !open && "scale-95",
        )}
      >
        <div className="grid gap-4">
          <section className="rounded-2xl border border-outline-variant/10 bg-surface-container-high/80 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/[0.12] text-primary">
                <UserRound className="h-4 w-4" />
              </span>
              <div>
                <p className="font-headline text-sm font-bold text-on-surface">
                  {copy.authorTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {copy.authorBody}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-outline-variant/10 bg-surface-container-high/80 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/[0.12] text-secondary">
                <Layers3 className="h-4 w-4" />
              </span>
              <div>
                <p className="font-headline text-sm font-bold text-on-surface">{copy.workTitle}</p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{copy.workBody}</p>
              </div>
            </div>
          </section>

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

          <section className="rounded-2xl border border-outline-variant/10 bg-surface-container-high/80 p-4">
            <p className="mb-3 font-headline text-sm font-bold text-on-surface">
              {copy.quickLinksLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                    quickLinkClassName(link.tone),
                  )}
                >
                  {link.tone === "download" ? <Download className="mr-2 h-4 w-4" /> : null}
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
