import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  Brush,
  Download,
  Lightbulb,
  Rocket,
  Sparkles,
  UserRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About PaintersGO | 作者与开发故事",
  description:
    "了解 PaintersGO 作者的灵感来源、开发过程和这个个人作品背后的创作故事。",
};

const storyMoments = [
  {
    title: "起点不是官网，而是作品本身",
    body:
      "PaintersGO 最开始并不是为了做一个“好看的网站”，而是为了把移动端 3D 创作、协作和打印串起来。官网后来才成为讲清楚这个想法的窗口。",
  },
  {
    title: "灵感来自真实的创作断层",
    body:
      "很多 3D 工具擅长生成，很多工具擅长展示，但从“想法出现”到“多人协作”再到“实体成品”之间，体验经常是断开的。PaintersGO 想把这些环节接起来。",
  },
  {
    title: "网站本身也是一次产品叙事实验",
    body:
      "这次官网不是简单放截图，而是尝试让访客先看到真实模型、再试玩 Lite Viewer、再理解协作与 O2O 流程，让网页本身就像一次简化版产品体验。",
  },
] as const;

const inspirations = [
  "AI 生成工具的即时反馈感",
  "3D 创作流程里“从草图到成品”的完整链路",
  "Meshy、Tripo、Spine 等产品展示方式带来的启发",
  "移动端也能做有创造力的 3D 表达这件事本身",
] as const;

const buildNotes = [
  "用真实的 `ToTu.glb` 作为首屏模型，而不是抽象占位图。",
  "把 App 内已有的协作房间和 O2O 界面素材带到官网里，让网页内容更真实。",
  "额外做了一个 `Live Editor Lite`，让用户不用下载 App 也能先试看模型。",
  "不断在“作品展示”与“产品说明”之间找平衡，让它既像个人作品，也像真实可用的产品。",
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f0e3_0%,#fbfaf6_22%,#ffffff_48%,#f4ede1_100%)] text-zinc-950">
      <section className="px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <header className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-black/10 bg-white/78 px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
                PaintersGO
              </p>
              <p className="text-sm text-zinc-600">作者、灵感来源与开发故事</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                <ArrowLeft className="h-4 w-4" />
                返回首页
              </Link>
              <a
                href="/PaintersGO.apk"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                下载 APK
                <Download className="h-4 w-4" />
              </a>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <section className="rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-100/80 px-4 py-2 text-sm text-amber-900">
                <BookOpenText className="h-4 w-4" />
                Behind The Project
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.05]">
                这是一个个人作品，
                <span className="block text-zinc-500">也是一次把灵感、技术和产品表达放在一起的尝试。</span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700 md:text-lg">
                PaintersGO 不只是一个页面里的概念集合，而是围绕“AI 生成 3D、多人协作、在线试看与 O2O
                打印”展开的一次完整产品叙事实验。这个页面专门用来讲讲作者是谁、项目为什么会开始，以及它是怎么一点点长出来的。
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <article className="rounded-[1.5rem] border border-black/10 bg-zinc-950 p-5 text-white">
                  <UserRound className="h-5 w-5 text-zinc-300" />
                  <p className="mt-4 text-lg font-semibold">作者视角</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">
                    这是一个从个人兴趣、创作冲动和产品想象里长出来的作品。
                  </p>
                </article>
                <article className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                  <Lightbulb className="h-5 w-5 text-amber-700" />
                  <p className="mt-4 text-lg font-semibold">灵感来源</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">
                    来自对 AI、3D 创作工具和实体输出流程之间断层的观察。
                  </p>
                </article>
                <article className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                  <Rocket className="h-5 w-5 text-emerald-700" />
                  <p className="mt-4 text-lg font-semibold">开发过程</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">
                    从 App 素材、真实模型到官网互动展示，逐步把产品故事拼出来。
                  </p>
                </article>
              </div>
            </section>

            <aside className="grid gap-5">
              <section className="rounded-[2rem] border border-black/10 bg-[#181411] p-6 text-white shadow-[0_22px_70px_rgba(0,0,0,0.16)]">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
                  <Sparkles className="h-4 w-4" />
                  Project Snapshot
                </div>
                <div className="mt-5 grid gap-3">
                  {[
                    { label: "Project Type", value: "Personal work" },
                    { label: "Core Theme", value: "AI x 3D x Collaboration" },
                    { label: "Form", value: "App + Website storytelling" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-medium text-zinc-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-900">
                  <Brush className="h-4 w-4" />
                  Inspiration Seeds
                </div>
                <div className="mt-5 grid gap-3">
                  {inspirations.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.3rem] border border-black/8 bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700">
              Small Story
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              这不是一条标准产品流水线，更像一个人把脑海里的画面慢慢做成现实。
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {storyMoments.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.8rem] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
              >
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_22px_70px_rgba(0,0,0,0.06)] md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700">
              Build Notes
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              开发过程中，网站也逐渐变成了作品的一部分。
            </h2>
          </div>

          <div className="mt-8 grid gap-4">
            {buildNotes.map((item, index) => (
              <div
                key={item}
                className="grid gap-3 rounded-[1.5rem] border border-black/10 bg-zinc-50 px-5 py-5 md:grid-cols-[auto_1fr]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-zinc-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-18 pt-10 md:px-8 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-black/10 bg-[#13100d] p-8 text-white shadow-[0_24px_100px_rgba(0,0,0,0.18)] md:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Final Note</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            如果首页是在展示产品，这一页就在讲作品背后那个持续打磨它的人。
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300">
            目前这里先基于项目公开信息和产品方向整理出了一版作者叙事页。后续如果你愿意，我还可以继续把它写得更像你自己的声音，比如补上真实姓名、学校/经历、作品初衷、踩过的坑和最想表达的一句话。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/7 px-6 text-sm font-medium text-white transition hover:bg-white/12"
            >
              回到首页
            </Link>
            <a
              href="/PaintersGO.apk"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
            >
              下载 PaintersGO
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
