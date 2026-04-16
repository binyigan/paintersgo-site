import type { Metadata } from "next";

import { DetailPageShell } from "@/components/detail-page-shell";
import type { Locale } from "@/lib/locale";
import { resolveLocale, withLocale } from "@/lib/locale";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type ProjectPageCopy = {
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

const copyByLocale: Record<Locale, ProjectPageCopy> = {
  en: {
    metadataTitle: "About the Project - PaintersGO",
    metadataDescription:
      "See how the PaintersGO concept is framed as a mobile-first AI 3D workflow.",
    logoLabel: "PaintersGO",
    backLabel: "Back to Home",
    switchLabel: "Language",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "Project",
    title: "PaintersGO as a mobile-first AI 3D workflow",
    intro:
      "The project is framed as an Android-native creative flow that connects generation, refinement, collaboration, and physical delivery into one consistent experience.",
    sections: [
      {
        title: "Creative Entry",
        body:
          "The journey begins with text or image input, making the first step accessible even when the user is starting from a rough idea.",
        accent: "primary",
      },
      {
        title: "Workflow Continuity",
        body:
          "Generation, repair, preview, and collaboration are treated as one connected system instead of scattered features across separate tools.",
        accent: "secondary",
      },
      {
        title: "Output Goal",
        body:
          "The final intent is not just to create a file, but to move toward a result that can be reviewed, exported, printed, and delivered.",
        accent: "tertiary",
      },
    ],
  },
  zh: {
    metadataTitle: "\u5173\u4e8e\u4f5c\u54c1 - PaintersGO",
    metadataDescription:
      "\u4e86\u89e3 PaintersGO \u5982\u4f55\u88ab\u8868\u8fbe\u6210\u4e00\u5957\u9762\u5411 Android \u7684 AI 3D \u5de5\u4f5c\u6d41\u3002",
    logoLabel: "PaintersGO",
    backLabel: "\u8fd4\u56de\u9996\u9875",
    switchLabel: "\u8bed\u8a00",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "\u4f5c\u54c1",
    title: "PaintersGO \u88ab\u5b9a\u4e49\u4e3a\u4e00\u5957\u79fb\u52a8\u7aef AI 3D \u5de5\u4f5c\u6d41",
    intro:
      "PaintersGO \u88ab\u8868\u8fbe\u6210\u4e00\u4e2a Android \u539f\u751f\u7684\u521b\u4f5c\u4f53\u9a8c\uff0c\u628a\u751f\u6210\u3001\u7cbe\u4fee\u3001\u534f\u4f5c\u4e0e\u5b9e\u4f53\u4ea4\u4ed8\u8fde\u5728\u540c\u4e00\u6761\u5b8c\u6574\u8def\u5f84\u4e0a\u3002",
    sections: [
      {
        title: "\u521b\u4f5c\u8d77\u70b9",
        body:
          "\u7528\u6237\u53ef\u4ee5\u4ece\u6587\u5b57\u6216\u56fe\u7247\u5f00\u59cb\uff0c\u8ba9\u7075\u611f\u5373\u4f7f\u8fd8\u5f88\u6a21\u7cca\uff0c\u4e5f\u80fd\u5feb\u901f\u8d70\u8fdb 3D \u6d41\u7a0b\u3002",
        accent: "primary",
      },
      {
        title: "\u6d41\u7a0b\u8fde\u7eed\u6027",
        body:
          "\u751f\u6210\u3001\u4fee\u590d\u3001\u9884\u89c8\u548c\u534f\u4f5c\u4e0d\u88ab\u62c6\u6210\u5206\u6563\u529f\u80fd\uff0c\u800c\u662f\u88ab\u5f53\u4f5c\u4e00\u5957\u8fde\u8d2f\u7684\u7cfb\u7edf\u6765\u8bbe\u8ba1\u3002",
        accent: "secondary",
      },
      {
        title: "\u8f93\u51fa\u76ee\u6807",
        body:
          "\u7ec8\u70b9\u4e0d\u53ea\u662f\u751f\u6210\u4e00\u4e2a\u6587\u4ef6\uff0c\u800c\u662f\u8d70\u5411\u53ef\u9884\u89c8\u3001\u53ef\u5bfc\u51fa\u3001\u53ef\u6253\u5370\u3001\u53ef\u4ea4\u4ed8\u7684\u771f\u5b9e\u7ed3\u679c\u3002",
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

export default async function ProjectPage({
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
      enHref={withLocale("/project", "en")}
      zhHref={withLocale("/project", "zh")}
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
