import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Lightbulb, Rocket, UserRound } from "lucide-react";

import { resolveLocale, withLocale } from "@/lib/locale";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const copyByLocale = {
  zh: {
    pageTitle: "关于 PaintersGO | 作者与开发故事",
    pageDescription: "了解 PaintersGO 作者的灵感来源、开发过程和项目背后的创作故事。",
    subtitle: "作者、灵感来源与开发故事",
    backHome: "返回首页",
    download: "下载 APK",
    title: "这是一个个人作品，也是一次把灵感、技术和产品表达放在一起的尝试。",
    body:
      "PaintersGO 不只是页面里的概念集合，而是围绕 AI 生成 3D、多人协作、在线试看与 O2O 打印展开的一次完整产品叙事实验。",
    cards: [
      { icon: UserRound, title: "作者视角", body: "从个人兴趣、创作冲动和产品想象中长出来的作品。" },
      { icon: Lightbulb, title: "灵感来源", body: "来自对 AI、3D 工具和实体输出流程之间断层的观察。" },
      { icon: Rocket, title: "开发过程", body: "从 App 素材、真实模型到官网互动展示，逐步把故事拼起来。" },
    ],
    sections: [
      {
        title: "起点不是官网，而是作品本身",
        body: "最开始目标不是做一个好看的网站，而是把移动端 3D 创作、协作和打印串起来。官网后来成为讲清想法的窗口。",
      },
      {
        title: "灵感来自真实的创作断层",
        body: "很多工具擅长生成，很多工具擅长展示，但从想法到协作再到实体成品之间经常是断开的。PaintersGO 希望把它们接起来。",
      },
      {
        title: "网站本身也是一次产品叙事实验",
        body: "先看真实模型、再试玩 Lite Viewer、再理解协作与 O2O 流程，让网页本身像一次简化版产品体验。",
      },
    ],
    finalNote: "如果首页在展示产品，这一页就在讲背后那个持续打磨它的人。",
  },
  en: {
    pageTitle: "About PaintersGO | Author Story",
    pageDescription: "Learn inspirations and the build journey behind PaintersGO from the author perspective.",
    subtitle: "Author, inspirations, and build story",
    backHome: "Back to Home",
    download: "Download APK",
    title: "This is a personal project and an attempt to align inspiration, technology, and product storytelling.",
    body:
      "PaintersGO is not just a set of page concepts. It is a full narrative experiment around AI-to-3D creation, multi-user collaboration, online preview, and O2O printing.",
    cards: [
      { icon: UserRound, title: "Author View", body: "A project grown from personal interest, creative impulse, and product imagination." },
      { icon: Lightbulb, title: "Inspiration", body: "Born from observing gaps between AI generation, 3D tools, and physical output." },
      { icon: Rocket, title: "Build Journey", body: "From app assets and real models to web interaction, the story was assembled step by step." },
    ],
    sections: [
      {
        title: "The starting point was the product itself, not the website",
        body: "The first goal was not to build a pretty website, but to connect mobile 3D creation, collaboration, and printing into one coherent flow.",
      },
      {
        title: "Inspiration came from real workflow gaps",
        body: "Many tools are good at generation and many are good at display, but the path from idea to collaboration to physical output is often disconnected.",
      },
      {
        title: "The website is also a product narrative experiment",
        body: "Show real model first, then Lite Viewer, then collaboration and O2O flow, so the page itself feels like a simplified product walkthrough.",
      },
    ],
    finalNote: "If the homepage shows the product, this page tells the story of the person continuously refining it.",
  },
} as const;

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

export default async function AboutPage({ searchParams }: { searchParams: SearchParams }) {
  const locale = resolveLocale((await searchParams).lang);
  const t = copyByLocale[locale];

  const homeHref = withLocale("/", locale);
  const zhHref = withLocale("/about", "zh");
  const enHref = withLocale("/about", "en");

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f0e3_0%,#fbfaf6_22%,#ffffff_48%,#f4ede1_100%)] text-zinc-950">
      <section className="px-4 pb-12 pt-4 sm:px-6 md:px-8 md:pb-16 md:pt-6 xl:pb-20 xl:pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <header className="flex flex-col gap-4 rounded-[1.75rem] border border-black/10 bg-white/78 px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:rounded-full">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">PaintersGO</p>
              <p className="text-sm text-zinc-600">{t.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={zhHref} className={`rounded-full border border-black/10 px-3 py-2 text-xs ${locale === "zh" ? "bg-zinc-950 text-white" : "bg-white text-zinc-700"}`}>
                中文
              </Link>
              <Link href={enHref} className={`rounded-full border border-black/10 px-3 py-2 text-xs ${locale === "en" ? "bg-zinc-950 text-white" : "bg-white text-zinc-700"}`}>
                EN
              </Link>
              <Link href={homeHref} className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
                <ArrowLeft className="h-4 w-4" />
                {t.backHome}
              </Link>
              <a href="/PaintersGO.apk" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800">
                {t.download}
                <Download className="h-4 w-4" />
              </a>
            </div>
          </header>

          <section className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8 xl:p-10">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.05]">{t.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700 md:text-lg">{t.body}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {t.cards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[1.5rem] border border-black/10 bg-zinc-50 p-5">
                    <Icon className="h-5 w-5 text-zinc-700" />
                    <p className="mt-4 text-lg font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-700">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="grid gap-5 md:grid-cols-3">
            {t.sections.map((section) => (
              <article key={section.title} className="rounded-[1.8rem] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
                <p className="text-lg font-semibold">{section.title}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-700">{section.body}</p>
              </article>
            ))}
          </div>

          <section className="rounded-[2rem] border border-black/10 bg-[#13100d] p-8 text-white shadow-[0_24px_100px_rgba(0,0,0,0.18)] md:p-10">
            <p className="text-2xl font-semibold tracking-tight md:text-4xl">{t.finalNote}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
