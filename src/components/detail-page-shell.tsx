import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Languages } from "lucide-react";

import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type Accent = "primary" | "secondary" | "tertiary";

type DetailSection = {
  title: string;
  body: string;
  accent: Accent;
};

type ArchiveImage = {
  src: string;
  alt: string;
};

type ArchivePreviewGroup = {
  id: string;
  title: string;
  intro: string;
  images: ArchiveImage[];
  fullHref: string;
  fullLabel: string;
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
  archiveTitle?: string;
  archiveIntro?: string;
  archiveGroups?: ArchivePreviewGroup[];
  archiveBackHref?: string;
  archiveBackLabel?: string;
  archiveImages?: ArchiveImage[];
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
  archiveTitle,
  archiveIntro,
  archiveGroups = [],
  archiveBackHref,
  archiveBackLabel,
  archiveImages = [],
}: DetailPageShellProps) {
  const hasArchive = archiveGroups.length > 0 || archiveImages.length > 0;

  return (
    <main className="relative min-h-screen overflow-x-hidden px-4 pb-20 pt-10 sm:px-6 md:px-8">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/16 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-20 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-5xl">
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

        <section className="mb-12 rounded-[2rem] border border-outline-variant/15 bg-surface-container-high/80 p-6 backdrop-blur-xl md:p-10">
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-tertiary-dim">
            {eyebrow}
          </p>
          <h1 className="text-wrap-anywhere max-w-3xl font-headline text-3xl font-bold leading-tight text-on-surface sm:text-4xl md:text-6xl">
            {title}
          </h1>
          <p className="text-wrap-anywhere mt-6 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
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
              <p className="text-wrap-anywhere mt-4 text-sm leading-7 text-on-surface-variant">{section.body}</p>
            </article>
          ))}
        </section>

        {hasArchive ? (
          <section className="mt-12">
            <div className="mb-8 max-w-3xl">
              {archiveTitle ? (
                <h2 className="font-headline text-3xl font-bold text-on-surface md:text-4xl">
                  {archiveTitle}
                </h2>
              ) : null}
              {archiveIntro ? (
                <p className="text-wrap-anywhere mt-4 text-base leading-7 text-on-surface-variant">
                  {archiveIntro}
                </p>
              ) : null}
            </div>

            {archiveGroups.length > 0 ? (
              <>
                <nav
                  aria-label={archiveTitle}
                  className="mb-6 flex flex-wrap gap-3"
                >
                  {archiveGroups.map((group) => (
                    <Link
                      key={group.id}
                      href={`#${group.id}`}
                      className="rounded-full border border-outline-variant/15 bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:border-primary/35 hover:text-on-surface"
                    >
                      {group.title}
                    </Link>
                  ))}
                </nav>

                <div className="grid gap-6 md:grid-cols-2">
                  {archiveGroups.map((group) => (
                    <article
                      key={group.id}
                      id={group.id}
                      className="scroll-mt-8 rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-low p-5"
                    >
                      <h3 className="font-headline text-2xl font-bold text-on-surface">
                        {group.title}
                      </h3>
                      <p className="text-wrap-anywhere mt-3 text-sm leading-7 text-on-surface-variant">
                        {group.intro}
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {group.images.map((image, index) => (
                          <figure
                            key={image.src}
                            className="overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container"
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={720}
                              height={960}
                              sizes="(max-width: 768px) 45vw, 220px"
                              className="aspect-[3/4] w-full object-cover object-top"
                              priority={index === 0}
                            />
                          </figure>
                        ))}
                      </div>
                      <Link
                        href={group.fullHref}
                        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-primary/25 bg-primary/[0.08] px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        {group.fullLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            ) : null}

            {archiveBackHref && archiveBackLabel ? (
              <Link
                href={archiveBackHref}
                className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-outline-variant/15 px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:text-on-surface"
              >
                <ArrowLeft className="h-4 w-4" />
                {archiveBackLabel}
              </Link>
            ) : null}

            {archiveImages.length > 0 ? (
              <div className="grid gap-6">
                {archiveImages.map((image, index) => (
                  <figure
                    key={image.src}
                    className="overflow-hidden rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-low"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1440}
                      height={2400}
                      sizes="(max-width: 1024px) 100vw, 960px"
                      className="h-auto w-full"
                      priority={index === 0}
                    />
                  </figure>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
}
