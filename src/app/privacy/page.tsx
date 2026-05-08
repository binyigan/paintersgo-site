import type { Metadata } from "next";

import { DetailPageShell } from "@/components/detail-page-shell";
import type { Locale } from "@/lib/locale";
import { resolveLocale, withLocale } from "@/lib/locale";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type PrivacyPageCopy = {
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

const copyByLocale: Record<Locale, PrivacyPageCopy> = {
  en: {
    metadataTitle: "Privacy and Safety - PaintersGO",
    metadataDescription:
      "A concise privacy and safety note for the PaintersGO Android APK and AI 3D workflow.",
    logoLabel: "PaintersGO",
    backLabel: "Back to Home",
    switchLabel: "Language",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "Privacy and Safety",
    title: "A clear note on APK installs, AI inputs, and user content",
    intro:
      "PaintersGO involves mobile installation, AI generation, image inputs, and model files. This page explains the practical boundaries users should understand before trying the APK.",
    sections: [
      {
        title: "APK Install",
        body:
          "The APK is offered directly from this website. Android may ask for permission to install apps from the browser, and users should only install the package from a source they trust.",
        accent: "primary",
      },
      {
        title: "User Inputs",
        body:
          "Text prompts, reference images, and model files can be part of the creative workflow. Users should avoid uploading private, sensitive, confidential, or rights-restricted material.",
        accent: "secondary",
      },
      {
        title: "AI Providers",
        body:
          "Some generation or repair workflows may rely on external AI services. Inputs may need to be sent to those providers so the requested result can be produced.",
        accent: "tertiary",
      },
      {
        title: "Local Files",
        body:
          "The app concept includes local repository and export flows. Users should still keep their own backups of important models before editing, deleting, or exporting assets.",
        accent: "primary",
      },
      {
        title: "Preview Status",
        body:
          "PaintersGO is presented as a product preview and portfolio project. Availability, provider behavior, and production policies can change as the app matures.",
        accent: "secondary",
      },
      {
        title: "Safer Use",
        body:
          "Use non-sensitive test assets first, review generated results before sharing or printing, and make sure you have the right to use uploaded references commercially.",
        accent: "tertiary",
      },
    ],
  },
  zh: {
    metadataTitle: "\u9690\u79c1\u4e0e\u5b89\u5168 - PaintersGO",
    metadataDescription:
      "PaintersGO Android APK \u548c AI 3D \u5de5\u4f5c\u6d41\u7684\u7b80\u660e\u9690\u79c1\u4e0e\u5b89\u5168\u8bf4\u660e\u3002",
    logoLabel: "PaintersGO",
    backLabel: "\u8fd4\u56de\u9996\u9875",
    switchLabel: "\u8bed\u8a00",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "\u9690\u79c1\u4e0e\u5b89\u5168",
    title: "\u5173\u4e8e APK \u5b89\u88c5\u3001AI \u8f93\u5165\u548c\u7528\u6237\u5185\u5bb9\u7684\u6e05\u6670\u8bf4\u660e",
    intro:
      "PaintersGO \u6d89\u53ca\u79fb\u52a8\u7aef\u5b89\u88c5\u3001AI \u751f\u6210\u3001\u56fe\u7247\u8f93\u5165\u548c\u6a21\u578b\u6587\u4ef6\u3002\u5728\u4f53\u9a8c APK \u4e4b\u524d\uff0c\u7528\u6237\u5e94\u8be5\u5148\u7406\u89e3\u8fd9\u4e9b\u5b9e\u9645\u8fb9\u754c\u3002",
    sections: [
      {
        title: "APK \u5b89\u88c5",
        body:
          "APK \u7531\u672c\u7f51\u7ad9\u76f4\u63a5\u63d0\u4f9b\u3002Android \u53ef\u80fd\u4f1a\u63d0\u793a\u5141\u8bb8\u6d4f\u89c8\u5668\u5b89\u88c5\u5e94\u7528\uff0c\u7528\u6237\u5e94\u53ea\u4ece\u81ea\u5df1\u4fe1\u4efb\u7684\u6765\u6e90\u5b89\u88c5\u3002",
        accent: "primary",
      },
      {
        title: "\u7528\u6237\u8f93\u5165",
        body:
          "\u6587\u5b57\u63d0\u793a\u3001\u53c2\u8003\u56fe\u548c\u6a21\u578b\u6587\u4ef6\u90fd\u53ef\u80fd\u6210\u4e3a\u521b\u4f5c\u6d41\u7a0b\u7684\u4e00\u90e8\u5206\u3002\u8bf7\u907f\u514d\u4e0a\u4f20\u79c1\u5bc6\u3001\u654f\u611f\u3001\u673a\u5bc6\u6216\u6743\u5229\u4e0d\u6e05\u7684\u5185\u5bb9\u3002",
        accent: "secondary",
      },
      {
        title: "AI \u670d\u52a1",
        body:
          "\u90e8\u5206\u751f\u6210\u6216\u4fee\u590d\u6d41\u7a0b\u53ef\u80fd\u4f9d\u8d56\u5916\u90e8 AI \u670d\u52a1\u3002\u4e3a\u4e86\u4ea7\u751f\u8bf7\u6c42\u7684\u7ed3\u679c\uff0c\u76f8\u5173\u8f93\u5165\u53ef\u80fd\u9700\u8981\u53d1\u9001\u7ed9\u8fd9\u4e9b\u670d\u52a1\u63d0\u4f9b\u65b9\u3002",
        accent: "tertiary",
      },
      {
        title: "\u672c\u5730\u6587\u4ef6",
        body:
          "\u5e94\u7528\u6982\u5ff5\u4e2d\u5305\u542b\u672c\u5730\u4ed3\u5e93\u548c\u5bfc\u51fa\u6d41\u7a0b\u3002\u5728\u7f16\u8f91\u3001\u5220\u9664\u6216\u5bfc\u51fa\u91cd\u8981\u6a21\u578b\u4e4b\u524d\uff0c\u7528\u6237\u4ecd\u7136\u5e94\u8be5\u81ea\u884c\u4fdd\u7559\u5907\u4efd\u3002",
        accent: "primary",
      },
      {
        title: "\u9884\u89c8\u72b6\u6001",
        body:
          "PaintersGO \u76ee\u524d\u4ee5\u4ea7\u54c1\u9884\u89c8\u548c\u4f5c\u54c1\u96c6\u9879\u76ee\u7684\u65b9\u5f0f\u5448\u73b0\u3002\u529f\u80fd\u53ef\u7528\u6027\u3001\u670d\u52a1\u63d0\u4f9b\u65b9\u884c\u4e3a\u548c\u751f\u4ea7\u7ea7\u653f\u7b56\u90fd\u53ef\u80fd\u968f\u7740\u5e94\u7528\u6210\u719f\u800c\u8c03\u6574\u3002",
        accent: "secondary",
      },
      {
        title: "\u66f4\u5b89\u5168\u7684\u4f7f\u7528",
        body:
          "\u5efa\u8bae\u5148\u4f7f\u7528\u975e\u654f\u611f\u6d4b\u8bd5\u7d20\u6750\uff0c\u5728\u5206\u4eab\u6216\u6253\u5370\u524d\u68c0\u67e5\u751f\u6210\u7ed3\u679c\uff0c\u5e76\u786e\u8ba4\u81ea\u5df1\u5bf9\u4e0a\u4f20\u53c2\u8003\u6750\u6599\u62e5\u6709\u5408\u9002\u7684\u4f7f\u7528\u6743\u5229\u3002",
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

export default async function PrivacyPage({
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
      enHref={withLocale("/privacy", "en")}
      zhHref={withLocale("/privacy", "zh")}
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
