import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Globe2,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { FeatureCarousel, type FeatureIconKey } from "@/components/feature-carousel";
import { InfoMenu } from "@/components/info-menu";
import type { Locale } from "@/lib/locale";
import { resolveLocale, withLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type FeatureKey =
  | "aiTo3D"
  | "multiEngine"
  | "editor"
  | "sculpting"
  | "repair"
  | "collab"
  | "printing";

type StepKey = "input" | "generate" | "refine" | "collaborate" | "export";

type TechKey =
  | "compose"
  | "threeBridge"
  | "remoteConfig"
  | "architecture"
  | "security";

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

type StepCopy = {
  title: string;
  description: string;
};

type TechCopy = {
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
  engineCloud: string;
  features: {
    eyebrow: string;
    body: string;
    cards: Record<FeatureKey, FeatureCopy>;
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
  cta: {
    title: string;
    body: string;
    button: string;
  };
  footer: {
    copyright: string;
    websiteLabel: string;
    shareLabel: string;
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
      src: "/app-assets/feature-previews/sculpting.png",
      alt: "Sculpting showcase preview",
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
    engineCloud: "Powered by Industry Leading Engines",
    features: {
      eyebrow: "Core Creative Engine",
      body:
        "High-fidelity 3D generation, repair, collaboration, and delivery in one mobile workflow.",
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
        repair: {
          title: "Cloud Model Repair",
          description:
            "Instantly close mesh issues, repair normals, and clean geometry for reliable exports and production-ready printable output.",
          imageAlt: "PaintersGO model refinement and repair preview",
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
    engineCloud: "\u7531\u9886\u5148\u7684 3D \u751f\u6210\u5f15\u64ce\u9a71\u52a8",
    features: {
      eyebrow: "\u6838\u5fc3\u521b\u4f5c\u5f15\u64ce",
      body:
        "\u628a\u9ad8\u8d28\u91cf 3D \u751f\u6210\u3001\u4fee\u590d\u3001\u534f\u4f5c\u4e0e\u4ea4\u4ed8\u6574\u5408\u5230\u540c\u4e00\u5957\u79fb\u52a8\u7aef\u5de5\u4f5c\u6d41\u91cc\u3002",
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
        repair: {
          title: "\u4e91\u7aef\u6a21\u578b\u4fee\u590d",
          description:
            "\u5373\u65f6\u4fee\u590d\u7f51\u683c\u95ee\u9898\u3001\u6cd5\u7ebf\u9519\u8bef\u548c\u51e0\u4f55\u7f3a\u9677\uff0c\u8ba9\u5bfc\u51fa\u7ed3\u679c\u66f4\u7a33\u5b9a\uff0c\u4e5f\u66f4\u9002\u5408\u540e\u7eed\u6253\u5370\u4e0e\u751f\u4ea7\u3002",
          imageAlt: "PaintersGO \u6a21\u578b\u4fee\u590d\u529f\u80fd\u9884\u89c8",
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

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const locale = resolveLocale((await searchParams).lang);
  const t = copyByLocale[locale];

  const featureHref = withLocale("/#features", locale);
  const howItWorksHref = withLocale("/#how-it-works", locale);
  const techHref = withLocale("/#tech-stack", locale);
  const downloadHref = withLocale("/#download", locale);
  const authorHref = withLocale("/author", locale);
  const projectHref = withLocale("/project", locale);
  const zhHref = withLocale("/", "zh");
  const enHref = withLocale("/", "en");
  const featureItems = featureDefinitions.map((card) => ({
    id: card.key,
    icon: card.icon,
    iconClassName: card.iconClassName,
    title: t.features.cards[card.key].title,
    description: t.features.cards[card.key].description,
    media: card.media,
  }));

  return (
    <main id="top" className="overflow-x-hidden">
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(71,0,124,0.08)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 font-headline tracking-tight md:px-8">
          <Link
            href={withLocale("/", locale)}
            className="bg-gradient-to-br from-primary to-primary-dim bg-clip-text text-2xl font-bold text-transparent"
          >
            PaintersGO
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

      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8">
        <div
          aria-hidden="true"
          className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/20 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/12 blur-[100px]"
        />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="relative z-10 animate-[fade-in_0.7s_ease-out_both]">
            <h1 className="mb-6 max-w-4xl font-headline text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              {t.hero.titleLead} <span className="text-secondary">{t.hero.titleAccent}</span>{" "}
              {t.hero.titleTrail}
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              {t.hero.body}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/PaintersGO.apk"
                className="bg-primary-gradient inline-flex min-h-14 items-center gap-3 rounded-lg px-8 py-4 text-lg font-bold text-primary-foreground transition-transform duration-300 hover:scale-95 active:scale-90"
              >
                <Download className="h-5 w-5" />
                {t.hero.ctaDownload}
              </a>
            </div>
          </div>

          <div className="group relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-primary/20 blur-[100px]"
            />

            <div className="glass-panel glow-shadow relative overflow-hidden rounded-[2rem] border border-outline-variant/15 p-6 shadow-2xl sm:p-8 lg:rounded-[999px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.10),transparent_42%),radial-gradient(circle_at_78%_82%,rgba(83,221,252,0.10),transparent_24%)]"
              />

              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] lg:rounded-[999px]">
                <Image
                  src="/AR.png"
                  alt={t.hero.imageAlt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
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

      <section id="features" className="px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              {t.features.eyebrow}
            </h2>
            <p className="text-on-surface-variant">{t.features.body}</p>
          </div>

          <FeatureCarousel items={featureItems} />
        </div>
      </section>

      <section id="how-it-works" className="bg-surface-container-low px-6 py-24 md:px-8">
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

      <section id="tech-stack" className="bg-background px-6 py-24 md:px-8">
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

      <section id="download" className="overflow-hidden px-6 py-24 md:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-outline-variant/15 bg-surface-container-high p-12 text-center">
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
