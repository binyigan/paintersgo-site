"use client";

import Image from "next/image";
import {
  Copy,
  MapPinned,
  MessageSquareShare,
  Printer,
  Radio,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const collabTabs = [
  {
    id: "create",
    label: "Create Room",
    eyebrow: "Collaboration Room",
    title: "创建房间，把当前模型变成共享工作现场",
    description:
      "这部分对应 App 里的协作房间入口。用户可以围绕当前模型生成房间码，让协作者在同一条 3D 语境里继续推进。",
    image: "/app-assets/teamwork1.webp",
    bullets: [
      "适合创作者直接发起协作会话",
      "保留模型上下文，而不是只发一张截图",
      "让评审和执行方围绕同一个 3D 结果对齐",
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
    title: "输入邀请码加入协作，直接进入同一个模型上下文",
    description:
      "加入房间不是抽象概念，而是 App 里已经存在的真实交互。官网这里把这个过程做成更直观的产品能力展示。",
    image: "/app-assets/teamwork2.webp",
    bullets: [
      "通过邀请码加入，不需要重新解释项目背景",
      "更适合多角色并行推进一个 3D 项目",
      "降低跨团队协作时的信息损耗",
    ],
    stats: [
      { label: "Join Path", value: "Invite code" },
      { label: "Roles", value: "Creator / Review / Maker" },
      { label: "Context", value: "Model-first" },
    ],
    icon: Copy,
  },
] as const;

const o2oTabs = [
  {
    id: "map",
    label: "Discovery",
    eyebrow: "O2O Screen",
    title: "从地图与角色视角切入，连接需求方、商家与制造方",
    description:
      "官网这里复刻的是 App 里 O2O 页面的真实视觉方向，而不是简单写一句“支持打印”。",
    image: "/app-assets/o2o1.webp",
    bullets: [
      "支持用户、商家、制造方不同角色视角",
      "地图式发现让线下服务能力更可理解",
      "让模型交付从“文件传输”升级成“服务流程”",
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
      { label: "Pipeline", value: "Confirm > Make > Ship" },
      { label: "Output", value: "Physical" },
      { label: "Value", value: "O2O" },
    ],
    icon: Printer,
  },
] as const;

type FeatureShowcaseProps = {
  activeCollab: string;
  activeO2O: string;
  onCollabChange: (id: string) => void;
  onO2OChange: (id: string) => void;
};

function TabPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-xs font-medium transition",
        active
          ? "bg-zinc-950 text-white"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      )}
    >
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
        "overflow-hidden rounded-[1.8rem] border shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-200",
        dark ? "border-white/10 bg-[#171514] text-white" : "border-black/10 bg-white"
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative min-h-[23rem]">
          <Image src={image} alt={title} fill className="object-cover" />
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
                  dark
                    ? "border-white/10 bg-white/5"
                    : "border-black/10 bg-white"
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
  activeCollab,
  activeO2O,
  onCollabChange,
  onO2OChange,
}: FeatureShowcaseProps) {
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
              Collaboration Module
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              把协作房间做成真正像产品内页的模块
            </h3>
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

        <AppPanel
          eyebrow={collab.eyebrow}
          title={collab.title}
          description={collab.description}
          image={collab.image}
          bullets={collab.bullets}
          stats={collab.stats}
          dark
        />
      </section>

      <section className="grid gap-4 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_64px_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              <O2OIcon className="h-4 w-4" />
              O2O Module
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              把打印与交付流程做成可切换、可理解的链路看板
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {o2oTabs.map((item) => (
              <TabPill
                key={item.id}
                active={item.id === activeO2O}
                label={item.label}
                onClick={() => onO2OChange(item.id)}
              />
            ))}
          </div>
        </div>

        <AppPanel
          eyebrow={o2o.eyebrow}
          title={o2o.title}
          description={o2o.description}
          image={o2o.image}
          bullets={o2o.bullets}
          stats={o2o.stats}
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              icon: Radio,
              label: "Map Discovery",
              body: "先找到合适商家与角色视角，让流程从“谁来做”开始清晰起来。",
            },
            {
              icon: MessageSquareShare,
              label: "Order & Confirm",
              body: "围绕模型沟通需求与产出标准，不再是抽象的文件发送。",
            },
            {
              icon: Printer,
              label: "Make & Deliver",
              body: "把生产、物流、交付状态纳入一条可见链路，强化 O2O 感知。",
            },
          ].map((item) => {
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
