import type { Metadata } from "next";

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
    body: string;
    accent: "primary" | "secondary" | "tertiary";
  }>;
};

const copyByLocale: Record<Locale, AuthorPageCopy> = {
  en: {
    metadataTitle: "About the Author - PaintersGO",
    metadataDescription:
      "Learn about Gan Binyi, the creator behind PaintersGO, and the CV context behind the project.",
    logoLabel: "PaintersGO",
    backLabel: "Back to Home",
    switchLabel: "Language",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "Creator",
    title: "Gan Binyi, a mobile AI 3D product builder",
    intro:
      "focuses on Android-native product development, interaction design, and AI-assisted 3D creation workflows.",
    sections: [
      {
        title: "Education",
        body:
          " The CV frames PaintersGO as the main project practice.",
        accent: "primary",
      },
      {
        title: "Direction",
        body:
          "The author works across mobile interfaces, AI product prototyping, and 3D creation flows that can move from idea to preview and output.",
        accent: "secondary",
      },
      {
        title: "PaintersGO",
        body:
          "PaintersGO is listed as an AI-assisted text/image-to-3D creation app, developed as a product, design, and Android engineering practice.",
        accent: "tertiary",
      },
      {
        title: "Stack",
        body:
          "The CV mentions Android, Kotlin, Jetpack Compose, WebView, GLB/STL workflows, Firebase Remote Config, Git/GitHub, and cloud deployment.",
        accent: "primary",
      },
      {
        title: "AI Tools",
        body:
          "The development process uses AI coding and research tools including ChatGPT, Claude, Gemini, Cursor, and Android Studio.",
        accent: "secondary",
      },
      {
        title: "Links",
        body:
          "Project site: https://paintersgo.top. GitHub: https://github.com/binyigan. Email: binyigan@gmail.com.",
        accent: "tertiary",
      },
    ],
  },
  zh: {
    metadataTitle: "\u5173\u4e8e\u4f5c\u8005 - PaintersGO",
    metadataDescription:
      "了解 PaintersGO 作者甘彬毅的简历背景、项目方向与联系方式。",
    logoLabel: "PaintersGO",
    backLabel: "\u8fd4\u56de\u9996\u9875",
    switchLabel: "\u8bed\u8a00",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "\u4f5c\u8005",
    title: "甘彬毅：面向移动端 AI 3D 创作的产品与工程实践者",
    intro:
      "关注 Android 原生开发、界面与交互体验，以及 AI 辅助 3D 创作流程的产品化落地。",
    sections: [
      {
        title: "教育背景",
        body:
          "简历中将 PaintersGO 作为主要项目实践展开。",
        accent: "primary",
      },
      {
        title: "实践方向",
        body:
          "围绕移动端界面、AI 产品原型和 3D 创作链路展开，从灵感输入、模型预览到最终输出都纳入产品体验。",
        accent: "secondary",
      },
      {
        title: "项目经历",
        body:
          "PaintersGO 被整理为 AI 辅助型文生图/图生 3D 创作应用，是产品设计、Android 3D 应用开发与完整叙事表达的综合实践。",
        accent: "tertiary",
      },
      {
        title: "技术栈",
        body:
          "简历中涉及 Android、Kotlin、Jetpack Compose、WebView、GLB/STL 流程、Firebase Remote Config、Git/GitHub 与云端部署。",
        accent: "primary",
      },
      {
        title: "AI 工具",
        body:
          "开发过程结合 ChatGPT、Claude、Gemini、Cursor 与 Android Studio，用 AI 辅助资料整理、代码实现、问题定位和迭代优化。",
        accent: "secondary",
      },
      {
        title: "联系方式",
        body:
          "项目站点：https://paintersgo.top；GitHub：https://github.com/binyigan；邮箱：binyigan@gmail.com。",
        accent: "tertiary",
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
