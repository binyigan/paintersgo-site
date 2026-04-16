import Link from "next/link";
import { ArrowLeft, Languages } from "lucide-react";

import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type Accent = "primary" | "secondary" | "tertiary";

type DetailSection = {
  title: string;
  body: string;
  accent: Accent;
};

type DetailPageShellProps = {
  locale: Locale;
  homeHref: string;
  enHref: string;
  zhHref: string;
  logoLabel: string;
  backLabel: string;
  switchLabel: string;
  englishLabel: string;
  chineseLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: DetailSection[];
};

function accentClassName(accent: Accent): string {
  if (accent === "secondary") {
    return "border-secondary/25 bg-secondary/[0.08] text-secondary";
  }

  if (accent === "tertiary") {
    return "border-tertiary-dim/25 bg-tertiary-dim/[0.08] text-tertiary-dim";
  }

  return "border-primary/25 bg-primary/[0.08] text-primary";
}

export function DetailPageShell({
  locale,
  homeHref,
  enHref,
  zhHref,
  logoLabel,
  backLabel,
  switchLabel,
  englishLabel,
  chineseLabel,
  eyebrow,
  title,
  intro,
  sections,
}: DetailPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden px-6 pb-20 pt-10 md:px-8">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/16 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-20 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-16 flex flex-col gap-4 rounded-[1.5rem] border border-outline-variant/15 bg-surface-container/80 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={homeHref}
              className="bg-gradient-to-br from-primary to-primary-dim bg-clip-text font-headline text-xl font-bold text-transparent"
            >
              {logoLabel}
            </Link>
            <Link
              href={homeHref}
              className="inline-flex items-center gap-2 rounded-xl border border-outline-variant/15 px-3 py-2 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-outline-variant/15 bg-surface-container-high/80 px-3 py-2">
            <Languages className="h-4 w-4 text-tertiary-dim" />
            <span className="text-xs uppercase tracking-[0.22em] text-on-surface-variant">
              {switchLabel}
            </span>
            <div className="flex items-center gap-1 rounded-lg bg-surface-container px-1 py-1">
              <Link
                href={enHref}
                className={cn(
                  "rounded-md px-3 py-2 text-xs font-semibold transition-colors",
                  locale === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-on-surface-variant hover:text-on-surface",
                )}
              >
                {englishLabel}
              </Link>
              <Link
                href={zhHref}
                className={cn(
                  "rounded-md px-3 py-2 text-xs font-semibold transition-colors",
                  locale === "zh"
                    ? "bg-primary text-primary-foreground"
                    : "text-on-surface-variant hover:text-on-surface",
                )}
              >
                {chineseLabel}
              </Link>
            </div>
          </div>
        </header>

        <section className="mb-12 rounded-[2rem] border border-outline-variant/15 bg-surface-container-high/80 p-8 backdrop-blur-xl md:p-10">
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-tertiary-dim">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl font-headline text-4xl font-bold leading-tight text-on-surface md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            {intro}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-low p-6"
            >
              <span
                className={cn(
                  "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                  accentClassName(section.accent),
                )}
              >
                {section.title}
              </span>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">{section.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
