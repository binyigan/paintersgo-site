"use client";

import Image from "next/image";
import {
  Copy,
  Dot,
  MapPinned,
  MessageSquareShare,
  Printer,
  Radio,
  type LucideIcon,
  Users,
} from "lucide-react";

import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type FeatureShowcaseProps = {
  locale?: Locale;
  activeCollab: string;
  activeO2O: string;
  onCollabChange: (id: string) => void;
  onO2OChange: (id: string) => void;
};

type FeatureTab = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  bullets: string[];
  stats: { label: string; value: string }[];
  icon: LucideIcon;
};

const collabTabsByLocale: Record<Locale, FeatureTab[]> = {
  zh: [
    {
      id: "create",
      label: "创建房间",
      eyebrow: "协作房间",
      title: "创建房间，把当前模型变成共享工作现场",
      description:
        "这一模块对应 App 内的协作房间入口。创作者可以围绕当前模型生成房间码，让协作者在同一条 3D 语境里持续推进。",
      image: "/app-assets/teamwork1.webp",
      bullets: [
        "适合创作者直接发起协作会话",
        "保留模型上下文，而不是只发一张截图",
        "让评审和执行方围绕同一个 3D 结果对齐",
      ],
      stats: [
        { label: "房间码", value: "6 位" },
        { label: "模型范围", value: "共享" },
        { label: "同步方式", value: "实时" },
      ],
      icon: Users,
    },
    {
      id: "join",
      label: "加入房间",
      eyebrow: "邀请流程",
      title: "输入邀请码加入协作，直接进入同一个模型上下文",
      description:
        "加入房间不是抽象概念，而是 App 里已有的真实交互。官网在这里把这个流程做成可理解、可感知的能力展示。",
      image: "/app-assets/teamwork2.webp",
      bullets: [
        "通过邀请码加入，不需要反复解释项目背景",
        "更适合多角色并行推进同一个 3D 项目",
        "降低跨团队协作时的信息损耗",
      ],
      stats: [
        { label: "加入方式", value: "邀请码" },
        { label: "角色", value: "创作 / 评审 / 制造" },
        { label: "上下文", value: "模型优先" },
      ],
      icon: Copy,
    },
  ],
  en: [
    {
      id: "create",
      label: "Create Room",
      eyebrow: "Collaboration Room",
      title: "Create a room and turn the current model into a shared workspace",
      description:
        "This module maps to the in-app collaboration entry. Creators can generate a room code from the current model and keep teammates aligned in one 3D context.",
      image: "/app-assets/teamwork1.webp",
      bullets: [
        "Great for starting collaboration sessions instantly",
        "Preserves model context instead of sharing only screenshots",
        "Keeps review and execution teams aligned on one 3D result",
      ],
      stats: [
        { label: "Room Code", value: "6-digit" },
        { label: "Model Scope", value: "Shared" },
        { label: "Sync Intent", value: "Live" },
      ],
      icon: Users,
    },
    {
      id: "join",
      label: "Join Room",
      eyebrow: "Invite Flow",
      title: "Join with an invite code and enter the same model context immediately",
      description:
        "Joining a room is not conceptual here. It mirrors real interactions already in the app and makes the capability explicit on the website.",
      image: "/app-assets/teamwork2.webp",
      bullets: [
        "Join with invite code, no repeated project explanation",
        "Fits multi-role parallel execution for one 3D project",
        "Reduces context loss across teams",
      ],
      stats: [
        { label: "Join Path", value: "Invite code" },
        { label: "Roles", value: "Creator / Review / Maker" },
        { label: "Context", value: "Model-first" },
      ],
      icon: Copy,
    },
  ],
};

const o2oTabsByLocale: Record<Locale, FeatureTab[]> = {
  zh: [
    {
      id: "map",
      label: "服务发现",
      eyebrow: "O2O 页面",
      title: "从地图与角色视角切入，连接需求方、商家与制造方",
      description:
        "官网这里复刻的是 App 里 O2O 页面真实的视觉方向，而不是简单写一句“支持打印”。",
      image: "/app-assets/o2o1.webp",
      bullets: [
        "支持用户、商家、制造方不同角色视角",
        "地图式发现让线下服务能力更可理解",
        "让模型交付从“文件传输”升级成“服务流程”",
      ],
      stats: [
        { label: "角色切换", value: "3 种" },
        { label: "入口", value: "地图优先" },
        { label: "流程阶段", value: "发现" },
      ],
      icon: MapPinned,
    },
    {
      id: "logistics",
      label: "交付流程",
      eyebrow: "履约链路",
      title: "把确认、生产、物流和打印状态都纳入同一条可见链路",
      description:
        "这一段更像生产流程看板，强调 PaintersGO 的终点不是停在模型生成，而是走向实体交付。",
      image: "/app-assets/o2o2.webp",
      bullets: [
        "从模型选择进入订单与执行过程",
        "支持制造与物流阶段的状态反馈",
        "把线上创作真正延伸到线下成品",
      ],
      stats: [
        { label: "流程", value: "确认 > 生产 > 发货" },
        { label: "输出", value: "实体" },
        { label: "价值", value: "O2O" },
      ],
      icon: Printer,
    },
  ],
  en: [
    {
      id: "map",
      label: "Discovery",
      eyebrow: "O2O Screen",
      title: "Start from map and role views to connect demand, merchants, and makers",
      description:
        "This section recreates the real O2O visual direction from the app instead of only claiming “printing supported.”",
      image: "/app-assets/o2o1.webp",
      bullets: [
        "Supports distinct views for users, merchants, and makers",
        "Map-style discovery makes offline service capability clearer",
        "Upgrades model delivery from “file transfer” to “service flow”",
      ],
      stats: [
        { label: "Role Switch", value: "3 states" },
        { label: "Entry", value: "Map-first" },
        { label: "Flow", value: "Discovery" },
      ],
      icon: MapPinned,
    },
    {
      id: "logistics",
      label: "Fulfillment",
      eyebrow: "Fulfillment Flow",
      title: "Bring confirmation, production, logistics, and print status into one visible chain",
      description:
        "This acts like an operations board and highlights that PaintersGO does not stop at model generation, but continues to physical delivery.",
      image: "/app-assets/o2o2.webp",
      bullets: [
        "Move from model selection into order execution",
        "Track manufacturing and logistics status",
        "Extend online creation into offline outcomes",
      ],
      stats: [
        { label: "Pipeline", value: "Confirm > Make > Ship" },
        { label: "Output", value: "Physical" },
        { label: "Value", value: "O2O" },
      ],
      icon: Printer,
    },
  ],
};

const sectionCopy = {
  zh: {
    collabBadge: "协作模块",
    collabHeading: "把协作房间做成真正像产品内页的模块",
    autoStoryMode: "自动故事轮播",
    o2oBadge: "O2O 模块",
    o2oHeading: "把打印与交付流程做成可切换、可理解的链路看板",
    guidedWalkthrough: "引导式讲解",
    processCards: [
      {
        icon: Radio,
        label: "地图发现",
        body: "先找到合适商家和角色视角，让流程从“谁来做”开始清晰起来。",
      },
      {
        icon: MessageSquareShare,
        label: "下单确认",
        body: "围绕模型沟通需求和产出标准，不再只是抽象地发送文件。",
      },
      {
        icon: Printer,
        label: "生产交付",
        body: "把生产、物流、交付状态纳入可见链路，强化 O2O 感知。",
      },
    ],
  },
  en: {
    collabBadge: "Collaboration Module",
    collabHeading: "Turn collaboration rooms into a product-grade module",
    autoStoryMode: "Auto story mode",
    o2oBadge: "O2O Module",
    o2oHeading: "Make printing and fulfillment a switchable, understandable flow board",
    guidedWalkthrough: "Guided walkthrough",
    processCards: [
      {
        icon: Radio,
        label: "Map Discovery",
        body: "Find the right merchants and role views first so ownership in the workflow is clear.",
      },
      {
        icon: MessageSquareShare,
        label: "Order & Confirm",
        body: "Align requirements and output standards around the model, not via abstract file passing.",
      },
      {
        icon: Printer,
        label: "Make & Deliver",
        body: "Bring production, logistics, and delivery status into one visible chain to strengthen O2O clarity.",
      },
    ],
  },
} as const;

function TabPill({
  active,
  label,
  onClick,
  accent = "neutral",
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  accent?: "neutral" | "emerald";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition duration-200",
        active
          ? accent === "emerald"
            ? "bg-emerald-700 text-white shadow-[0_10px_24px_rgba(5,150,105,0.25)]"
            : "bg-zinc-950 text-white shadow-[0_10px_24px_rgba(24,24,27,0.18)]"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full transition",
          active ? "bg-current opacity-100" : "bg-zinc-400 opacity-55"
        )}
      />
      {label}
    </button>
  );
}

function AppPanel({
  eyebrow,
  title,
  description,
  image,
  bullets,
  stats,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  bullets: readonly string[];
  stats: readonly { label: string; value: string }[];
  dark?: boolean;
}) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[1.8rem] border shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-300",
        dark ? "border-white/10 bg-[#171514] text-white" : "border-black/10 bg-white"
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="group relative min-h-[23rem] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <div
            className={cn(
              "absolute inset-0",
              dark
                ? "bg-[linear-gradient(180deg,transparent_20%,rgba(12,10,9,0.2)_100%)]"
                : "bg-[linear-gradient(180deg,transparent_30%,rgba(255,255,255,0.08)_100%)]"
            )}
          />
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div>
            <p
              className={cn(
                "text-xs uppercase tracking-[0.24em]",
                dark ? "text-zinc-400" : "text-zinc-500"
              )}
            >
              {eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3>
            <p
              className={cn(
                "mt-3 text-sm leading-7",
                dark ? "text-zinc-300" : "text-zinc-700"
              )}
            >
              {description}
            </p>
          </div>

          <div className="grid gap-3">
            {bullets.map((item) => (
              <div
                key={item}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-7",
                  dark
                    ? "border border-white/10 bg-white/5 text-zinc-200"
                    : "bg-zinc-50 text-zinc-700"
                )}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "rounded-2xl border px-4 py-4",
                  dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"
                )}
              >
                <p
                  className={cn(
                    "text-[11px] uppercase tracking-[0.2em]",
                    dark ? "text-zinc-400" : "text-zinc-500"
                  )}
                >
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeatureShowcase({
  locale = "zh",
  activeCollab,
  activeO2O,
  onCollabChange,
  onO2OChange,
}: FeatureShowcaseProps) {
  const collabTabs = collabTabsByLocale[locale];
  const o2oTabs = o2oTabsByLocale[locale];
  const sectionText = sectionCopy[locale];

  const collab = collabTabs.find((item) => item.id === activeCollab) ?? collabTabs[0];
  const o2o = o2oTabs.find((item) => item.id === activeO2O) ?? o2oTabs[0];
  const CollabIcon = collab.icon;
  const O2OIcon = o2o.icon;

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_64px_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-600">
              <CollabIcon className="h-4 w-4" />
              {sectionText.collabBadge}
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">{sectionText.collabHeading}</h3>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              <Dot className="h-4 w-4" />
              {sectionText.autoStoryMode}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {collabTabs.map((item) => (
              <TabPill
                key={item.id}
                active={item.id === activeCollab}
                label={item.label}
                onClick={() => onCollabChange(item.id)}
              />
            ))}
          </div>
        </div>

        <div key={collab.id} className="animate-[fade-in_280ms_ease-out]">
          <AppPanel
            eyebrow={collab.eyebrow}
            title={collab.title}
            description={collab.description}
            image={collab.image}
            bullets={collab.bullets}
            stats={collab.stats}
            dark
          />
        </div>
      </section>

      <section className="grid gap-4 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_64px_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              <O2OIcon className="h-4 w-4" />
              {sectionText.o2oBadge}
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">{sectionText.o2oHeading}</h3>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-700">
              <Dot className="h-4 w-4" />
              {sectionText.guidedWalkthrough}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {o2oTabs.map((item) => (
              <TabPill
                key={item.id}
                active={item.id === activeO2O}
                label={item.label}
                accent="emerald"
                onClick={() => onO2OChange(item.id)}
              />
            ))}
          </div>
        </div>

        <div key={o2o.id} className="animate-[fade-in_280ms_ease-out]">
          <AppPanel
            eyebrow={o2o.eyebrow}
            title={o2o.title}
            description={o2o.description}
            image={o2o.image}
            bullets={o2o.bullets}
            stats={o2o.stats}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {sectionText.processCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-black/10 bg-zinc-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-zinc-700 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-700">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
