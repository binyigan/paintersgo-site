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
      "Learn about the creator perspective behind the PaintersGO website and product framing.",
    logoLabel: "PaintersGO",
    backLabel: "Back to Home",
    switchLabel: "Language",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "Creator",
    title: "A product-minded builder shaping the PaintersGO story",
    intro:
      "This site is treated as an interface exercise: connect AI generation, mobile creation, and physical output into one believable product narrative.",
    sections: [
      {
        title: "Product Lens",
        body:
          "The work focuses on how someone moves from inspiration to a usable 3D result with as little friction as possible.",
        accent: "primary",
      },
      {
        title: "Design Preference",
        body:
          "The direction favors bold structure, tactile interactions, and copy that feels like a real product instead of a generic demo.",
        accent: "secondary",
      },
      {
        title: "Current Focus",
        body:
          "Right now the emphasis is on cleaner information architecture, stronger bilingual presentation, and a more polished landing experience.",
        accent: "tertiary",
      },
    ],
  },
  zh: {
    metadataTitle: "\u5173\u4e8e\u4f5c\u8005 - PaintersGO",
    metadataDescription:
      "\u4e86\u89e3 PaintersGO \u7f51\u7ad9\u80cc\u540e\u7684\u4f5c\u8005\u89c6\u89d2\u548c\u4ea7\u54c1\u8868\u8fbe\u65b9\u5f0f\u3002",
    logoLabel: "PaintersGO",
    backLabel: "\u8fd4\u56de\u9996\u9875",
    switchLabel: "\u8bed\u8a00",
    englishLabel: "EN",
    chineseLabel: "\u4e2d\u6587",
    eyebrow: "\u4f5c\u8005",
    title: "\u4e00\u4e2a\u4ee5\u4ea7\u54c1\u89c6\u89d2\u5728\u5851\u9020 PaintersGO \u7684\u8868\u8fbe\u65b9\u5f0f",
    intro:
      "\u8fd9\u4e2a\u7f51\u7ad9\u88ab\u5f53\u4f5c\u4e00\u6b21\u754c\u9762\u7ec3\u4e60\uff1a\u628a AI \u751f\u6210\u3001\u79fb\u52a8\u521b\u4f5c\u548c\u5b9e\u4f53\u8f93\u51fa\u4e32\u6210\u4e00\u4e2a\u66f4\u50cf\u771f\u5b9e\u4ea7\u54c1\u7684\u53d9\u4e8b\u3002",
    sections: [
      {
        title: "\u4ea7\u54c1\u89c6\u89d2",
        body:
          "\u6838\u5fc3\u5728\u4e8e\u8ba9\u7528\u6237\u4ece\u7075\u611f\u51fa\u53d1\uff0c\u5c3d\u53ef\u80fd\u987a\u6ed1\u5730\u8d70\u5230\u53ef\u7528\u7684 3D \u7ed3\u679c\u3002",
        accent: "primary",
      },
      {
        title: "\u8bbe\u8ba1\u504f\u597d",
        body:
          "\u66f4\u504f\u5411\u9c9c\u660e\u7684\u7ed3\u6784\u3001\u6709\u89e6\u611f\u7684\u4ea4\u4e92\uff0c\u4ee5\u53ca\u771f\u6b63\u50cf\u4ea7\u54c1\u7684\u6587\u6848\u8bed\u6c14\uff0c\u800c\u4e0d\u662f\u793a\u4f8b\u9875\u822c\u7684\u7ec4\u88c5\u611f\u3002",
        accent: "secondary",
      },
      {
        title: "\u5f53\u524d\u91cd\u70b9",
        body:
          "\u73b0\u5728\u66f4\u5173\u6ce8\u4fe1\u606f\u7ed3\u6784\u7684\u6e05\u6670\u5ea6\u3001\u4e2d\u82f1\u53cc\u8bed\u7684\u8868\u8fbe\u8d28\u611f\uff0c\u4ee5\u53ca\u9996\u5c4f\u6574\u4f53\u7684\u6253\u78e8\u7a0b\u5ea6\u3002",
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
