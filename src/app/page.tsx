import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Download,
  Globe2,
  ImageUp,
  Layers3,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  WandSparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PaintersGO - AI-Driven 3D Modeling on Android",
  description:
    "The all-in-one AI-powered 3D modeling studio. Transform text or images into detailed 3D models and print them directly from your phone.",
};

const engines = ["Meshy", "Rodin", "Tripo", "Hunyuan"];

type FeatureCardConfig = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  className?: string;
  image?: string;
  imageAlt?: string;
  variant?: "stacked" | "split";
};

const featureCards: FeatureCardConfig[] = [
  {
    title: "AI Text-to-3D",
    description:
      "Simply describe your vision in plain text. PaintersGO routes the request through powerful generation engines and turns prompts into rich 3D forms in seconds.",
    icon: WandSparkles,
    iconClassName: "text-primary",
    className: "md:col-span-2 lg:col-span-2",
    image: "/app-assets/video_to_3d1.webp",
    imageAlt: "PaintersGO text-to-3D generation preview",
    variant: "stacked",
  },
  {
    title: "AI Image-to-3D",
    description:
      "Upload a single image to reconstruct volume, silhouette, and depth so ideas can move into 3D without complex desktop tooling.",
    icon: ImageUp,
    iconClassName: "text-secondary",
  },
  {
    title: "Multi-Engine",
    description:
      "Switch between Meshy, Rodin, Tripo, and Hunyuan to match the model style, speed, or fidelity you need for the task.",
    icon: Layers3,
    iconClassName: "text-tertiary-dim",
  },
  {
    title: "Real-Time 3D Editor",
    description:
      "Inspect, orbit, refine, and preview directly from a mobile-first viewport designed to keep creation fast and tactile.",
    icon: Boxes,
    iconClassName: "text-primary-fixed",
  },
  {
    title: "Cloud Model Repair",
    description:
      "Instantly close mesh issues, repair normals, and clean geometry for reliable exports and production-ready printable output.",
    icon: Wrench,
    iconClassName: "text-error",
    className: "md:col-span-2 lg:col-span-2",
    image: "/app-assets/demo_refine.webp",
    imageAlt: "PaintersGO model refinement and repair preview",
    variant: "split",
  },
  {
    title: "Multi-User Collab",
    description:
      "Bring teammates into shared rooms for synchronized feedback, review, and model decisions around the same creative context.",
    icon: Users,
    iconClassName: "text-secondary-fixed",
  },
  {
    title: "O2O Printing",
    description:
      "Move from digital model to physical delivery with one connected workflow for review, production, and final fulfillment.",
    icon: Printer,
    iconClassName: "text-primary",
  },
];

const steps = [
  {
    number: "1",
    title: "Input Inspiration",
    description: "Upload reference images or type descriptive prompts to start the concept.",
  },
  {
    number: "2",
    title: "AI Generation",
    description: "Choose the engine that best fits the style and generate the initial 3D result.",
  },
  {
    number: "3",
    title: "Refine & Repair",
    description: "Clean topology, repair mesh quality, and tune the output for presentation or print.",
  },
  {
    number: "4",
    title: "Collaborate",
    description: "Invite others into the process to review, comment, and align on the model.",
  },
  {
    number: "5",
    title: "Print & Export",
    description: "Order physical output or export production-ready files for downstream use.",
  },
];

const techCards = [
  {
    title: "Kotlin + Jetpack Compose",
    description: "Native Android UI for fluid motion, responsive interaction, and efficient threading.",
    borderClassName: "border-primary",
    textClassName: "text-primary",
  },
  {
    title: "Three.js + WebView Bridge",
    description: "High-performance 3D rendering with mobile-friendly interaction and preview control.",
    borderClassName: "border-secondary",
    textClassName: "text-secondary",
  },
  {
    title: "Firebase Remote Config",
    description: "Dynamic parameter control for engines, quality tuning, and rollout experimentation.",
    borderClassName: "border-tertiary-dim",
    textClassName: "text-tertiary-dim",
  },
  {
    title: "Multi-Provider Architecture",
    description: "A unified orchestration layer connecting top-tier AI generation providers in one app.",
    borderClassName: "border-primary-fixed",
    textClassName: "text-primary-fixed",
  },
  {
    title: "Secure API Storage",
    description: "Protected credential handling and safer provider access for production-grade operation.",
    borderClassName: "border-error",
    textClassName: "text-error",
  },
];

function FeatureCard({ card }: { card: FeatureCardConfig }) {
  const Icon = card.icon;

  if (card.variant === "split" && card.image && card.imageAlt) {
    return (
      <article
        className={cn(
          "group rounded-[1.5rem] border-t border-outline-variant/15 bg-surface-container-low p-8",
          card.className,
        )}
      >
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:max-w-sm">
            <Icon className={cn("mb-6 h-10 w-10", card.iconClassName)} />
            <h3 className="mb-3 font-headline text-xl font-bold text-on-surface">{card.title}</h3>
            <p className="text-sm leading-relaxed text-on-surface-variant">{card.description}</p>
          </div>

          <div className="relative h-40 w-full overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container-lowest md:flex-1">
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group rounded-[1.5rem] border-t border-outline-variant/15 bg-surface-container-low p-8",
        card.className,
      )}
    >
      <Icon className={cn("mb-6 h-10 w-10", card.iconClassName)} />
      <h3 className="mb-3 font-headline text-xl font-bold text-on-surface">{card.title}</h3>
      <p className="text-sm leading-relaxed text-on-surface-variant">{card.description}</p>

      {card.image && card.imageAlt ? (
        <div className="relative mt-6 h-48 overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container-lowest">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : null}
    </article>
  );
}

export default function Home() {
  return (
    <main id="top" className="overflow-x-hidden">
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(71,0,124,0.08)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 font-headline tracking-tight md:px-8">
          <Link
            href="/"
            className="bg-gradient-to-br from-primary to-primary-dim bg-clip-text text-2xl font-bold text-transparent"
          >
            PaintersGO
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="border-b-2 border-primary pb-1 text-sm font-bold text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-on-surface/70 transition-colors hover:text-on-surface"
            >
              How it Works
            </a>
            <a
              href="#tech-stack"
              className="text-sm text-on-surface/70 transition-colors hover:text-on-surface"
            >
              Tech Stack
            </a>
          </div>

          <a
            href="/PaintersGO.apk"
            className="bg-primary-gradient inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_15px_rgba(83,221,252,0.15)] transition-transform duration-300 hover:scale-95 active:scale-90"
          >
            Download
          </a>
        </nav>
      </header>

      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8">
        <div
          aria-hidden="true"
          className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/20 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/12 blur-[100px]"
        />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="relative z-10 animate-[fade-in_0.7s_ease-out_both]">
            <h1 className="mb-6 max-w-4xl font-headline text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              PaintersGO: From Inspiration to <span className="text-secondary">3D Realities</span>{" "}
              on Android
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              The all-in-one AI-powered 3D modeling studio. Transform text or images into
              detailed 3D models and print them directly from your phone.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/PaintersGO.apk"
                className="bg-primary-gradient inline-flex min-h-14 items-center gap-3 rounded-lg px-8 py-4 text-lg font-bold text-primary-foreground transition-transform duration-300 hover:scale-95 active:scale-90"
              >
                <Download className="h-5 w-5" />
                Download APK for Android
              </a>
            </div>
          </div>

          <div className="relative group">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-primary/20 blur-[100px]"
            />

            <div className="glass-panel glow-shadow relative overflow-hidden rounded-[2rem] border border-outline-variant/15 p-6 shadow-2xl sm:p-8 lg:rounded-[999px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.10),transparent_42%),radial-gradient(circle_at_78%_82%,rgba(83,221,252,0.10),transparent_24%)]"
              />

              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] lg:rounded-[999px]">
                <Image
                  src="/AR.png"
                  alt="PaintersGO Android augmented reality preview"
                  fill
                  priority
                  className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-outline-variant/15 bg-surface-container-low py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mb-8 text-center font-label text-xs uppercase tracking-[0.32em] text-on-surface-variant">
            Powered by Industry Leading Engines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 md:gap-24">
            {engines.map((engine) => (
              <span key={engine} className="font-headline text-2xl font-bold text-on-surface">
                {engine}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              Core Creative Engine
            </h2>
            <p className="text-on-surface-variant">
              High-fidelity 3D generation, repair, collaboration, and delivery in one mobile
              workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {featureCards.map((card) => (
              <FeatureCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-surface-container-low px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              Sculpting in Five Steps
            </h2>
            <p className="text-on-surface-variant">
              From concept to physical object with minimal friction.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-5">
            <div
              aria-hidden="true"
              className="absolute left-6 right-6 top-6 hidden border-t border-dashed border-outline-variant/30 md:block"
            />

            {steps.map((step) => (
              <div key={step.number} className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-secondary/30 bg-surface-container-highest font-headline font-bold text-secondary">
                  {step.number}
                </div>
                <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech-stack" className="bg-background px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
                Under the Hood
              </h2>
              <p className="text-on-surface-variant">
                A professional-grade mobile architecture shaped for AI-native 3D creation.
              </p>
            </div>
            <div className="hidden text-right md:block">
              <span className="font-mono text-sm text-tertiary">PaintersGO-Core v2.4.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techCards.map((card) => (
              <article
                key={card.title}
                className={cn(
                  "rounded-lg border-l-2 bg-surface-container-highest p-6",
                  card.borderClassName,
                )}
              >
                <h3 className={cn("mb-2 font-headline text-lg font-bold", card.textClassName)}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {card.description}
                </p>
              </article>
            ))}

            <article className="rounded-lg border-l-2 border-secondary-fixed bg-surface-container-highest p-6">
              <h3 className="mb-2 flex items-center gap-2 font-headline text-lg font-bold text-secondary-fixed">
                <Sparkles className="h-4 w-4" />
                AI Workflow Quality
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Prompt orchestration, preview iteration, and device-native polish work together
                so the app feels like one coherent studio instead of a stack of disconnected tools.
              </p>
            </article>

            <article className="rounded-lg border-l-2 border-primary bg-surface-container-highest p-6">
              <h3 className="mb-2 flex items-center gap-2 font-headline text-lg font-bold text-primary">
                <ShieldCheck className="h-4 w-4" />
                Production Readiness
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Repair, export, collaboration, and fulfillment are treated as first-class steps,
                making the pipeline more reliable for real-world output.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="download" className="overflow-hidden px-6 py-24 md:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-outline-variant/15 bg-surface-container-high p-12 text-center">
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[80px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-[80px]"
          />

          <div className="relative z-10">
            <h2 className="mb-8 font-headline text-4xl font-bold text-on-surface md:text-5xl">
              Start Your 3D Journey Today
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              Join artists, makers, and creative teams already moving from concept to physical
              form with PaintersGO.
            </p>

            <a
              href="/PaintersGO.apk"
              className="bg-primary-gradient inline-flex min-h-14 items-center gap-4 rounded-lg px-10 py-5 text-xl font-bold text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Download className="h-5 w-5" />
              Get the App Now
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-outline-variant/15 bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-8">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-headline text-lg font-bold text-on-surface">PaintersGO</span>
            <p className="font-body text-sm text-on-surface/50">
              (c) 2025 PaintersGO. Sculpting the future of 3D.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 font-body text-sm">
            <a
              href="#features"
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              How it Works
            </a>
            <a
              href="#download"
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              Download
            </a>
            <a
              href="#tech-stack"
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              Tech Stack
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="https://paintersgo.top"
              aria-label="PaintersGO website"
              className="text-on-surface/30 transition-colors hover:text-primary"
            >
              <Globe2 className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/binyigan/paintersgo-site"
              target="_blank"
              rel="noreferrer"
              aria-label="Share repository"
              className="text-on-surface/30 transition-colors hover:text-primary"
            >
              <Share2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
