import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Download,
  PenTool,
  Sparkles,
} from "lucide-react";

import { FeatureShowcaseShell } from "@/components/feature-showcase-shell";
import { LiveEditorLite } from "@/components/live-editor-lite";
import { ModelStage } from "@/components/model-stage";

const galleryItems = [
  {
    title: "Painter Character",
    description: "从移动端草图到完整上色的角色模型预览。",
    image: "/pic1.jpg",
  },
  {
    title: "Collab Creature",
    description: "适合在协作房间里持续迭代的共享模型。",
    image: "/pic2.jpg",
  },
  {
    title: "Printable Figure",
    description: "为 O2O 打印流程准备的展示与输出样例。",
    image: "/pic3.jpg",
  },
];

const aiModels = ["Meshy", "Tripo", "Hunyuan", "Rodin"];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[linear-gradient(180deg,#f5f0e6_0%,#f7f6f2_18%,#ffffff_42%,#f7f1e5_100%)] text-zinc-950">
      <section className="relative isolate px-6 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,#ffdd9d_0%,rgba(255,221,157,0.16)_30%,transparent_70%)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <header className="flex items-center justify-between rounded-full border border-black/10 bg-white/70 px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950">
                <Image src="/logo.png" alt="PaintersGO" width={26} height={26} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  PaintersGO
                </p>
                <p className="text-sm text-zinc-600">AI 驱动的 3D 协作创作平台</p>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
              <a href="#live-editor" className="transition hover:text-zinc-950">
                Live Editor Lite
              </a>
              <a href="#features" className="transition hover:text-zinc-950">
                Features
              </a>
              <a href="#gallery" className="transition hover:text-zinc-950">
                Gallery
              </a>
              <a href="#download" className="transition hover:text-zinc-950">
                Download
              </a>
            </nav>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <section className="rounded-[2rem] border border-black/10 bg-white/75 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-100/80 px-4 py-2 text-sm text-amber-900">
                <Sparkles className="h-4 w-4" />
                从 AI 草模到实体成品的一条龙创作链路
              </div>

              <div className="mt-7 max-w-3xl space-y-6">
                <h1 className="text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.02]">
                  PaintersGO
                  <span className="block text-zinc-500">
                    把 3D 生成、协作编辑与打印输出收进同一个工作台
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-zinc-700 md:text-lg">
                  首屏直接展示真实 3D 模型，往下滑就能试看 Web 预览器、理解多模型 AI
                  后端、协作房间，以及从手机屏幕走向实体 3D 打印件的完整流程。
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/PaintersGO.apk"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  下载 APK
                  <Download className="h-4 w-4" />
                </a>
                <a
                  href="#live-editor"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font-medium transition hover:bg-zinc-50"
                >
                  先试看模型
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <article className="rounded-[1.5rem] border border-black/10 bg-zinc-950 p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">AI Power</p>
                  <p className="mt-3 text-2xl font-semibold">多模型编排</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">
                    统一接入 Meshy、Tripo、Hunyuan、Rodin 等生成能力。
                  </p>
                </article>
                <article className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Collaboration</p>
                  <p className="mt-3 text-2xl font-semibold">协作房间</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">
                    创作、评审、打样三个角色能围绕同一个模型同步推进。
                  </p>
                </article>
                <article className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">O2O Printing</p>
                  <p className="mt-3 text-2xl font-semibold">线上到线下</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">
                    从移动端生成与检查，直接衔接实体打印与交付。
                  </p>
                </article>
              </div>
            </section>

            <aside className="rounded-[2rem] border border-black/10 bg-[#14110f] p-4 shadow-[0_24px_80px_rgba(20,17,15,0.22)]">
              <ModelStage />
            </aside>
          </div>
        </div>
      </section>

      <section id="live-editor" className="px-6 py-10 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/10 bg-zinc-950 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">
              Live Editor Lite
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              不装 App，也能先用浏览器试看 PaintersGO 模型
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-300">
              这一块先做成轻量 Web 预览器。用户可以拖拽旋转、切换显示模式、感受模型体积和材质方向，
              再决定要不要进入完整 App。
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "旋转查看真实模型，模拟 App 内基础审视体验",
                "切换 Clay / Wireframe / Studio 三种预览模式",
                "把“下载前先试看”的门槛降到最低",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <LiveEditorLite />
        </div>
      </section>

      <section id="features" className="px-6 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              让用户一眼看懂 PaintersGO 不只是“能生成”，而是一个完整的 3D 协作生产面板
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <article className="rounded-[1.8rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.06)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">AI Power</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-700">
                多模型后端统一调度，不锁死在单一生成引擎，让不同风格、速度和精度需求都能被覆盖。
              </p>
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
                <div className="relative h-52">
                  <Image
                    src="/app-assets/demo_preview.webp"
                    alt="PaintersGO app preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-sm leading-7 text-zinc-700">
                  官网这里展示的不是抽象概念，而是 App 里真实存在的生成与预览界面素材。
                </div>
              </div>
            </article>

            <FeatureShowcaseShell />
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_64px_rgba(0,0,0,0.06)]">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative min-h-[20rem]">
                <Image
                  src="/app-assets/ar.webp"
                  alt="PaintersGO mobile AR preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 p-8">
                <p className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-600">
                  <Boxes className="h-4 w-4" />
                  Product Story
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  把应用介绍从“功能堆砌”改成“可上手的产品体验”
                </h2>
                <p className="text-sm leading-7 text-zinc-700">
                  这一段承接 Hero 和编辑器，告诉用户 PaintersGO 不是一个孤立的模型生成工具，
                  而是一个连接创意输入、视觉检查、多人协作和实体输出的 3D 创作系统。
                </p>
                <div className="grid gap-3 pt-2">
                  <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm text-zinc-700">
                    适合把 Meshy / Tripo / Hunyuan 的能力统一成一套可控体验。
                  </div>
                  <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm text-zinc-700">
                    适合把“在线看看模型”转成真正的下载决策入口。
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_64px_rgba(0,0,0,0.06)]">
              <div className="relative h-56">
                <Image
                  src="/app-assets/video_to_3d1.webp"
                  alt="App refine workflow"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">从手机屏幕到打印件</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-700">
                  用真实界面和流程图把 O2O 制造过程可视化，比抽象文案更容易建立可信度。
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#171514] text-white shadow-[0_20px_64px_rgba(0,0,0,0.12)]">
              <div className="relative h-56">
                <Image
                  src="/app-assets/video_to_3d.webp"
                  alt="AI to 3D"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
                  App-grounded flow
                </div>
                <h3 className="text-xl font-semibold">从 AI 到 3D 成果的短路径</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  让访客快速感受到“文字/图像输入 -&gt; 可看可转的模型 -&gt; 更深度编辑”的产品节奏。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-6 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700">
                Gallery
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                展示用户真的会愿意分享的 3D 创作成果
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-zinc-700">
              这里不只是“放几张图”，而是把 PaintersGO 作为创作平台的结果质量展示出来。
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-72">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="px-6 pb-18 pt-10 md:px-8 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-black/10 bg-[#13100d] p-8 text-white shadow-[0_24px_100px_rgba(0,0,0,0.18)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Download</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                给用户一个明确、显眼、不会犹豫的下载入口
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">
                当用户已经在网页上看过模型、理解过协作和打印流程，这里就应该是最顺滑的转化点。
              </p>
            </div>

            <div className="grid gap-4">
              <a
                href="/PaintersGO.apk"
                className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/7 px-6 py-5 transition hover:bg-white/12"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Android</p>
                  <p className="mt-2 text-2xl font-semibold">Download APK</p>
                </div>
                <Download className="h-6 w-6" />
              </a>

              <div className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                    Google Play
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Coming Soon</p>
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
