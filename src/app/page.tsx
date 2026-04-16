import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, PenTool, Sparkles } from "lucide-react";

import { FeatureShowcaseShell } from "@/components/feature-showcase-shell";
import { ModelStage } from "@/components/model-stage";
import { resolveLocale, withLocale } from "@/lib/locale";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const aiModels = ["Meshy", "Tripo", "Hunyuan", "Rodin"];

const copyByLocale = {
  zh: {
    pageTitle: "PaintersGO | AI 驱动的 3D 协作创作平台",
    pageDescription:
      "PaintersGO 将 AI 3D 生成、协作房间、在线预览与 O2O 打印交付整合为一条完整创作链路。",
    brandSubtitle: "AI 驱动的 3D 协作创作平台",
    navFeatures: "核心能力",
    navAbout: "关于",
    navGallery: "作品展示",
    navDownload: "下载",
    heroBadge: "从 AI 草模到实体成品的一条龙创作链路",
    heroTitle: "PaintersGO",
    heroSubtitle: "把 3D 生成、协作编辑与打印输出收进同一个工作台",
    heroBody: "首屏展示真实 3D 模型，并串联 Web 预览、协作房间与 O2O 打印流程。",
    ctaDownload: "下载 APK",
    heroPoints: ["多模型 AI 后端", "协作房间", "O2O 打印链路"],
    featuresBadge: "核心能力",
    featuresTitle: "让用户一眼看懂 PaintersGO 是完整的 3D 协作工作流",
    featuresBody: "官网展示基于真实 App 素材与真实模型，不是概念图。",
    aiPowerTitle: "AI 能力矩阵",
    aiPowerBody: "支持多模型生成后端，并把真实应用预览、协作模块和交付流程统一到一个站点叙事里。",
    appPreviewAlt: "PaintersGO 应用预览",
    galleryBadge: "作品展示",
    galleryTitle: "展示用户真正愿意分享的 3D 创作成果",
    galleryItems: [
      { title: "画师小队角色", image: "/pic1.jpg" },
      { title: "协作共创生物", image: "/pic2.jpg" },
      { title: "可打印成品模型", image: "/pic3.jpg" },
    ],
    downloadBadge: "获取 PaintersGO",
    downloadTitle: "给用户一个明确、显眼、不会犹豫的下载入口",
    downloadBody: "当用户已经看过模型与流程后，这里应该是最顺滑的转化点。",
    androidLabel: "Android",
    googlePlayLabel: "Google Play",
    comingSoon: "即将上线",
    download: "下载",
    language: "语言",
  },
  en: {
    pageTitle: "PaintersGO | AI-powered 3D Co-Creation Platform",
    pageDescription:
      "PaintersGO integrates AI 3D generation, collaboration rooms, online preview, and O2O printing into one complete workflow.",
    brandSubtitle: "AI-powered 3D co-creation platform",
    navFeatures: "Features",
    navAbout: "About",
    navGallery: "Gallery",
    navDownload: "Download",
    heroBadge: "From AI rough model to physical output in one flow",
    heroTitle: "PaintersGO",
    heroSubtitle: "Bring 3D generation, collaboration editing, and printing into one workspace",
    heroBody: "The hero renders a real 3D model first, then leads into web preview, collaboration rooms, and O2O printing flow.",
    ctaDownload: "Download APK",
    heroPoints: ["Multi-model AI backend", "Collaboration rooms", "O2O fulfillment flow"],
    featuresBadge: "Core Features",
    featuresTitle: "Show at a glance that PaintersGO is a full 3D collaboration workflow",
    featuresBody: "This site uses real app assets and real models, not conceptual placeholders.",
    aiPowerTitle: "AI Power",
    aiPowerBody: "Multiple generation backends connect to real app previews, collaboration modules, and fulfillment flow in one coherent story.",
    appPreviewAlt: "PaintersGO app preview",
    galleryBadge: "Gallery",
    galleryTitle: "Showcase 3D outcomes users genuinely want to share",
    galleryItems: [
      { title: "Painter Character", image: "/pic1.jpg" },
      { title: "Collab Creature", image: "/pic2.jpg" },
      { title: "Printable Figure", image: "/pic3.jpg" },
    ],
    downloadBadge: "Get PaintersGO",
    downloadTitle: "Give users a clear, visible, low-friction download entry",
    downloadBody: "After model preview and workflow understanding, this should be the smoothest conversion point.",
    androidLabel: "Android",
    googlePlayLabel: "Google Play",
    comingSoon: "Coming Soon",
    download: "Download",
    language: "Language",
  },
} as const;

function languageButtonClass(active: boolean): string {
  return active
    ? "bg-zinc-950 text-white shadow-[0_10px_22px_rgba(24,24,27,0.14)]"
    : "bg-white text-zinc-700 hover:bg-zinc-100";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const locale = resolveLocale((await searchParams).lang);
  const t = copyByLocale[locale];

  return {
    title: t.pageTitle,
    description: t.pageDescription,
  };
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const locale = resolveLocale((await searchParams).lang);
  const t = copyByLocale[locale];

  const zhHref = withLocale("/", "zh");
  const enHref = withLocale("/", "en");
  const aboutHref = withLocale("/about", locale);
  const featureHref = withLocale("/#features", locale);
  const galleryHref = withLocale("/#gallery", locale);
  const downloadHref = withLocale("/#download", locale);

  return (
    <main className="overflow-x-hidden bg-[linear-gradient(180deg,#f5f0e6_0%,#f7f6f2_18%,#ffffff_42%,#f7f1e5_100%)] text-zinc-950">
      <section className="relative isolate px-4 pb-12 pt-4 sm:px-6 md:px-8 md:pb-16 md:pt-6 xl:pb-20 xl:pt-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,#ffdd9d_0%,rgba(255,221,157,0.16)_28%,transparent_70%)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <header className="flex flex-col gap-4 rounded-[1.75rem] border border-black/10 bg-white/72 px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:rounded-full">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-950">
                <Image src="/logo.png" alt="PaintersGO" width={26} height={26} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 sm:text-sm">
                  PaintersGO
                </p>
                <p className="text-sm leading-6 text-zinc-600">{t.brandSubtitle}</p>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-zinc-600 xl:flex">
              <a href={featureHref} className="transition hover:text-zinc-950">
                {t.navFeatures}
              </a>
              <Link href={aboutHref} className="transition hover:text-zinc-950">
                {t.navAbout}
              </Link>
              <a href={galleryHref} className="transition hover:text-zinc-950">
                {t.navGallery}
              </a>
              <a href={downloadHref} className="transition hover:text-zinc-950">
                {t.navDownload}
              </a>
            </nav>

            <div className="flex shrink-0 items-center gap-1 rounded-full border border-black/10 bg-white/82 p-1">
              <span className="hidden px-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500 sm:inline">
                {t.language}
              </span>
              <Link
                href={zhHref}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${languageButtonClass(locale === "zh")}`}
              >
                中文
              </Link>
              <Link
                href={enHref}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${languageButtonClass(locale === "en")}`}
              >
                EN
              </Link>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
            <section className="rounded-[2rem] border border-black/10 bg-[#0c0b0b] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:p-8 xl:p-10">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-400/35 bg-amber-100/12 px-4 py-2 text-sm text-amber-200">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="min-w-0">{t.heroBadge}</span>
              </div>

              <div className="mt-8 max-w-4xl">
                <h1 className="text-[clamp(3rem,10vw,6rem)] font-semibold leading-[0.92] tracking-tight">
                  {t.heroTitle}
                  <span className="mt-2 block text-zinc-300">{t.heroSubtitle}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
                  {t.heroBody}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/PaintersGO.apk"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
                >
                  {t.ctaDownload}
                  <Download className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {t.heroPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.35rem] border border-white/8 bg-white/5 px-4 py-4 text-sm font-semibold text-zinc-100"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-[2rem] border border-black/10 bg-[#14110f] p-4 shadow-[0_24px_80px_rgba(20,17,15,0.22)] sm:p-5">
              <ModelStage locale={locale} />
            </aside>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-12 sm:px-6 md:px-8 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700">
              {t.featuresBadge}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              {t.featuresTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-700 md:text-base">
              {t.featuresBody}
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(18rem,0.92fr)_minmax(0,1.08fr)]">
            <article className="rounded-[1.8rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.06)] sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{t.aiPowerTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-700">{t.aiPowerBody}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {aiModels.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-black/10 bg-zinc-50">
                <div className="relative h-56 sm:h-64">
                  <Image
                    src="/app-assets/demo_preview.webp"
                    alt={t.appPreviewAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </article>

            <FeatureShowcaseShell locale={locale} />
          </div>
        </div>
      </section>

      <section id="gallery" className="px-4 py-12 sm:px-6 md:px-8 md:py-16 xl:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700">
            {t.galleryBadge}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            {t.galleryTitle}
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {t.galleryItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-72">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="px-4 pb-16 pt-12 sm:px-6 md:px-8 md:pb-20 md:pt-16 xl:pb-24 xl:pt-20">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-black/10 bg-[#13100d] p-6 text-white shadow-[0_24px_100px_rgba(0,0,0,0.18)] sm:p-8 xl:p-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.02fr)_minmax(18rem,0.98fr)]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">{t.downloadBadge}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                {t.downloadTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">{t.downloadBody}</p>
            </div>

            <div className="grid gap-4">
              <a
                href="/PaintersGO.apk"
                className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/7 px-6 py-5 transition hover:bg-white/12"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                    {t.androidLabel}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{t.download}</p>
                </div>
                <Download className="h-6 w-6" />
              </a>

              <div className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                    {t.googlePlayLabel}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{t.comingSoon}</p>
                </div>
                <PenTool className="h-6 w-6 text-zinc-400" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
