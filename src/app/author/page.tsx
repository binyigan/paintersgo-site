import type { Metadata } from "next";
import * as React from "react";

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
    body: React.ReactNode;
    accent: "primary" | "secondary" | "tertiary";
  }>;
};

const copyByLocale: Record<Locale, AuthorPageCopy> = {
  en: {
    metadataTitle: "About the Author - PaintersGO",
    metadataDescription: "View Gan Binyi's project resume and CV.",
    logoLabel: "PaintersGO",
    backLabel: "Back",
    switchLabel: "Language",
    englishLabel: "EN",
    chineseLabel: "中文",
    eyebrow: "Project Resume",
    title: "Gan Binyi",
    intro: "A mobile AI 3D product builder focusing on Android-native and AI-assisted workflows.",
    sections: [
      {
        title: "Full Resume",
        body: (
          <div className="mt-2">
            <p className="mb-4 text-sm opacity-80">Click the button below to view the detailed project experience and technical stack in PDF format.</p>
            <a
              href="/甘彬毅_cv.paintersgo.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:scale-[1.02] transition-transform"
            >
              📄 View Project Resume (PDF)
            </a>
          </div>
        ),
        accent: "primary",
      },
    ],
  },
  zh: {
    metadataTitle: "关于作者 - PaintersGO",
    metadataDescription: "查看甘彬毅的项目简历与简历详情。",
    logoLabel: "PaintersGO",
    backLabel: "返回",
    switchLabel: "语言",
    englishLabel: "EN",
    chineseLabel: "中文",
    eyebrow: "项目简历",
    title: "甘彬毅",
    intro: "面向移动端 AI 3D 创作的产品与工程实践者。我不是传统工程师，而是能用 AI 把 AI 3D 能力产品化的人。",
    sections: [
      {
        title: "完整简历",
        body: (
          <div className="mt-2">
            <p className="mb-4 text-sm opacity-80">点击下方按钮查看详细的项目经历、技术栈以及产品理念 PDF 文档。</p>
            <a
              href="/甘彬毅_cv.paintersgo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:scale-[1.02] transition-transform"
            >
              📄 查看项目简历 (PDF)
            </a>
          </div>
        ),
        accent: "primary",
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
      sections={t.sections as any} // 此处可能需要 as any 避免与原有子组件的严格 string 类型检查冲突
    />
  );
}
