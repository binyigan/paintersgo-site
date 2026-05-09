import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Brush,
  CircleDashed,
  Download,
  FileOutput,
  Globe2,
  KeyRound,
  Layers3,
  ScanSearch,
  Share2,
  ShieldCheck,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";

import { FeatureCarousel, type FeatureIconKey } from "@/components/feature-carousel";
import { InfoMenu } from "@/components/info-menu";
import { VideoCoverPlayer } from "@/components/video-cover-player";
import type { Locale } from "@/lib/locale";
import { resolveLocale, withLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type FeatureKey =
  | "aiTo3D"
  | "multiEngine"
  | "editor"
  | "sculpting"
  | "repositoryList"
  | "repair"
  | "autoPartRecognition"
  | "localStructureEditing"
  | "collab"
  | "printing";

type StepKey = "input" | "generate" | "refine" | "collaborate" | "export";

type WorkbenchKey = "paintSculpt" | "partsRegion" | "assist" | "fileWorkflow";

type RoadmapKey = "accountSync" | "arVr" | "videoTo3d" | "modelBreakdown";

type TechKey =
  | "compose"
  | "threeBridge"
  | "remoteConfig"
  | "architecture"
  | "security";

type GithubOverviewImageKey = "projectOverview1" | "projectOverview2";

type FeatureCardConfig = {
  key: FeatureKey;
  icon: FeatureIconKey;
  iconClassName: string;
  media: {
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
  };
};

type FeatureCopy = {
  title: string;
  description: string;
  imageAlt?: string;
};

type FeatureGroupCopy = {
  title: string;
  body: string;
};

type StepCopy = {
  title: string;
  description: string;
};

type TechCopy = {
  title: string;
  description: string;
};

type GithubOverviewImageCopy = {
  title: string;
  description: string;
  alt: string;
};

type SectionCardCopy = {
  title: string;
  description: string;
};

type HomeCopy = {
  metadataTitle: string;
  metadataDescription: string;
  nav: {
    features: string;
    howItWorks: string;
    techStack: string;
  };
  menu: {
    buttonLabel: string;
    authorTitle: string;
    workTitle: string;
    languageLabel: string;
    englishLabel: string;
    chineseLabel: string;
    download: string;
  };
  hero: {
    titleLead: string;
    titleAccent: string;
    titleTrail: string;
    body: string;
    ctaDownload: string;
    imageAlt: string;
  };
  downloadMeta: {
    items: string[];
    note: string;
    checksumLabel: string;
    checksum: string;
    safetyTitle: string;
    safetyItems: string[];
    privacyLink: string;
  };
  engineCloud: string;
  features: {
    eyebrow: string;
    body: string;
    groups: {
      completed: FeatureGroupCopy;
      inProgress: FeatureGroupCopy;
    };
    cards: Record<FeatureKey, FeatureCopy>;
  };
  workbench: {
    eyebrow: string;
    body: string;
    cards: Record<WorkbenchKey, SectionCardCopy>;
  };
  roadmap: {
    eyebrow: string;
    body: string;
    cards: Record<RoadmapKey, SectionCardCopy>;
  };
  flow: {
    eyebrow: string;
    body: string;
    steps: Record<StepKey, StepCopy>;
  };
  tech: {
    eyebrow: string;
    body: string;
    version: string;
    cards: Record<TechKey, TechCopy>;
    qualityTitle: string;
    qualityBody: string;
    readinessTitle: string;
    readinessBody: string;
  };
  githubOverview: {
    eyebrow: string;
    body: string;
    images: Record<GithubOverviewImageKey, GithubOverviewImageCopy>;
  };
  vision: {
    eyebrow: string;
    body: string;
    points: Array<{
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    body: string;
    button: string;
  };
  footer: {
    copyright: string;
    websiteLabel: string;
    shareLabel: string;
    privacyLabel: string;
  };
};

const engines = ["Meshy", "Rodin", "Tripo", "Hunyuan"] as const;

const featureDefinitions: FeatureCardConfig[] = [
  {
    key: "aiTo3D",
    icon: "wandSparkles",
    iconClassName: "text-primary",
    media: {
      type: "video",
      src: "/app-assets/feature-previews/ai-to-3d.mp4",
      alt: "AI generation to 3D preview",
      poster: "/app-assets/video_to_3d1.webp",
    },
  },
  {
    key: "multiEngine",
    icon: "layers3",
    iconClassName: "text-tertiary-dim",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/multi-engine.png",
      alt: "Multi-engine generation preview",
    },
  },
  {
    key: "editor",
    icon: "boxes",
    iconClassName: "text-primary-fixed",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/editor.jpg",
      alt: "Real-time 3D editor preview",
    },
  },
  {
    key: "sculpting",
    icon: "imageUp",
    iconClassName: "text-secondary",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/sculpting.jpg",
      alt: "Sculpting showcase preview",
    },
  },
  {
    key: "repositoryList",
    icon: "listTree",
    iconClassName: "text-tertiary-dim",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/repository-list.jpg",
      alt: "Clear model repository list preview",
    },
  },
  {
    key: "repair",
    icon: "wrench",
    iconClassName: "text-error",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/repair.png",
      alt: "Cloud model repair preview",
    },
  },
  {
    key: "autoPartRecognition",
    icon: "scanSearch",
    iconClassName: "text-secondary",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/auto-part-recognition.jpg",
      alt: "Automatic model part recognition preview",
    },
  },
  {
    key: "localStructureEditing",
    icon: "mousePointer2",
    iconClassName: "text-primary-fixed",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/local-structure-editing.jpg",
      alt: "Selected local structure editing preview",
    },
  },
  {
    key: "collab",
    icon: "users",
    iconClassName: "text-secondary-fixed",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/collab.png",
      alt: "Multi-user collaboration preview",
    },
  },
  {
    key: "printing",
    icon: "printer",
    iconClassName: "text-primary",
    media: {
      type: "image",
      src: "/app-assets/feature-previews/o2o-printing.png",
      alt: "O2O printing workflow preview",
    },
  },
];

const completedFeatureKeys = [
  "aiTo3D",
  "multiEngine",
  "editor",
  "sculpting",
  "repositoryList",
] as const satisfies ReadonlyArray<FeatureKey>;

const inProgressFeatureKeys = [
  "repair",
  "autoPartRecognition",
  "localStructureEditing",
  "printing",
  "collab",
] as const satisfies ReadonlyArray<FeatureKey>;

const workbenchDefinitions = [
  {
    key: "paintSculpt",
    icon: Brush,
    iconClassName: "text-secondary",
  },
  {
    key: "partsRegion",
    icon: Layers3,
    iconClassName: "text-primary",
  },
  {
    key: "assist",
    icon: ScanSearch,
    iconClassName: "text-tertiary-dim",
  },
  {
    key: "fileWorkflow",
    icon: FileOutput,
    iconClassName: "text-primary-fixed",
  },
] as const satisfies ReadonlyArray<{
  key: WorkbenchKey;
  icon: LucideIcon;
  iconClassName: string;
}>;

const roadmapDefinitions = [
  {
    key: "accountSync",
    icon: KeyRound,
    iconClassName: "text-primary",
  },
  {
    key: "arVr",
    icon: BadgeCheck,
    iconClassName: "text-secondary",
  },
  {
    key: "videoTo3d",
    icon: Video,
    iconClassName: "text-tertiary-dim",
  },
  {
    key: "modelBreakdown",
    icon: CircleDashed,
    iconClassName: "text-primary-fixed",
  },
] as const satisfies ReadonlyArray<{
  key: RoadmapKey;
  icon: LucideIcon;
  iconClassName: string;
}>;

const steps = [
  { key: "input", number: "1" },
  { key: "generate", number: "2" },
  { key: "refine", number: "3" },
  { key: "collaborate", number: "4" },
  { key: "export", number: "5" },
] as const satisfies ReadonlyArray<{ key: StepKey; number: string }>;

const techDefinitions = [
  {
    key: "compose",
    borderClassName: "border-primary",
    textClassName: "text-primary",
  },
  {
    key: "threeBridge",
    borderClassName: "border-secondary",
    textClassName: "text-secondary",
  },
  {
    key: "remoteConfig",
    borderClassName: "border-tertiary-dim",
    textClassName: "text-tertiary-dim",
  },
  {
    key: "architecture",
    borderClassName: "border-primary-fixed",
    textClassName: "text-primary-fixed",
  },
  {
    key: "security",
    borderClassName: "border-error",
    textClassName: "text-error",
  },
] as const satisfies ReadonlyArray<{
  key: TechKey;
  borderClassName: string;
  textClassName: string;
}>;

const githubOverviewImages = [
  {
    key: "projectOverview1",
    src: "/app-assets/project-overview/project-overview-1.png",
    width: 1298,
    height: 1394,
  },
  {
    key: "projectOverview2",
    src: "/app-assets/project-overview/project-overview-2.png",
    width: 1536,
    height: 1024,
  },
] as const satisfies ReadonlyArray<{
  key: GithubOverviewImageKey;
  src: string;
  width: number;
  height: number;
}>;

const copyByLocale: Record<Locale, HomeCopy> = {
  en: {
    metadataTitle: "PaintersGO - AI-Driven 3D Modeling on Android",
    metadataDescription:
      "The all-in-one AI-powered 3D modeling studio. Transform text or images into detailed 3D models and print them directly from your phone.",
    nav: {
      features: "Features",
      howItWorks: "How it Works",
      techStack: "Tech Stack",
    },
    menu: {
      buttonLabel: "Open menu",
      authorTitle: "About the Author",
      workTitle: "About the Work",
      languageLabel: "Language Switch",
      englishLabel: "EN",
      chineseLabel: "\u4e2d\u6587",
      download: "Download APK",
    },
    hero: {
      titleLead: "PaintersGO: From Inspiration to",
      titleAccent: "3D Realities",
      titleTrail: "on Android",
      body:
        "The all-in-one AI-powered 3D modeling studio. Transform text or images into detailed 3D models and print them directly from your phone.",
      ctaDownload: "Download APK for Android",
      imageAlt: "PaintersGO Android augmented reality preview",
    },
    downloadMeta: {
      items: ["APK v1.0", "9.1 MB", "Android 8.0+", "Updated May 2, 2026"],
      note: "Official preview build for Android devices.",
      checksumLabel: "SHA-256",
      checksum:
        "51A35D5599BD3EED71E324424F1AB9023DF5CD4C411EDDEFFA42C33EEDAA23A2",
      safetyTitle: "Build Trust",
      safetyItems: [
        "Published from the official PaintersGO site.",
        "Version, file size, and SHA-256 are shown for verification.",
        "Designed for Android 8.0 and above.",
        "Start with non-sensitive creative assets when trying AI generation.",
      ],
      privacyLink: "Privacy and safety note",
    },
    engineCloud: "Powered by Industry Leading Engines",
    features: {
      eyebrow: "Core Creative Engine",
      body:
        "PaintersGO brings the essential mobile 3D creation steps into one place, from AI generation to editing, repair, collaboration, and print-ready output.",
      groups: {
        completed: {
          title: "Core Creation Loop",
          body:
            "Start with a prompt or reference image, choose a generation engine, preview the result, edit it on mobile, and keep finished assets organized.",
        },
        inProgress: {
          title: "Advanced Workflows",
          body:
            "Repair, part recognition, selected local editing, O2O printing, and collaboration extend the app from simple generation toward real creative production.",
        },
      },
      cards: {
        aiTo3D: {
          title: "AI Generation-to-3D",
          description:
            "Describe your ideas in text or upload an image. PaintersGO converts either input into rich 3D models through powerful generation engines.",
        },
        multiEngine: {
          title: "Multi-Engine",
          description:
            "Switch between Meshy, Rodin, Tripo, and Hunyuan to match the model style, speed, or fidelity you need for the task.",
        },
        editor: {
          title: "Real-Time 3D Editor",
          description:
            "Inspect, orbit, refine, and preview directly from a mobile-first viewport designed to keep creation fast and tactile.",
        },
        sculpting: {
          title: "Sculpting Showcase",
          description:
            "Highlight carved forms and fine surface details with a dedicated preview card for sculpture-style outputs.",
        },
        repositoryList: {
          title: "Clear Repository List",
          description:
            "Browse saved models in a clean repository view with visible thumbnails, names, and creation status so finished assets are easy to find.",
        },
        repair: {
          title: "Cloud Model Repair",
          description:
            "Instantly close mesh issues, repair normals, and clean geometry for reliable exports and production-ready printable output.",
          imageAlt: "PaintersGO model refinement and repair preview",
        },
        autoPartRecognition: {
          title: "Automatic Part Recognition",
          description:
            "Identify the model's component parts automatically, preparing cleaner selections for follow-up editing, review, and production checks.",
        },
        localStructureEditing: {
          title: "Selected Local Structure Editing",
          description:
            "Let users choose a specific structure or region and focus edits on that local area while keeping the rest of the model stable.",
        },
        collab: {
          title: "Multi-User Collab",
          description:
            "Bring teammates into shared rooms for synchronized feedback, review, and model decisions around the same creative context.",
        },
        printing: {
          title: "O2O Printing",
          description:
            "Move from digital model to physical delivery with one connected workflow for review, production, and final fulfillment.",
        },
      },
    },
    workbench: {
      eyebrow: "Mobile 3D Workbench",
      body:
        "Beyond generation, PaintersGO includes the practical editing, file, and recovery tools needed to keep a mobile 3D project moving.",
      cards: {
        paintSculpt: {
          title: "Paint, Sculpt, Undo, Redo",
          description:
            "Brush and eraser tools sit beside sculpt controls, material previews, and mode-aware undo/redo so editing feels closer to a real studio.",
        },
        partsRegion: {
          title: "Part & Region Editing",
          description:
            "Split models by material or connected shape, select geometry regions, and make focused transforms without leaving the phone.",
        },
        assist: {
          title: "Smart Assist Tools",
          description:
            "Camera follow, magnifier view, auxiliary reference canvas, and material switching help users work on fine details with less friction.",
        },
        fileWorkflow: {
          title: "Files, Export, and Recovery",
          description:
            "Import models, manage a local repository, rename or delete files, batch export GLB/STL assets, sync to a folder, and restore the last session.",
        },
      },
    },
    roadmap: {
      eyebrow: "Next Experiments",
      body:
        "PaintersGO is also a place to test where mobile AI 3D creation can go next: richer accounts, immersive review, video capture, and model breakdown.",
      cards: {
        accountSync: {
          title: "Universal & Official Accounts",
          description:
            "A future account layer could connect provider accounts and sync generated models, in-progress work, and model source metadata.",
        },
        arVr: {
          title: "AR/VR Inspection",
          description:
            "Generated or edited models could move into immersive review contexts such as Vision Pro or Quest-style devices.",
        },
        videoTo3d: {
          title: "Video-to-3D Capture",
          description:
            "A single orbiting video could become a higher-fidelity reconstruction path for textured physical objects.",
        },
        modelBreakdown: {
          title: "Model Breakdown",
          description:
            "Complex models could be split into printable or assembleable parts, extending the current part and region editing direction.",
        },
      },
    },
    flow: {
      eyebrow: "Sculpting in Five Steps",
      body: "From concept to physical object with minimal friction.",
      steps: {
        input: {
          title: "Input Inspiration",
          description: "Upload reference images or type descriptive prompts to start the concept.",
        },
        generate: {
          title: "AI Generation",
          description: "Choose the engine that best fits the style and generate the initial 3D result.",
        },
        refine: {
          title: "Refine & Repair",
          description: "Clean topology, repair mesh quality, and tune the output for presentation or print.",
        },
        collaborate: {
          title: "Collaborate",
          description: "Invite others into the process to review, comment, and align on the model.",
        },
        export: {
          title: "Print & Export",
          description: "Order physical output or export production-ready files for downstream use.",
        },
      },
    },
    tech: {
      eyebrow: "Under the Hood",
      body: "A professional-grade mobile architecture shaped for AI-native 3D creation.",
      version: "PaintersGO-Core v2.4.0",
      cards: {
        compose: {
          title: "Kotlin + Jetpack Compose",
          description:
            "Native Android UI for fluid motion, responsive interaction, and efficient threading.",
        },
        threeBridge: {
          title: "Three.js + WebView Bridge",
          description:
            "High-performance 3D rendering with mobile-friendly interaction and preview control.",
        },
        remoteConfig: {
          title: "Firebase Remote Config",
          description:
            "Dynamic parameter control for engines, quality tuning, and rollout experimentation.",
        },
        architecture: {
          title: "Multi-Provider Architecture",
          description:
            "A unified orchestration layer connecting top-tier AI generation providers in one app.",
        },
        security: {
          title: "Secure API Storage",
          description:
            "Protected credential handling and safer provider access for production-grade operation.",
        },
      },
      qualityTitle: "AI Workflow Quality",
      qualityBody:
        "Prompt orchestration, preview iteration, and device-native polish work together so the app feels like one coherent studio instead of disconnected tools.",
      readinessTitle: "Production Readiness",
      readinessBody:
        "Repair, export, collaboration, and fulfillment are treated as first-class steps, making the pipeline more reliable for real-world output.",
    },
    githubOverview: {
      eyebrow: "GitHub Project Overview",
      body:
        "A closer look at the project behind the site, including how the app, release assets, and source materials are organized.",
      images: {
        projectOverview1: {
          title: "Repository Map",
          description:
            "A compact view of the codebase structure and major feature areas.",
          alt: "GitHub project overview screenshot showing the PaintersGO repository structure",
        },
        projectOverview2: {
          title: "Release Context",
          description:
            "A wider project snapshot that connects the repository state with release-ready app assets.",
          alt: "GitHub project overview screenshot showing project release details",
        },
      },
    },
    vision: {
      eyebrow: "Vision & Perspective",
      body:
        "PaintersGO is imagined as a low-friction entrance to an AI-native 3D creation network: generate a model, refine it on the device, connect it to printing capacity, and bring the result home as a physical object.",
      points: [
        {
          title: "A Platform-Level Entrance",
          description:
            "The app should connect generation, local coloring and sculpting, model repair, printing, and fulfillment into one path that non-technical users can understand.",
        },
        {
          title: "Practical O2O Experiments",
          description:
            "The printing network should be tested carefully. A city-level honeycomb of high-quality partners may reduce communication and logistics costs, but models that do not survive real-world validation should be abandoned decisively.",
        },
        {
          title: "Room for Individual Creators",
          description:
            "Independent operators can print for others, sell original works, or attract orders through their own craft and reputation. That personal creative identity is worth preserving.",
        },
        {
          title: "AI as the Core Workflow",
          description:
            "AI generation can be the first creative spark, while editing, repair, collaboration, and printing help turn that spark into something usable.",
        },
        {
          title: "Copyright and Trust",
          description:
            "Downloadable and commercial assets need stricter checks. Unverified non-original works should not be allowed to enter public sale or commercial distribution.",
        },
        {
          title: "Integration, Not Replacement",
          description:
            "The platform should not replace capable 3D professionals. It should organize demand, expose hidden 3D consumers, and create new roles for modelers, repair artists, and specialized service providers.",
        },
      ],
    },
    cta: {
      title: "Start Your 3D Journey Today",
      body:
        "Join artists, makers, and creative teams already moving from concept to physical form with PaintersGO.",
      button: "Get the App Now",
    },
    footer: {
      copyright: "(c) 2025 PaintersGO. Sculpting the future of 3D.",
      websiteLabel: "PaintersGO website",
      shareLabel: "Share repository",
      privacyLabel: "Privacy and Safety",
    },
  },
  zh: {
    metadataTitle:
      "PaintersGO - Android \u7aef AI 3D \u5efa\u6a21\u5de5\u4f5c\u5ba4",
    metadataDescription:
      "\u4e00\u4f53\u5316 AI 3D \u521b\u4f5c\u5de5\u4f5c\u5ba4\u3002\u628a\u6587\u5b57\u6216\u56fe\u50cf\u8f6c\u6210\u7cbe\u7ec6 3D \u6a21\u578b\uff0c\u5e76\u76f4\u63a5\u5728\u624b\u673a\u4e0a\u5b8c\u6210\u9884\u89c8\u3001\u534f\u4f5c\u4e0e\u6253\u5370\u843d\u5730\u3002",
    nav: {
      features: "\u529f\u80fd\u4eae\u70b9",
      howItWorks: "\u5de5\u4f5c\u6d41\u7a0b",
      techStack: "\u6280\u672f\u6808",
    },
    menu: {
      buttonLabel: "\u6253\u5f00\u83dc\u5355",
      authorTitle: "\u5173\u4e8e\u4f5c\u8005",
      workTitle: "\u5173\u4e8e\u4f5c\u54c1",
      languageLabel: "\u53cc\u8bed\u5207\u6362",
      englishLabel: "EN",
      chineseLabel: "\u4e2d\u6587",
      download: "\u4e0b\u8f7d APK",
    },
    hero: {
      titleLead:
        "PaintersGO\uff1a\u5728 Android \u4e0a\u628a\u7075\u611f\u76f4\u63a5\u53d8\u6210",
      titleAccent: "3D \u6210\u679c",
      titleTrail: "",
      body:
        "\u4e00\u4f53\u5316 AI 3D \u521b\u4f5c\u5de5\u4f5c\u5ba4\u3002\u628a\u6587\u5b57\u6216\u56fe\u50cf\u8f6c\u6210\u7cbe\u7ec6 3D \u6a21\u578b\uff0c\u5e76\u76f4\u63a5\u5728\u624b\u673a\u4e0a\u5b8c\u6210\u9884\u89c8\u3001\u534f\u4f5c\u4e0e\u6253\u5370\u843d\u5730\u3002",
      ctaDownload: "\u4e0b\u8f7d Android APK",
      imageAlt: "PaintersGO Android \u589e\u5f3a\u73b0\u5b9e\u9884\u89c8",
    },
    downloadMeta: {
      items: ["APK v1.0", "9.1 MB", "Android 8.0+", "2026-05-02 \u66f4\u65b0"],
      note: "面向 Android 设备的官方预览版本。",
      checksumLabel: "SHA-256 \u6821\u9a8c",
      checksum:
        "51A35D5599BD3EED71E324424F1AB9023DF5CD4C411EDDEFFA42C33EEDAA23A2",
      safetyTitle: "版本可信信息",
      safetyItems: [
        "安装包由 PaintersGO 官方站点提供。",
        "页面展示版本、文件大小和 SHA-256，便于核对。",
        "适用于 Android 8.0 及以上设备。",
        "体验 AI 生成功能时，建议先使用非敏感创作素材。",
      ],
      privacyLink: "\u9690\u79c1\u4e0e\u5b89\u5168\u8bf4\u660e",
    },
    engineCloud: "\u7531\u9886\u5148\u7684 3D \u751f\u6210\u5f15\u64ce\u9a71\u52a8",
    features: {
      eyebrow: "\u6838\u5fc3\u521b\u4f5c\u5f15\u64ce",
      body:
        "PaintersGO 把移动端 3D 创作的关键步骤放进同一个入口：AI 生成、编辑、修复、协作，以及面向打印的输出。",
      groups: {
        completed: {
          title: "核心创作链路",
          body:
            "从提示词或参考图开始，选择生成引擎，预览结果，在移动端继续编辑，并把完成的模型整理进仓库。",
        },
        inProgress: {
          title: "进阶生产流程",
          body:
            "修复、部件识别、局部编辑、O2O 打印和协作，让 PaintersGO 从简单生成进一步走向真实创作与交付。",
        },
      },
      cards: {
        aiTo3D: {
          title: "AI \u751f\u6210 3D",
          description:
            "\u65e0\u8bba\u662f\u6587\u5b57\u63cf\u8ff0\u8fd8\u662f\u53c2\u8003\u56fe\uff0cPaintersGO \u90fd\u80fd\u901a\u8fc7\u5f3a\u5927\u751f\u6210\u5f15\u64ce\u5feb\u901f\u8f6c\u5316\u4e3a\u5b8c\u6574\u7684 3D \u6a21\u578b\u3002",
        },
        multiEngine: {
          title: "\u591a\u5f15\u64ce\u751f\u6210",
          description:
            "\u53ef\u5728 Meshy\u3001Rodin\u3001Tripo \u548c Hunyuan \u4e4b\u95f4\u5207\u6362\uff0c\u6309\u98ce\u683c\u3001\u901f\u5ea6\u548c\u7cbe\u5ea6\u9009\u62e9\u6700\u5408\u9002\u7684\u6a21\u578b\u5f15\u64ce\u3002",
        },
        editor: {
          title: "\u5b9e\u65f6 3D \u7f16\u8f91",
          description:
            "\u5728\u79fb\u52a8\u7aef\u4f18\u5148\u7684\u89c6\u53e3\u91cc\u76f4\u63a5\u67e5\u770b\u3001\u65cb\u8f6c\u3001\u5fae\u8c03\u548c\u9884\u89c8\uff0c\u8ba9\u521b\u4f5c\u4fdd\u6301\u5feb\u901f\u3001\u76f4\u63a5\u548c\u987a\u624b\u3002",
        },
        sculpting: {
          title: "\u96d5\u523b\u5c55\u793a",
          description:
            "\u65b0\u589e\u96d5\u523b\u98ce\u683c\u7ed3\u679c\u5c55\u793a\uff0c\u65b9\u4fbf\u67e5\u770b\u7ec6\u8282\u8d28\u611f\u4e0e\u8868\u9762\u5f62\u6001\u3002",
        },
        repositoryList: {
          title: "\u6e05\u6670\u7684\u4ed3\u5e93\u5217\u8868",
          description:
            "\u7528\u6e05\u695a\u7684\u5217\u8868\u7ba1\u7406\u5df2\u4fdd\u5b58\u6a21\u578b\uff0c\u7f29\u7565\u56fe\u3001\u540d\u79f0\u548c\u521b\u5efa\u72b6\u6001\u4e00\u76ee\u4e86\u7136\uff0c\u65b9\u4fbf\u5feb\u901f\u627e\u5230\u6210\u54c1\u8d44\u4ea7\u3002",
        },
        repair: {
          title: "\u4e91\u7aef\u6a21\u578b\u4fee\u590d",
          description:
            "\u5373\u65f6\u4fee\u590d\u7f51\u683c\u95ee\u9898\u3001\u6cd5\u7ebf\u9519\u8bef\u548c\u51e0\u4f55\u7f3a\u9677\uff0c\u8ba9\u5bfc\u51fa\u7ed3\u679c\u66f4\u7a33\u5b9a\uff0c\u4e5f\u66f4\u9002\u5408\u540e\u7eed\u6253\u5370\u4e0e\u751f\u4ea7\u3002",
          imageAlt: "PaintersGO \u6a21\u578b\u4fee\u590d\u529f\u80fd\u9884\u89c8",
        },
        autoPartRecognition: {
          title: "\u81ea\u52a8\u8bc6\u522b\u6a21\u578b\u7ec4\u6210\u90e8\u4f4d",
          description:
            "\u81ea\u52a8\u8bc6\u522b\u6a21\u578b\u7684\u7ec4\u6210\u90e8\u4f4d\uff0c\u4e3a\u540e\u7eed\u9009\u533a\u7f16\u8f91\u3001\u8bc4\u5ba1\u548c\u751f\u4ea7\u68c0\u67e5\u63d0\u4f9b\u66f4\u6e05\u6670\u7684\u7ed3\u6784\u57fa\u7840\u3002",
        },
        localStructureEditing: {
          title: "\u81ea\u9009\u5c40\u90e8\u7ed3\u6784\u7f16\u8f91",
          description:
            "\u7528\u6237\u53ef\u4ee5\u81ea\u4e3b\u9009\u62e9\u7279\u5b9a\u7ed3\u6784\u6216\u5c40\u90e8\u533a\u57df\uff0c\u628a\u7f16\u8f91\u805a\u7126\u5230\u76ee\u6807\u90e8\u4f4d\uff0c\u540c\u65f6\u4fdd\u6301\u5176\u4ed6\u90e8\u5206\u7a33\u5b9a\u3002",
        },
        collab: {
          title: "\u591a\u4eba\u534f\u4f5c",
          description:
            "\u628a\u56e2\u961f\u6210\u5458\u5e26\u8fdb\u5171\u4eab\u521b\u4f5c\u7a7a\u95f4\uff0c\u5728\u540c\u4e00\u4efd\u6a21\u578b\u4e0a\u4e0b\u6587\u91cc\u5b8c\u6210\u540c\u6b65\u8bc4\u5ba1\u3001\u53cd\u9988\u548c\u51b3\u7b56\u3002",
        },
        printing: {
          title: "O2O \u6253\u5370",
          description:
            "\u4ece\u6570\u5b57\u6a21\u578b\u76f4\u63a5\u8d70\u5411\u5b9e\u4f53\u4ea4\u4ed8\uff0c\u628a\u8bc4\u5ba1\u3001\u751f\u4ea7\u548c\u5c65\u7ea6\u8fde\u63a5\u6210\u4e00\u6761\u5b8c\u6574\u7684\u771f\u5b9e\u4e16\u754c\u6d41\u7a0b\u3002",
        },
      },
    },
    workbench: {
      eyebrow: "\u79fb\u52a8\u7aef 3D \u5de5\u4f5c\u53f0",
      body:
        "\u9664\u4e86 AI \u751f\u6210\uff0cPaintersGO \u8fd8\u628a\u7f16\u8f91\u3001\u6587\u4ef6\u3001\u5bfc\u51fa\u548c\u8fdb\u5ea6\u6062\u590d\u653e\u8fdb\u540c\u4e00\u4e2a\u624b\u673a\u7aef\u5de5\u4f5c\u6d41\u91cc\u3002",
      cards: {
        paintSculpt: {
          title: "\u7ed8\u5236\u3001\u96d5\u523b\u3001\u64a4\u9500\u4e0e\u91cd\u505a",
          description:
            "\u753b\u7b14\u3001\u6a61\u76ae\u64e6\u3001\u96d5\u523b\u63a7\u4ef6\u3001\u6750\u8d28\u9884\u89c8\u548c\u5206\u6a21\u5f0f\u64a4\u9500/\u91cd\u505a\u653e\u5728\u4e00\u8d77\uff0c\u8ba9\u79fb\u52a8\u7aef\u7f16\u8f91\u66f4\u63a5\u8fd1\u771f\u6b63\u7684\u5de5\u4f5c\u5ba4\u3002",
        },
        partsRegion: {
          title: "\u90e8\u4ef6\u4e0e\u533a\u57df\u7f16\u8f91",
          description:
            "\u53ef\u6309\u6750\u8d28\u6216\u8fde\u901a\u5f62\u72b6\u62c6\u5206\u6a21\u578b\uff0c\u9009\u62e9\u51e0\u4f55\u533a\u57df\u5e76\u8fdb\u884c\u5c40\u90e8\u8c03\u6574\uff0c\u4e0d\u5fc5\u79bb\u5f00\u624b\u673a\u3002",
        },
        assist: {
          title: "\u667a\u80fd\u8f85\u52a9\u5de5\u5177",
          description:
            "\u955c\u5934\u8ddf\u968f\u3001\u653e\u5927\u955c\u3001\u8f85\u52a9\u753b\u5e03\u548c\u6750\u8d28\u5207\u6362\u5e2e\u52a9\u7528\u6237\u66f4\u987a\u624b\u5730\u5904\u7406\u6a21\u578b\u7ec6\u8282\u3002",
        },
        fileWorkflow: {
          title: "\u6587\u4ef6\u3001\u5bfc\u51fa\u4e0e\u6062\u590d",
          description:
            "\u652f\u6301\u5bfc\u5165\u6a21\u578b\u3001\u672c\u5730\u4ed3\u5e93\u7ba1\u7406\u3001\u91cd\u547d\u540d\u3001\u5220\u9664\u3001GLB/STL \u6279\u91cf\u5bfc\u51fa\u3001\u540c\u6b65\u5230\u6587\u4ef6\u5939\u548c\u4e0a\u6b21\u4f1a\u8bdd\u6062\u590d\u3002",
        },
      },
    },
    roadmap: {
      eyebrow: "\u4e0b\u4e00\u9636\u6bb5\u5b9e\u9a8c",
      body:
        "PaintersGO 也在探索移动端 AI 3D 创作的下一步：账号同步、沉浸式查看、视频捕捉和模型拆分。",
      cards: {
        accountSync: {
          title: "\u901a\u7528\u8d26\u53f7\u4e0e\u5b98\u65b9\u8d26\u53f7",
          description:
            "\u672a\u6765\u53ef\u80fd\u63a5\u5165\u63d0\u4f9b\u65b9\u8d26\u53f7\uff0c\u540c\u6b65\u5df2\u751f\u6210\u6a21\u578b\u3001\u8fdb\u884c\u4e2d\u4efb\u52a1\u548c\u6a21\u578b\u6765\u6e90\u4fe1\u606f\u3002",
        },
        arVr: {
          title: "AR/VR \u6c89\u6d78\u5f0f\u68c0\u89c6",
          description:
            "\u5df2\u751f\u6210\u6216\u7f16\u8f91\u540e\u7684\u6a21\u578b\u53ef\u4ee5\u8fdb\u5165 Vision Pro\u3001Quest \u7c7b\u8bbe\u5907\u7684\u6c89\u6d78\u5f0f\u9884\u89c8\u573a\u666f\u3002",
        },
        videoTo3d: {
          title: "\u89c6\u9891\u751f\u6210 3D",
          description:
            "\u7528\u4e00\u6bb5\u73af\u7ed5\u7269\u4f53\u7684\u89c6\u9891\u4f5c\u4e3a\u8f93\u5165\uff0c\u63a2\u7d22\u66f4\u9ad8\u7cbe\u5ea6\u7684\u5e26\u8d34\u56fe\u5b9e\u7269\u91cd\u5efa\u8def\u5f84\u3002",
        },
        modelBreakdown: {
          title: "\u6a21\u578b\u62c6\u89e3",
          description:
            "\u628a\u590d\u6742\u6a21\u578b\u62c6\u6210\u66f4\u9002\u5408\u6253\u5370\u6216\u62fc\u88c5\u7684\u72ec\u7acb\u90e8\u4ef6\uff0c\u5ef6\u5c55\u5f53\u524d\u7684\u90e8\u4ef6\u4e0e\u533a\u57df\u7f16\u8f91\u65b9\u5411\u3002",
        },
      },
    },
    flow: {
      eyebrow: "\u4e94\u6b65\u5b8c\u6210 3D \u521b\u4f5c",
      body:
        "\u4ece\u6982\u5ff5\u5230\u5b9e\u4f53\u7ed3\u679c\uff0c\u628a\u8def\u5f84\u538b\u7f29\u5230\u66f4\u987a\u6ed1\u3001\u66f4\u5c11\u963b\u529b\u7684\u79fb\u52a8\u7aef\u4f53\u9a8c\u91cc\u3002",
      steps: {
        input: {
          title: "\u8f93\u5165\u7075\u611f",
          description:
            "\u4e0a\u4f20\u53c2\u8003\u56fe\u6216\u8f93\u5165\u6587\u5b57\u63d0\u793a\uff0c\u4ece\u60f3\u6cd5\u76f4\u63a5\u542f\u52a8\u521b\u4f5c\u3002",
        },
        generate: {
          title: "AI \u751f\u6210",
          description:
            "\u9009\u62e9\u9002\u5408\u7684\u5f15\u64ce\uff0c\u5feb\u901f\u4ea7\u51fa\u7b2c\u4e00\u7248 3D \u7ed3\u679c\u3002",
        },
        refine: {
          title: "\u7cbe\u4fee\u4e0e\u4fee\u590d",
          description:
            "\u6e05\u7406\u62d3\u6251\u3001\u4fee\u590d\u6a21\u578b\u8d28\u91cf\uff0c\u5e76\u7ee7\u7eed\u4f18\u5316\u5c55\u793a\u4e0e\u6253\u5370\u8868\u73b0\u3002",
        },
        collaborate: {
          title: "\u534f\u4f5c\u8bc4\u5ba1",
          description:
            "\u9080\u8bf7\u4ed6\u4eba\u4e00\u8d77\u67e5\u770b\u3001\u8bc4\u8bba\u5e76\u5bf9\u6a21\u578b\u65b9\u5411\u8fbe\u6210\u5171\u8bc6\u3002",
        },
        export: {
          title: "\u6253\u5370\u4e0e\u5bfc\u51fa",
          description:
            "\u53ef\u4ee5\u76f4\u63a5\u4e0b\u5355\u6253\u5370\uff0c\u4e5f\u53ef\u4ee5\u5bfc\u51fa\u53ef\u7528\u4e8e\u540e\u7eed\u751f\u4ea7\u7684\u6a21\u578b\u6587\u4ef6\u3002",
        },
      },
    },
    tech: {
      eyebrow: "\u5e95\u5c42\u80fd\u529b",
      body:
        "\u4e00\u5957\u9762\u5411 AI \u539f\u751f 3D \u521b\u4f5c\u7684\u4e13\u4e1a\u7ea7\u79fb\u52a8\u7aef\u67b6\u6784\u3002",
      version: "PaintersGO-Core v2.4.0",
      cards: {
        compose: {
          title: "Kotlin + Jetpack Compose",
          description:
            "\u539f\u751f Android UI \u6808\uff0c\u5e26\u6765\u66f4\u6d41\u7545\u7684\u52a8\u6548\u3001\u66f4\u5feb\u7684\u54cd\u5e94\u548c\u66f4\u7a33\u7684\u7ebf\u7a0b\u7ba1\u7406\u3002",
        },
        threeBridge: {
          title: "Three.js + WebView Bridge",
          description:
            "\u9ad8\u6027\u80fd 3D \u6e32\u67d3\u80fd\u529b\uff0c\u517c\u987e\u79fb\u52a8\u7aef\u4ea4\u4e92\u548c\u9884\u89c8\u63a7\u5236\u3002",
        },
        remoteConfig: {
          title: "Firebase Remote Config",
          description:
            "\u52a8\u6001\u8c03\u6574\u5f15\u64ce\u53c2\u6570\u3001\u8d28\u91cf\u7b56\u7565\u548c\u5b9e\u9a8c\u914d\u7f6e\uff0c\u63d0\u5347\u6574\u4f53\u751f\u6210\u4f53\u9a8c\u3002",
        },
        architecture: {
          title: "\u591a\u63d0\u4f9b\u65b9\u67b6\u6784",
          description:
            "\u7edf\u4e00\u7f16\u6392\u9876\u7ea7 AI \u751f\u6210\u80fd\u529b\uff0c\u628a\u4e0d\u540c\u6a21\u578b\u670d\u52a1\u6574\u5408\u8fdb\u540c\u4e00\u5e94\u7528\u3002",
        },
        security: {
          title: "\u5b89\u5168 API \u5b58\u50a8",
          description:
            "\u66f4\u7a33\u59a5\u5730\u7ba1\u7406\u51ed\u636e\u548c\u670d\u52a1\u8bbf\u95ee\uff0c\u8ba9\u751f\u4ea7\u7ea7\u8c03\u7528\u66f4\u5b89\u5168\u53ef\u9760\u3002",
        },
      },
      qualityTitle: "AI \u5de5\u4f5c\u6d41\u8d28\u611f",
      qualityBody:
        "\u4ece\u63d0\u793a\u8bcd\u7f16\u6392\u3001\u9884\u89c8\u8fed\u4ee3\u5230\u8bbe\u5907\u7aef\u8868\u73b0\uff0cPaintersGO \u8ffd\u6c42\u7684\u662f\u4e00\u4f53\u5316\u5de5\u4f5c\u5ba4\u4f53\u9a8c\uff0c\u800c\u4e0d\u662f\u4e00\u5806\u62fc\u63a5\u8d77\u6765\u7684\u5de5\u5177\u3002",
      readinessTitle: "\u751f\u4ea7\u5c31\u7eea\u80fd\u529b",
      readinessBody:
        "\u628a\u4fee\u590d\u3001\u5bfc\u51fa\u3001\u534f\u4f5c\u548c\u4ea4\u4ed8\u90fd\u89c6\u4e3a\u4e00\u7b49\u80fd\u529b\uff0c\u8ba9\u6574\u4e2a\u94fe\u8def\u66f4\u63a5\u8fd1\u771f\u5b9e\u521b\u4f5c\u4e0e\u751f\u4ea7\u573a\u666f\u3002",
    },
    githubOverview: {
      eyebrow: "GitHub整体项目总览",
      body:
        "进一步查看 PaintersGO 背后的项目组织方式，包括应用代码、发布资源和作品素材。",
      images: {
        projectOverview1: {
          title: "项目结构总览",
          description:
            "展示代码仓库和主要功能模块的组织方式。",
          alt: "PaintersGO GitHub 项目结构总览截图",
        },
        projectOverview2: {
          title: "发布上下文总览",
          description:
            "展示项目交付状态、发布资源和源码资产之间的关联。",
          alt: "PaintersGO GitHub 发布上下文总览截图",
        },
      },
    },
    vision: {
      eyebrow: "愿景和看法",
      body:
        "PaintersGO 更像是一个面向 AI 原生 3D 创作的平台入口：让用户用低门槛方式生成模型，在本地完成上色、雕刻和修复，再连接打印产能与物流，把数字创作带到真实世界。",
      points: [
        {
          title: "平台化入口",
          description:
            "它不只是一组功能，而是把 AI 生成、本地微调、模型修复、打印设备和履约交付串成一条普通用户也能理解的一站式路径。",
        },
        {
          title: "谨慎验证 O2O",
          description:
            "打印网络可以先以城市蜂窝的方式试点，筛选少量高质量商家覆盖主要需求。但如果沟通、产能和成本无法形成闭环，就应果断舍弃不成立的模式。",
        },
        {
          title: "保留个体创作者的位置",
          description:
            "个体户可以帮人打印，也可以出售原创作品，还可以通过自己的水平展示获取订单。这种个人能力带来的明星效应值得认真考虑。",
        },
        {
          title: "AI 是核心工作流",
          description:
            "AI 生成可以成为创作的第一步，编辑、修复、协作和打印则把这个结果继续推向可用资产。",
        },
        {
          title: "版权与信任机制",
          description:
            "允许下载、售卖和商用的内容必须经过更严格的检查。没有得到认证的非原创系列，不应公开下载或进入商业流通。",
        },
        {
          title: "整合而不是替代",
          description:
            "平台不会替代原本有能力的 3D 从业者，而是把被 AI 冲击的行业重新整合，创造建模师、修模师和专业服务者的新机会。",
        },
      ],
    },
    cta: {
      title: "\u73b0\u5728\u5f00\u59cb\u4f60\u7684 3D \u521b\u4f5c\u4e4b\u65c5",
      body:
        "\u52a0\u5165\u5df2\u7ecf\u5728\u7528 PaintersGO \u628a\u7075\u611f\u63a8\u8fdb\u5230\u771f\u5b9e\u6210\u679c\u7684\u827a\u672f\u5bb6\u3001\u521b\u4f5c\u8005\u548c\u5236\u4f5c\u56e2\u961f\u3002",
      button: "\u7acb\u5373\u83b7\u53d6\u5e94\u7528",
    },
    footer: {
      copyright:
        "(c) 2025 PaintersGO\u3002\u96d5\u523b 3D \u521b\u4f5c\u7684\u672a\u6765\u3002",
      websiteLabel: "PaintersGO \u5b98\u7f51",
      shareLabel: "\u9879\u76ee\u4ed3\u5e93",
      privacyLabel: "\u9690\u79c1\u4e0e\u5b89\u5168",
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

function DownloadSafetyPanel({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="mx-auto mt-8 max-w-3xl border-y border-outline-variant/15 py-5 text-left">
      <h3 className="mb-4 flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-[0.22em] text-secondary">
        <ShieldCheck className="h-4 w-4" />
        {title}
      </h3>
      <ul className="grid gap-3 text-sm leading-relaxed text-on-surface-variant sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const locale = resolveLocale((await searchParams).lang);
  const t = copyByLocale[locale];

  const featureHref = withLocale("/#features", locale);
  const howItWorksHref = withLocale("/#how-it-works", locale);
  const techHref = withLocale("/#tech-stack", locale);
  const downloadHref = withLocale("/#download", locale);
  const authorHref = withLocale("/author", locale);
  const projectHref = withLocale("/project", locale);
  const privacyHref = withLocale("/privacy", locale);
  const zhHref = withLocale("/", "zh");
  const enHref = withLocale("/", "en");
  const featureItemsByKey = new Map(featureDefinitions.map((card) => [card.key, card]));
  const buildFeatureItems = (keys: ReadonlyArray<FeatureKey>) =>
    keys.flatMap((key) => {
      const card = featureItemsByKey.get(key);

      return card
        ? [
            {
              id: card.key,
              icon: card.icon,
              iconClassName: card.iconClassName,
              title: t.features.cards[card.key].title,
              description: t.features.cards[card.key].description,
              media: card.media,
            },
          ]
        : [];
    });
  const completedFeatureItems = buildFeatureItems(completedFeatureKeys);
  const inProgressFeatureItems = buildFeatureItems(inProgressFeatureKeys);

  return (
    <main id="top" className="overflow-x-hidden">
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(71,0,124,0.08)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 font-headline tracking-tight md:px-8">
          <Link
            href={withLocale("/", locale)}
            className="flex items-center gap-3"
          >
            <Image
              src="/paintersgo-logo.png"
              alt=""
              width={46}
              height={48}
              priority
              className="h-11 w-auto rounded-md bg-white object-contain"
            />
            <span className="bg-gradient-to-br from-primary to-primary-dim bg-clip-text text-2xl font-bold text-transparent">
              PaintersGO
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href={featureHref}
              className="border-b-2 border-primary pb-1 text-sm font-bold text-primary transition-colors"
            >
              {t.nav.features}
            </Link>
            <Link
              href={howItWorksHref}
              className="text-sm text-on-surface/70 transition-colors hover:text-on-surface"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              href={techHref}
              className="text-sm text-on-surface/70 transition-colors hover:text-on-surface"
            >
              {t.nav.techStack}
            </Link>
          </div>

          <InfoMenu
            locale={locale}
            copy={t.menu}
            authorHref={authorHref}
            workHref={projectHref}
            enHref={enHref}
            zhHref={zhHref}
          />
        </nav>
      </header>

      <section className="relative min-h-[88svh] overflow-hidden px-6 pb-20 pt-32 md:px-8">
        <VideoCoverPlayer
          src="/videos/intro_video.mp4"
          poster="/ar-hero.webp"
          alt={t.hero.imageAlt}
          buttonLabel="Play intro video"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full bg-black"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,12,0.78)_0%,rgba(7,8,12,0.55)_42%,rgba(7,8,12,0.12)_100%),radial-gradient(circle_at_18%_18%,rgba(204,151,255,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(83,221,252,0.14),transparent_32%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,0.10)_0%,rgba(7,8,12,0.34)_100%)]"
        />

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(88svh-13rem)] max-w-7xl items-center">
          <div className="max-w-4xl animate-[fade-in_0.7s_ease-out_both]">
            <h1 className="mb-6 max-w-5xl font-headline text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              {t.hero.titleLead} <span className="text-secondary">{t.hero.titleAccent}</span>{" "}
              {t.hero.titleTrail}
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/78 md:text-xl">
              {t.hero.body}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/PaintersGO.apk"
                className="bg-primary-gradient pointer-events-auto inline-flex min-h-14 items-center gap-3 rounded-lg px-8 py-4 text-lg font-bold text-primary-foreground transition-transform duration-300 hover:scale-95 active:scale-90"
              >
                <Download className="h-5 w-5" />
                {t.hero.ctaDownload}
              </a>
            </div>
            <div className="pointer-events-auto mt-5 flex max-w-2xl flex-wrap gap-2 text-xs text-white/72">
              {t.downloadMeta.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="pointer-events-auto mt-3 max-w-xl text-sm leading-relaxed text-white/62">
              {t.downloadMeta.note}
            </p>
            <p className="pointer-events-auto mt-3 max-w-2xl break-all font-mono text-[0.68rem] leading-relaxed text-white/48">
              {t.downloadMeta.checksumLabel}: {t.downloadMeta.checksum}
            </p>
            <Link
              href={privacyHref}
              className="pointer-events-auto mt-3 inline-flex text-sm font-semibold text-secondary transition-colors hover:text-secondary-fixed"
            >
              {t.downloadMeta.privacyLink}
            </Link>
          </div>
        </div>
      </section>
      <section className="border-y border-outline-variant/15 bg-surface-container-low py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mb-8 text-center font-label text-xs uppercase tracking-[0.32em] text-on-surface-variant">
            {t.engineCloud}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 md:gap-24">
            {engines.map((engine) => (
              <span key={engine} className="font-headline text-2xl font-bold text-on-surface">
                {engine}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 bg-surface-container-low px-6 py-24 md:scroll-mt-28 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              {t.flow.eyebrow}
            </h2>
            <p className="text-on-surface-variant">{t.flow.body}</p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-5">
            <div
              aria-hidden="true"
              className="absolute left-6 right-6 top-6 hidden border-t border-dashed border-outline-variant/30 md:block"
            />

            {steps.map((step) => {
              const stepCopy = t.flow.steps[step.key];

              return (
                <div key={step.number} className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-secondary/30 bg-surface-container-highest font-headline font-bold text-secondary">
                    {step.number}
                  </div>
                  <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">
                    {stepCopy.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {stepCopy.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 px-6 py-24 md:scroll-mt-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              {t.features.eyebrow}
            </h2>
            <p className="text-on-surface-variant">{t.features.body}</p>
          </div>

          <div className="space-y-16">
            <div>
              <div className="mb-8 max-w-3xl">
                <p className="mb-3 font-label text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                  {t.features.groups.completed.title}
                </p>
                <p className="text-on-surface-variant">
                  {t.features.groups.completed.body}
                </p>
              </div>
              <FeatureCarousel items={completedFeatureItems} />
            </div>

            <div>
              <div className="mb-8 max-w-3xl">
                <p className="mb-3 font-label text-xs font-bold uppercase tracking-[0.28em] text-primary">
                  {t.features.groups.inProgress.title}
                </p>
                <p className="text-on-surface-variant">
                  {t.features.groups.inProgress.body}
                </p>
              </div>
              <FeatureCarousel items={inProgressFeatureItems} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="workbench"
        className="scroll-mt-24 bg-surface-container-low px-6 py-24 md:scroll-mt-28 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              {t.workbench.eyebrow}
            </h2>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              {t.workbench.body}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workbenchDefinitions.map((item) => {
              const Icon = item.icon;
              const cardCopy = t.workbench.cards[item.key];

              return (
                <article
                  key={item.key}
                  className="rounded-lg border border-outline-variant/20 bg-background p-6"
                >
                  <Icon className={cn("mb-6 h-8 w-8", item.iconClassName)} />
                  <h3 className="mb-3 font-headline text-xl font-bold text-on-surface">
                    {cardCopy.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {cardCopy.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="roadmap"
        className="scroll-mt-24 bg-surface-container-low px-6 py-24 md:scroll-mt-28 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              {t.roadmap.eyebrow}
            </h2>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              {t.roadmap.body}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {roadmapDefinitions.map((item) => {
              const Icon = item.icon;
              const cardCopy = t.roadmap.cards[item.key];

              return (
                <article
                  key={item.key}
                  className="rounded-lg border border-outline-variant/20 bg-background p-6"
                >
                  <Icon className={cn("mb-6 h-8 w-8", item.iconClassName)} />
                  <h3 className="mb-3 font-headline text-xl font-bold text-on-surface">
                    {cardCopy.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {cardCopy.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="tech-stack"
        className="scroll-mt-24 bg-background px-6 py-24 md:scroll-mt-28 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
                {t.tech.eyebrow}
              </h2>
              <p className="text-on-surface-variant">{t.tech.body}</p>
            </div>
            <div className="hidden text-right md:block">
              <span className="font-mono text-sm text-tertiary">{t.tech.version}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techDefinitions.map((card) => {
              const techCopy = t.tech.cards[card.key];

              return (
                <article
                  key={card.key}
                  className={cn(
                    "rounded-lg border-l-2 bg-surface-container-highest p-6",
                    card.borderClassName,
                  )}
                >
                  <h3 className={cn("mb-2 font-headline text-lg font-bold", card.textClassName)}>
                    {techCopy.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {techCopy.description}
                  </p>
                </article>
              );
            })}

            <article className="rounded-lg border-l-2 border-secondary-fixed bg-surface-container-highest p-6">
              <h3 className="mb-2 flex items-center gap-2 font-headline text-lg font-bold text-secondary-fixed">
                <Sparkles className="h-4 w-4" />
                {t.tech.qualityTitle}
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {t.tech.qualityBody}
              </p>
            </article>

            <article className="rounded-lg border-l-2 border-primary bg-surface-container-highest p-6">
              <h3 className="mb-2 flex items-center gap-2 font-headline text-lg font-bold text-primary">
                <ShieldCheck className="h-4 w-4" />
                {t.tech.readinessTitle}
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {t.tech.readinessBody}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="github-overview"
        className="scroll-mt-24 bg-surface-container-high px-6 py-24 md:scroll-mt-28 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div>
              <h2 className="mb-5 font-headline text-4xl font-bold text-on-surface md:text-5xl">
                {t.githubOverview.eyebrow}
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-on-surface-variant">
                {t.githubOverview.body}
              </p>
            </div>
            <div className="rounded-lg border border-outline-variant/20 bg-background/70 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-tertiary">
                github.com/binyigan/paintersgo-site
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {githubOverviewImages.map((overviewImage) => {
              const imageCopy = t.githubOverview.images[overviewImage.key];

              return (
                <article
                  key={overviewImage.key}
                  className="overflow-hidden rounded-lg border border-outline-variant/20 bg-background"
                >
                  <a
                    href={overviewImage.src}
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-surface-container-low focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    aria-label={imageCopy.alt}
                  >
                    <Image
                      src={overviewImage.src}
                      width={overviewImage.width}
                      height={overviewImage.height}
                      alt={imageCopy.alt}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-auto w-full"
                    />
                  </a>
                  <div className="p-6">
                    <h3 className="mb-2 font-headline text-xl font-bold text-on-surface">
                      {imageCopy.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {imageCopy.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="vision"
        className="scroll-mt-24 bg-surface-container-low px-6 py-24 md:scroll-mt-28 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-headline text-4xl font-bold text-on-surface md:text-5xl">
              {t.vision.eyebrow}
            </h2>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              {t.vision.body}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.vision.points.map((point) => (
              <article
                key={point.title}
                className="rounded-lg border border-outline-variant/20 bg-background p-6"
              >
                <h3 className="mb-3 font-headline text-xl font-bold text-on-surface">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="scroll-mt-24 overflow-hidden px-6 py-24 md:scroll-mt-28 md:px-8"
      >
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-outline-variant/15 bg-surface-container-high p-8 text-center md:p-12">
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[80px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-[80px]"
          />

          <div className="relative z-10">
            <h2 className="mb-8 font-headline text-4xl font-bold text-on-surface md:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              {t.cta.body}
            </p>

            <a
              href="/PaintersGO.apk"
              className="bg-primary-gradient inline-flex min-h-14 items-center gap-4 rounded-lg px-10 py-5 text-xl font-bold text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Download className="h-5 w-5" />
              {t.cta.button}
            </a>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 text-left sm:grid-cols-4">
              {t.downloadMeta.items.map((item) => (
                <div
                  key={`${item}-download`}
                  className="rounded-lg border border-outline-variant/20 bg-background/55 px-4 py-3"
                >
                  <p className="font-label text-xs font-semibold text-on-surface">{item}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
              {t.downloadMeta.note}
            </p>
            <p className="mx-auto mt-3 max-w-3xl break-all font-mono text-[0.68rem] leading-relaxed text-on-surface-variant/70">
              {t.downloadMeta.checksumLabel}: {t.downloadMeta.checksum}
            </p>
            <DownloadSafetyPanel
              title={t.downloadMeta.safetyTitle}
              items={t.downloadMeta.safetyItems}
            />
            <Link
              href={privacyHref}
              className="mt-4 inline-flex text-sm font-semibold text-secondary transition-colors hover:text-secondary-fixed"
            >
              {t.downloadMeta.privacyLink}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-outline-variant/15 bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-8">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-headline text-lg font-bold text-on-surface">PaintersGO</span>
            <p className="font-body text-sm text-on-surface/50">{t.footer.copyright}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 font-body text-sm">
            <Link
              href={featureHref}
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              {t.nav.features}
            </Link>
            <Link
              href={howItWorksHref}
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              href={downloadHref}
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              {t.menu.download}
            </Link>
            <Link
              href={techHref}
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              {t.nav.techStack}
            </Link>
            <Link
              href={privacyHref}
              className="text-on-surface/50 transition-colors hover:text-secondary"
            >
              {t.footer.privacyLabel}
            </Link>
          </div>

          <div className="flex gap-4">
            <a
              href="https://paintersgo.top"
              aria-label={t.footer.websiteLabel}
              className="text-on-surface/30 transition-colors hover:text-primary"
            >
              <Globe2 className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/binyigan/paintersgo-site"
              target="_blank"
              rel="noreferrer"
              aria-label={t.footer.shareLabel}
              className="text-on-surface/30 transition-colors hover:text-primary"
            >
              <Share2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
