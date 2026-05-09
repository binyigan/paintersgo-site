import type { Metadata } from "next";
import { FileText } from "lucide-react";
import type { ReactNode } from "react";

import { DetailPageShell } from "@/components/detail-page-shell";
import type { Locale } from "@/lib/locale";
import { resolveLocale, withLocale } from "@/lib/locale";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type AuthorPageCopy = {
  metadataTitle: string;
  metadataDescription: string;
  logoLabel: string;
  backLabel: string;
  switchLabel: string;
  englishLabel: string;
  chineseLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    body: ReactNode;
    accent: "primary" | "secondary" | "tertiary";
    featured?: boolean;
  }>;
};

const englishResumeHref = "/cv/gan-binyi-project-resume-en.pdf";
const chineseResumeHref = "/cv/gan-binyi-project-resume-zh.pdf";
const resumeButtonClassName =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-outline-variant/25 bg-surface-container-high px-5 py-3 font-bold text-on-surface transition-colors hover:border-primary/45 hover:bg-surface-container-highest sm:w-auto sm:min-w-56";

const copyByLocale: Record<Locale, AuthorPageCopy> = {
  en: {
    metadataTitle: "About the Author - PaintersGO",
    metadataDescription: "View Gan Binyi's PaintersGO project resume.",
    logoLabel: "PaintersGO",
    backLabel: "Back",
    switchLabel: "Language",
    englishLabel: "EN",
    chineseLabel: "中文",
    eyebrow: "Project Resume",
    title: "Gan Binyi",
    intro:
      'Not born different, but better at using the right tools. A mobile AI 3D product builder focused on Android-native and AI-assisted workflows.',
    sections: [
      {
        title: "AI-Native Builder",
        body:
          "I use AI as a production partner across requirement breakdown, code generation, debugging, review, and acceptance testing, while keeping product and architecture decisions personally owned.",
        accent: "primary",
      },
      {
        title: "PaintersGO 0 to 1",
        body:
          "PaintersGO was built as a mobile-first AI 3D creation prototype, connecting text/image generation, provider orchestration, mobile editing, repair, export, and collaboration experiments.",
        accent: "secondary",
      },
      {
        title: "Product Judgment",
        body:
          "My focus is the gap between impressive AI output and usable 3D assets: topology quality, polygon budget, mobile performance, secondary editing, and printable delivery.",
        accent: "tertiary",
      },
      {
        title: "Project Resume",
        body: (
          <div className="mt-2 space-y-4">
            <p>
              Read how PaintersGO went from an idea to a working Android AI 3D
              creation prototype, including the product decisions, technical stack,
              and AI-assisted development process.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={englishResumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={resumeButtonClassName}
              >
                <FileText className="h-4 w-4" />
                View English PDF
              </a>
              <a
                href={chineseResumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={resumeButtonClassName}
              >
                <FileText className="h-4 w-4" />
                View Chinese PDF
              </a>
            </div>
          </div>
        ),
        accent: "primary",
        featured: true,
      },
    ],
  },
  zh: {
    metadataTitle: "关于作者 - PaintersGO",
    metadataDescription: "查看甘彬毅的 PaintersGO 作品简历。",
    logoLabel: "PaintersGO",
    backLabel: "返回",
    switchLabel: "语言",
    englishLabel: "EN",
    chineseLabel: "中文",
    eyebrow: "项目简历",
    title: "甘彬毅",
    intro:
      "君子性非异也，善假于物也。面向移动端 AI 3D 创作的产品与工程实践者，重点探索如何用 AI 把 AI 3D 能力产品化。",
    sections: [
      {
        title: "AI-native 构建者",
        body:
          "我把 AI 当作生产协作者，用于需求拆解、代码生成、调试复现、方案对比与验收测试，同时自己把握产品判断和架构取舍。",
        accent: "primary",
      },
      {
        title: "PaintersGO 从 0 到 1",
        body:
          "PaintersGO 被构建为面向移动端的 AI 3D 创作原型，串联文字/图片生成、多服务商编排、移动端编辑、模型修复、导出与协作实验。",
        accent: "secondary",
      },
      {
        title: "产品判断",
        body:
          "我关注的是 AI 生成结果到可用 3D 资产之间的距离：拓扑质量、多边形预算、移动端性能、二次编辑和可打印交付。",
        accent: "tertiary",
      },
      {
        title: "作品简历",
        body: (
          <div className="mt-2 space-y-4">
            <p>
              了解 PaintersGO 如何从一个想法变成可运行的 Android AI 3D 创作原型，
              包括产品判断、技术栈和 AI 辅助开发过程。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={chineseResumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={resumeButtonClassName}
              >
                <FileText className="h-4 w-4" />
                查看中文 PDF
              </a>
              <a
                href={englishResumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={resumeButtonClassName}
              >
                <FileText className="h-4 w-4" />
                View English PDF
              </a>
            </div>
          </div>
        ),
        accent: "primary",
        featured: true,
      },
    ],
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const locale = resolveLocale((await searchParams).lang);
  const t = copyByLocale[locale];

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
  };
}

export default async function AuthorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const locale = resolveLocale((await searchParams).lang);
  const t = copyByLocale[locale];

  return (
    <DetailPageShell
      locale={locale}
      homeHref={withLocale("/", locale)}
      enHref={withLocale("/author", "en")}
      zhHref={withLocale("/author", "zh")}
      logoLabel={t.logoLabel}
      backLabel={t.backLabel}
      switchLabel={t.switchLabel}
      englishLabel={t.englishLabel}
      chineseLabel={t.chineseLabel}
      eyebrow={t.eyebrow}
      title={t.title}
      intro={t.intro}
      sections={t.sections}
    />
  );
}
