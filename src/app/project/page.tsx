import type { Metadata } from "next";

import { DetailPageShell } from "@/components/detail-page-shell";
import type { Locale } from "@/lib/locale";
import { resolveLocale, withLocale } from "@/lib/locale";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type StoryKey = "origin" | "ai-notes";

type StoryCopy = {
  title: string;
  intro: string;
  fullTitle: string;
  fullIntro: string;
  fullLabel: string;
};

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
  archiveTitle: string;
  archiveIntro: string;
  archiveBackLabel: string;
  stories: Record<StoryKey, StoryCopy>;
};

const originImages = Array.from({ length: 11 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    src: `/about/project/${number}.jpg`,
    alt: `PaintersGO origin original post page ${index + 1}`,
  };
});

const aiNotesImages = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    src: `/about/author/${number}.jpg`,
    alt: `PaintersGO AI programming notes original post page ${index + 1}`,
  };
});

const storyImages: Record<StoryKey, typeof originImages> = {
  origin: originImages,
  "ai-notes": aiNotesImages,
};

function resolveStory(value: string | string[] | undefined): StoryKey | null {
  const raw = Array.isArray(value) ? value[0] : value;

  if (raw === "origin" || raw === "ai-notes") {
    return raw;
  }

  return null;
}

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
    archiveTitle: "Original Project Story",
    archiveIntro:
      "The source image posts are now grouped as two project-side readings. Each tab previews a few pages first, then opens the full longform material.",
    archiveBackLabel: "Back to both readings",
    stories: {
      origin: {
        title: "Origin Story",
        intro:
          "The first note explains where PaintersGO came from and how the product idea is framed around mobile AI 3D creation.",
        fullTitle: "Original Project Story",
        fullIntro:
          "The complete exported image story is preserved here as the source record behind the condensed project page.",
        fullLabel: "Read full origin story",
      },
      "ai-notes": {
        title: "AI Programming Notes",
        intro:
          "The second note continues the project story through implementation, AI-assisted coding, iteration, and product polishing.",
        fullTitle: "AI Programming Notes",
        fullIntro:
          "This complete image export was previously placed under the author page. It belongs with the project story, so it now lives here as the second longform reading.",
        fullLabel: "Read full programming notes",
      },
    },
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
    archiveTitle: "\u5b8c\u6574\u4f5c\u54c1\u6545\u4e8b",
    archiveIntro:
      "这里把两组图文原稿统一收回到作品页：先展示少量图片信息，用户再点开阅读完整内容，作者页则回到简历与创作者信息本身。",
    archiveBackLabel: "返回两个阅读入口",
    stories: {
      origin: {
        title: "作品起源",
        intro:
          "第一组图文说明 PaintersGO 是怎么来的，以及它如何被定义成面向移动端的 AI 3D 创作流程。",
        fullTitle: "完整作品起源",
        fullIntro:
          "这里按顺序保留“PaintersGO 是怎么来的”图片版原文，作为作品叙事的完整资料底稿。",
        fullLabel: "阅读完整起源",
      },
      "ai-notes": {
        title: "AI 编程记录",
        intro:
          "第二组图文延续作品内容，记录用 AI 辅助完成开发、迭代、调试与产品打磨的过程。",
        fullTitle: "完整 AI 编程记录",
        fullIntro:
          "这组图片此前放在关于作者中，信息归属其实是作品实践本身；现在移到作品页作为第二个完整阅读内容。",
        fullLabel: "阅读完整记录",
      },
    },
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
  const params = await searchParams;
  const locale = resolveLocale(params.lang);
  const story = resolveStory(params.story);
  const t = copyByLocale[locale];
  const activeStory = story ? t.stories[story] : null;

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
      archiveTitle={activeStory ? activeStory.fullTitle : t.archiveTitle}
      archiveIntro={activeStory ? activeStory.fullIntro : t.archiveIntro}
      archiveGroups={
        activeStory
          ? undefined
          : (Object.keys(t.stories) as StoryKey[]).map((key) => ({
              id: key,
              title: t.stories[key].title,
              intro: t.stories[key].intro,
              images: storyImages[key].slice(0, 4),
              fullHref: withLocale(`/project?story=${key}`, locale),
              fullLabel: t.stories[key].fullLabel,
            }))
      }
      archiveBackHref={activeStory ? withLocale("/project", locale) : undefined}
      archiveBackLabel={activeStory ? t.archiveBackLabel : undefined}
      archiveImages={story ? storyImages[story] : undefined}
    />
  );
}
