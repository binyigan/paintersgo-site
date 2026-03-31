import { useEffect, useState } from "react";
import { BalancedHeadline } from "./components/BalancedHeadline";

type Locale = "zh" | "en";

type Feature = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

type WorkflowStep = {
  title: string;
  body: string;
};

type Persona = {
  title: string;
  body: string;
};

type ProofCard = {
  title: string;
  body: string;
};

type MediaCard = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type ContactCard = {
  label: string;
  value: string;
};

type MetaCopy = {
  title: string;
  description: string;
};

type SiteCopy = {
  meta: MetaCopy;
  nav: {
    features: string;
    workflow: string;
    audience: string;
    faq: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Array<{ value: string; label: string }>;
  };
  introStrip: string[];
  features: {
    kicker: string;
    title: string;
    description: string;
    items: Feature[];
  };
  workflow: {
    kicker: string;
    title: string;
    description: string;
    steps: WorkflowStep[];
  };
  audience: {
    kicker: string;
    title: string;
    description: string;
    personas: Persona[];
  };
  proof: {
    kicker: string;
    title: string;
    description: string;
    cards: ProofCard[];
  };
  media: {
    kicker: string;
    title: string;
    description: string;
    cards: MediaCard[];
  };
  faq: {
    kicker: string;
    title: string;
    items: FaqItem[];
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    cards: ContactCard[];
  };
  footer: {
    product: string;
    rights: string;
  };
};

const siteBaseUrl = "https://paintersgo.top";
const sectionIds = ["home", "features", "workflow", "audience", "faq", "contact"] as const;

const copy: Record<Locale, SiteCopy> = {
  zh: {
    meta: {
      title: "PaintersGO | AI 3D 创作、上色协作与制造链路",
      description:
        "PaintersGO 降低 3D 内容创作门槛，连接 AI 生成 3D、移动端上色编辑、多人协作、云修复与 O2O 制造打印。"
    },
    nav: {
      features: "核心能力",
      workflow: "创作链路",
      audience: "适用人群",
      faq: "常见问题",
      contact: "下载入口"
    },
    hero: {
      badge: "从 AI 生成到实体制造的移动端入口",
      title: "让 3D 创作更容易开始，也更容易走向现实",
      subtitle:
        "PaintersGO 把 AI 生成 3D 模型、移动端上色编辑、多人协作、云修复与 O2O 制造打印串成一条更完整的产品链路，让更多人把想法变成可展示、可分享、可制造的三维成果。",
      primaryCta: "下载 Android APK",
      secondaryCta: "查看核心能力",
      stats: [
        { value: "AI", label: "从文字或图像快速进入 3D 创作起点" },
        { value: "Mobile", label: "直接在手机端查看、上色与处理模型" },
        { value: "Make", label: "继续连接修复、打印与实体交付场景" }
      ]
    },
    introStrip: [
      "AI 生成 3D 模型",
      "3D 上色编辑",
      "多人协作",
      "云修复",
      "O2O 制造 / 打印"
    ],
    features: {
      kicker: "核心能力",
      title: "先把产品最重要的五件事讲清楚",
      description:
        "PaintersGO 不是泛泛的沉浸式概念页，而是一个帮助用户真正完成 3D 创作与输出流程的产品。",
      items: [
        {
          id: "01",
          title: "AI 生成 3D 模型",
          description:
            "从文字描述或图片输入快速生成 3D 内容，降低从想法到三维资产的启动门槛。",
          image: "/vedio-to-3d.png",
          alt: "PaintersGO AI generated 3D feature preview"
        },
        {
          id: "02",
          title: "3D 上色编辑",
          description:
            "在移动端直接查看、上色、切换材质并微调细节，让 3D 表达不再强依赖桌面端。",
          image: "/pic1.jpg",
          alt: "PaintersGO 3D painting editor preview"
        },
        {
          id: "03",
          title: "多人协作",
          description:
            "围绕同一模型共同创作，让团队、朋友或社区创作者一起推进结构、颜色与结果。",
          image: "/pic2.jpg",
          alt: "PaintersGO collaboration concept"
        },
        {
          id: "04",
          title: "云修复",
          description:
            "为复杂模型加入云端修复环节，让作品更顺畅地进入打印与制造前准备。",
          image: "/pic3.jpg",
          alt: "PaintersGO cloud repair concept"
        },
        {
          id: "05",
          title: "O2O 制造 / 打印",
          description:
            "把数字模型继续推向线下制造与打印场景，让虚拟资产更接近实体交付。",
          image: "/o2o1.png",
          alt: "PaintersGO O2O manufacturing preview"
        }
      ]
    },
    workflow: {
      kicker: "创作链路",
      title: "从想法到实物，不再被拆成割裂的几段流程",
      description:
        "PaintersGO 的价值不只在某个 AI 能力，而在于它把原本分散的步骤串起来，让创作、协作和制造之间的过渡更自然。",
      steps: [
        {
          title: "生成",
          body: "输入提示词、导入图片，或打开已有模型，快速得到可继续推进的 3D 起点。"
        },
        {
          title: "编辑",
          body: "在手机端完成查看、上色、材质预览和局部细节微调，让表达更直接。"
        },
        {
          title: "协作",
          body: "让更多人围绕同一模型共同完善结构、色彩和最终呈现。"
        },
        {
          title: "修复与制造",
          body: "经过云修复后继续走向打印或制造服务，让数字成果真正接近实体输出。"
        }
      ]
    },
    audience: {
      kicker: "适用人群",
      title: "不只面向传统 3D 从业者",
      description:
        "PaintersGO 更像一个降低创作门槛的产品，而不是默认每位访客都熟悉复杂 3D 工具链的专业站点。",
      personas: [
        {
          title: "AI 创作者",
          body: "更快把概念、想法和视觉方向转换成可继续推进的 3D 内容。"
        },
        {
          title: "3D 打印玩家",
          body: "把数字模型推进到可修复、可打印、可落地的输出流程。"
        },
        {
          title: "设计师与内容创作者",
          body: "在移动端更直观地展示模型视觉效果与上色结果。"
        },
        {
          title: "团队与社区协作者",
          body: "围绕同一模型同步创作、同步反馈、同步推进结果。"
        }
      ]
    },
    proof: {
      kicker: "为什么重要",
      title: "PaintersGO 应该被看见的产品差异",
      description:
        "即使真实案例还在持续补充，官网也应该先把差异讲清楚，让访客理解它不是几个零散能力的拼接。",
      cards: [
        {
          title: "完整链路，而不是单点功能",
          body: "从生成、编辑到制造的叙事更完整，更适合作为产品官网的核心表达。"
        },
        {
          title: "移动端优先，而不是桌面端迁移",
          body: "PaintersGO 的一个重要特点，是把 3D 处理体验主动拉近到手机端。"
        },
        {
          title: "支持协作，而不只是强调个人操作",
          body: "多人协作不仅是功能点，也是产品长期潜力的重要组成。"
        }
      ]
    },
    media: {
      kicker: "效果展示",
      title: "用真实画面帮助访客更快建立直觉",
      description:
        "这些区域已经接入当前仓库里的真实素材，后续可以逐步替换成更高质量的截图、录屏和成品照片。",
      cards: [
        {
          title: "移动端 3D 体验",
          body: "展示应用界面、模型编辑状态和产品整体气质。",
          image: "/AR.png",
          alt: "PaintersGO mobile 3D experience"
        },
        {
          title: "制造与打印方向",
          body: "展示从数字模型走向线下制造服务的产品想象力。",
          image: "/o2o2.png",
          alt: "PaintersGO manufacturing and printing"
        },
        {
          title: "三维内容成果展示",
          body: "展示模型结果、视觉表现和产品输出氛围。",
          image: "/video-to-3d1.png",
          alt: "PaintersGO 3D output showcase"
        }
      ]
    },
    faq: {
      kicker: "常见问题",
      title: "先回答访客最容易关心的几个问题",
      items: [
        {
          q: "PaintersGO 是做什么的？",
          a: "它是一款连接 AI 3D 生成、移动端上色编辑、多人协作、云修复和实体制造链路的产品。"
        },
        {
          q: "它更像创作工具还是制造入口？",
          a: "两者都有，但核心价值首先在于降低 3D 创作门槛，再进一步连接修复、打印和制造场景。"
        },
        {
          q: "现在可以直接下载体验吗？",
          a: "可以，当前官网已经提供 Android APK 下载入口，后续会继续补充更多案例、素材和转化入口。"
        }
      ]
    },
    contact: {
      kicker: "下载与联系",
      title: "从这里开始体验 PaintersGO",
      body:
        "你可以先下载 Android APK 体验产品，后续再逐步看到更多真实案例、功能演示与制造场景内容。",
      primary: "下载 APK",
      secondary: "查看常见问题",
      cards: [
        { label: "平台", value: "Android APK 当前可用" },
        { label: "网站语言", value: "支持中文与英文访问版本" },
        { label: "当前重点", value: "AI 生成、移动编辑、协作、修复与制造链路" }
      ]
    },
    footer: {
      product: "PaintersGO",
      rights: "PaintersGO 官方网站，持续更新产品演示、案例素材与下载入口。"
    }
  },
  en: {
    meta: {
      title: "PaintersGO | AI 3D creation, painting, collaboration and making",
      description:
        "PaintersGO lowers the barrier to 3D creation by connecting AI generation, mobile painting, collaboration, cloud repair, and O2O manufacturing."
    },
    nav: {
      features: "Features",
      workflow: "Workflow",
      audience: "Audience",
      faq: "FAQ",
      contact: "Download"
    },
    hero: {
      badge: "A mobile entry point from AI 3D creation to physical making",
      title: "Make 3D creation easier to start and easier to bring into the real world",
      subtitle:
        "PaintersGO connects AI 3D generation, mobile painting and editing, multiplayer collaboration, cloud repair, and O2O manufacturing into one product flow, helping more people turn ideas into usable, shareable, and manufacturable 3D results.",
      primaryCta: "Download Android APK",
      secondaryCta: "Explore Core Features",
      stats: [
        { value: "AI", label: "Start 3D creation quickly from text or image input" },
        { value: "Mobile", label: "Inspect, paint, and refine models directly on phone" },
        { value: "Make", label: "Extend digital assets into repair, print, and delivery flow" }
      ]
    },
    introStrip: [
      "AI 3D Generation",
      "3D Painting & Editing",
      "Multiplayer Collaboration",
      "Cloud Repair",
      "O2O Manufacturing / Printing"
    ],
    features: {
      kicker: "Core Capabilities",
      title: "Start with the five product values that matter most",
      description:
        "PaintersGO should be understood as a product that helps people create 3D content more easily and move it closer to real-world output.",
      items: [
        {
          id: "01",
          title: "AI 3D Generation",
          description:
            "Generate 3D content from text or images and reduce the startup cost from idea to workable asset.",
          image: "/vedio-to-3d.png",
          alt: "PaintersGO AI 3D generation preview"
        },
        {
          id: "02",
          title: "3D Painting & Editing",
          description:
            "Inspect, paint, switch materials, and refine details directly on mobile with a more immediate workflow.",
          image: "/pic1.jpg",
          alt: "PaintersGO mobile painting and editing"
        },
        {
          id: "03",
          title: "Multiplayer Collaboration",
          description:
            "Invite teammates, friends, or community creators into the same model workflow and co-create instead of working alone.",
          image: "/pic2.jpg",
          alt: "PaintersGO collaboration flow"
        },
        {
          id: "04",
          title: "Cloud Repair",
          description:
            "Prepare complex assets through cloud repair so they can move more smoothly toward print or production readiness.",
          image: "/pic3.jpg",
          alt: "PaintersGO cloud repair preview"
        },
        {
          id: "05",
          title: "O2O Manufacturing / Printing",
          description:
            "Carry digital models into offline production and make PaintersGO an entry point to physical output.",
          image: "/o2o1.png",
          alt: "PaintersGO O2O manufacturing and printing"
        }
      ]
    },
    workflow: {
      kicker: "Workflow",
      title: "From idea to object, without splitting the story into disconnected tools",
      description:
        "The value of PaintersGO is not just one AI feature. It is the way the product connects scattered steps into a more natural creation-to-making path.",
      steps: [
        {
          title: "Generate",
          body: "Use prompts, images, or existing models to create a 3D starting point that can be pushed forward."
        },
        {
          title: "Edit",
          body: "Inspect, paint, preview materials, and refine details directly on mobile."
        },
        {
          title: "Collaborate",
          body: "Let more people contribute to the same model so ideas, structure, and style can evolve together."
        },
        {
          title: "Repair & Make",
          body: "Move through cloud repair and continue toward printing or manufacturing services."
        }
      ]
    },
    audience: {
      kicker: "Audience",
      title: "Not only for traditional 3D professionals",
      description:
        "PaintersGO works better as a product that lowers creation barriers, instead of a site that assumes every visitor already understands complex 3D pipelines.",
      personas: [
        {
          title: "AI Creators",
          body: "Turn concepts and visual ideas into 3D content faster with less startup friction."
        },
        {
          title: "3D Printing Hobbyists",
          body: "Push digital assets toward repair, print readiness, and real-world output."
        },
        {
          title: "Designers & Content Creators",
          body: "Present model visuals and color treatments more directly in a mobile workflow."
        },
        {
          title: "Teams & Communities",
          body: "Collaborate around the same model and move shared ideas forward together."
        }
      ]
    },
    proof: {
      kicker: "Why It Matters",
      title: "The product differences the homepage should make visible",
      description:
        "Even before more case studies arrive, the site should already communicate why PaintersGO is not just another isolated feature page.",
      cards: [
        {
          title: "A connected path, not isolated features",
          body: "The product story links generation, editing, repair, and making into one clearer journey."
        },
        {
          title: "Mobile-first instead of desktop-first",
          body: "PaintersGO matters because it brings parts of 3D workflow closer to the phone."
        },
        {
          title: "Built for collaboration, not only solo work",
          body: "Multiplayer collaboration is both a product differentiator and a future-facing capability."
        }
      ]
    },
    media: {
      kicker: "Visual Showcase",
      title: "Use real visuals to build product intuition faster",
      description:
        "These sections already use assets from the current repository. Later they can be replaced with stronger product screenshots, recordings, and result photos.",
      cards: [
        {
          title: "Mobile 3D Experience",
          body: "Show the app interface, model editing states, and the product's visual atmosphere.",
          image: "/AR.png",
          alt: "PaintersGO mobile 3D experience"
        },
        {
          title: "Manufacturing Direction",
          body: "Show how digital assets can continue into offline production and printing flow.",
          image: "/o2o2.png",
          alt: "PaintersGO manufacturing direction"
        },
        {
          title: "3D Result Showcase",
          body: "Show output quality, visual presentation, and the kind of 3D results users can expect.",
          image: "/video-to-3d1.png",
          alt: "PaintersGO 3D results"
        }
      ]
    },
    faq: {
      kicker: "FAQ",
      title: "Answer the first questions visitors are likely to ask",
      items: [
        {
          q: "What is PaintersGO?",
          a: "It is a product that connects AI 3D generation, mobile painting and editing, multiplayer collaboration, cloud repair, and physical manufacturing flow."
        },
        {
          q: "Is it mainly a creative tool or a manufacturing gateway?",
          a: "Both matter, but its first value is lowering the barrier to 3D creation before extending into repair, printing, and making."
        },
        {
          q: "Can I download it now?",
          a: "Yes. The current website provides an Android APK download while more case studies and feature materials continue to be added."
        }
      ]
    },
    contact: {
      kicker: "Download & Access",
      title: "Start exploring PaintersGO here",
      body:
        "You can download the current Android APK now and follow future updates as more real cases, demonstrations, and production content are added.",
      primary: "Download APK",
      secondary: "View FAQ",
      cards: [
        { label: "Platform", value: "Android APK currently available" },
        { label: "Languages", value: "Chinese and English access supported" },
        { label: "Current Focus", value: "AI generation, mobile editing, collaboration, repair, and making flow" }
      ]
    },
    footer: {
      product: "PaintersGO",
      rights: "Official PaintersGO website with evolving demos, assets, and download access."
    }
  }
};

const setMetaContent = (selector: string, value: string) => {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute("content", value);
  }
};

const getAnchorTarget = (href: string) => href.replace("#", "");

const App = () => {
  const initialLocale: Locale =
    typeof window !== "undefined" && window.location.pathname.startsWith("/en")
      ? "en"
      : "zh";

  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [activeSection, setActiveSection] =
    useState<(typeof sectionIds)[number]>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    const pathname = locale === "en" ? "/en/" : "/";
    const hash = window.location.hash;
    window.history.replaceState({}, "", `${pathname}${hash}`);
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
    document.title = t.meta.title;
    setMetaContent('meta[name="description"]', t.meta.description);
    setMetaContent('meta[property="og:title"]', t.meta.title);
    setMetaContent('meta[property="og:description"]', t.meta.description);
    setMetaContent('meta[name="twitter:title"]', t.meta.title);
    setMetaContent('meta[name="twitter:description"]', t.meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `${siteBaseUrl}${pathname}`);
    }
  }, [locale, t.meta.description, t.meta.title]);

  useEffect(() => {
    setFaqOpenIndex(0);
    setMenuOpen(false);
  }, [locale]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current?.target.id) {
          setActiveSection(current.target.id as (typeof sectionIds)[number]);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.55]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    nodes.forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${Math.min(index * 45, 220)}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [locale]);

  const scrollToSection = (href: string) => {
    const id = getAnchorTarget(href);
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 110;
    window.history.replaceState({}, "", `${window.location.pathname}#${id}`);
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    setActiveSection(id as (typeof sectionIds)[number]);
    setMenuOpen(false);
  };

  const navItems = [
    { href: "#features", label: t.nav.features },
    { href: "#workflow", label: t.nav.workflow },
    { href: "#audience", label: t.nav.audience },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact }
  ];

  const stageLabels =
    locale === "zh"
      ? { left: "AI 生成", top: "多人协作", bottom: "制造 / 打印" }
      : { left: "AI Generation", top: "Co-create", bottom: "Make / Print" };

  return (
    <div className="site-shell">
      <header className={`topbar${scrolled ? " is-scrolled" : ""}`}>
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("#home");
          }}
        >
          <span className="brand-mark">
            <img src="/logo.png" alt="PaintersGO logo" />
          </span>
          <span className="brand-text">PaintersGO</span>
        </a>

        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={locale === "zh" ? "打开导航菜单" : "Open navigation menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav${menuOpen ? " is-open" : ""}`} id="site-nav">
          {navItems.map((item) => {
            const target = getAnchorTarget(item.href);

            return (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === target ? "is-active" : ""}
                aria-current={activeSection === target ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="locale-toggle" role="group" aria-label="Language switcher">
          <button
            className={locale === "zh" ? "is-active" : ""}
            type="button"
            onClick={() => setLocale("zh")}
            aria-pressed={locale === "zh"}
          >
            中文
          </button>
          <button
            className={locale === "en" ? "is-active" : ""}
            type="button"
            onClick={() => setLocale("en")}
            aria-pressed={locale === "en"}
          >
            EN
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero" data-reveal="hero">
          <div className="hero-copy" data-reveal="hero-copy">
            <span className="eyebrow">{t.hero.badge}</span>
            <h1>
              <BalancedHeadline
                className="balanced-text balanced-text-hero"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.64 : 0.58}
                text={t.hero.title}
              />
            </h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="/PaintersGO.apk">
                <BalancedHeadline
                  className="balanced-text balanced-text-button"
                  locale={locale}
                  minWidthRatio={0.78}
                  text={t.hero.primaryCta}
                />
              </a>
              <a
                className="button button-secondary"
                href="#features"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#features");
                }}
              >
                <BalancedHeadline
                  className="balanced-text balanced-text-button"
                  locale={locale}
                  minWidthRatio={0.78}
                  text={t.hero.secondaryCta}
                />
              </a>
            </div>

            <div className="hero-stats">
              {t.hero.stats.map((item) => (
                <article key={item.label} className="stat-card" data-reveal="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-stage" aria-label="PaintersGO visual overview" data-reveal="hero-stage">
            <img className="hero-stage-image" src="/background.jpg" alt="PaintersGO visual background" />

            <div className="stage-panel primary-panel">
              <span className="panel-label">{stageLabels.left}</span>
              <div className="panel-screen">
                <img src="/vedio-to-3d.png" alt="PaintersGO AI generation preview" />
              </div>
            </div>

            <div className="stage-panel side-panel top">
              <span className="panel-label">{stageLabels.top}</span>
              <div className="mini-preview">
                <img src="/pic2.jpg" alt="PaintersGO collaboration preview" />
              </div>
            </div>

            <div className="stage-panel side-panel bottom">
              <span className="panel-label">{stageLabels.bottom}</span>
              <div className="mini-preview">
                <img src="/o2o1.png" alt="PaintersGO manufacturing preview" />
              </div>
            </div>
          </div>
        </section>

        <section className="capability-strip" data-reveal="capabilities">
          {t.introStrip.map((item) => (
            <span key={item}>
              <BalancedHeadline
                className="balanced-text balanced-text-pill"
                locale={locale}
                minWidthRatio={0.82}
                text={item}
              />
            </span>
          ))}
        </section>

        <section className="section" id="features" data-reveal="features">
          <div className="section-head">
            <span className="eyebrow">{t.features.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.66 : 0.6}
                text={t.features.title}
              />
            </h2>
            <p>{t.features.description}</p>
          </div>

          <div className="feature-grid">
            {t.features.items.map((item, index) => (
              <article
                key={item.id}
                className={`feature-card feature-card-${index + 1}`}
                data-reveal="feature-card"
              >
                <div className="feature-meta">
                  <span className="feature-tag">{item.id}</span>
                  <span className="feature-label">
                    <BalancedHeadline
                      className="balanced-text balanced-text-card"
                      locale={locale}
                      minWidthRatio={0.8}
                      text={item.title}
                    />
                  </span>
                </div>
                <p>{item.description}</p>
                <div className="media-slot media-slot-image">
                  <img src={item.image} alt={item.alt} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section workflow-section" id="workflow" data-reveal="workflow">
          <div className="section-head">
            <span className="eyebrow">{t.workflow.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.68 : 0.6}
                text={t.workflow.title}
              />
            </h2>
            <p>{t.workflow.description}</p>
          </div>

          <div className="workflow-grid">
            {t.workflow.steps.map((step, index) => (
              <article key={step.title} className="workflow-card" data-reveal="workflow-card">
                <span className="step-index">0{index + 1}</span>
                <h3>
                  <BalancedHeadline
                    className="balanced-text balanced-text-card"
                    locale={locale}
                    minWidthRatio={0.8}
                    text={step.title}
                  />
                </h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section audience-section" id="audience" data-reveal="audience">
          <div className="section-head">
            <span className="eyebrow">{t.audience.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.68 : 0.62}
                text={t.audience.title}
              />
            </h2>
            <p>{t.audience.description}</p>
          </div>

          <div className="audience-grid">
            {t.audience.personas.map((item) => (
              <article key={item.title} className="audience-card" data-reveal="audience-card">
                <h3>
                  <BalancedHeadline
                    className="balanced-text balanced-text-card"
                    locale={locale}
                    minWidthRatio={0.8}
                    text={item.title}
                  />
                </h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section proof-section" data-reveal="proof">
          <div className="section-head">
            <span className="eyebrow">{t.proof.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.68 : 0.62}
                text={t.proof.title}
              />
            </h2>
            <p>{t.proof.description}</p>
          </div>

          <div className="proof-grid">
            {t.proof.cards.map((card) => (
              <article key={card.title} className="proof-card" data-reveal="proof-card">
                <h3>
                  <BalancedHeadline
                    className="balanced-text balanced-text-card"
                    locale={locale}
                    minWidthRatio={0.8}
                    text={card.title}
                  />
                </h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section showcase-section" data-reveal="showcase">
          <div className="section-head">
            <span className="eyebrow">{t.media.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.68 : 0.62}
                text={t.media.title}
              />
            </h2>
            <p>{t.media.description}</p>
          </div>

          <div className="showcase-grid">
            {t.media.cards.map((card, index) => (
              <article
                key={card.title}
                className={`showcase-card showcase-card-${index + 1}`}
                data-reveal="showcase-card"
              >
                <div className="showcase-placeholder">
                  <img src={card.image} alt={card.alt} />
                </div>
                <h3>
                  <BalancedHeadline
                    className="balanced-text balanced-text-card"
                    locale={locale}
                    minWidthRatio={0.8}
                    text={card.title}
                  />
                </h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section faq-section" id="faq" data-reveal="faq">
          <div className="section-head">
            <span className="eyebrow">{t.faq.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.7 : 0.62}
                text={t.faq.title}
              />
            </h2>
          </div>

          <div className="faq-list">
            {t.faq.items.map((item, index) => (
              <article
                key={item.q}
                className={`faq-item${faqOpenIndex === index ? " is-open" : ""}`}
                data-reveal="faq-item"
              >
                <button
                  className="faq-trigger"
                  type="button"
                  aria-expanded={faqOpenIndex === index}
                  onClick={() =>
                    setFaqOpenIndex((current) => (current === index ? -1 : index))
                  }
                >
                  <h3>
                    <BalancedHeadline
                      className="balanced-text balanced-text-card"
                      locale={locale}
                      minWidthRatio={0.82}
                      text={item.q}
                    />
                  </h3>
                  <span className="faq-icon" aria-hidden="true">
                    {faqOpenIndex === index ? "-" : "+"}
                  </span>
                </button>
                <div className="faq-answer" hidden={faqOpenIndex !== index}>
                  <p>{item.a}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section" id="contact" data-reveal="contact">
          <div className="cta-card" data-reveal="cta-card">
            <span className="eyebrow">{t.contact.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.7 : 0.62}
                text={t.contact.title}
              />
            </h2>
            <p>{t.contact.body}</p>

            <div className="contact-grid">
              {t.contact.cards.map((card) => (
                <article key={card.label} className="contact-chip" data-reveal="contact-chip">
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </article>
              ))}
            </div>

            <div className="hero-actions">
              <a className="button button-primary" href="/PaintersGO.apk">
                <BalancedHeadline
                  className="balanced-text balanced-text-button"
                  locale={locale}
                  minWidthRatio={0.78}
                  text={t.contact.primary}
                />
              </a>
              <a
                className="button button-secondary"
                href="#faq"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#faq");
                }}
              >
                <BalancedHeadline
                  className="balanced-text balanced-text-button"
                  locale={locale}
                  minWidthRatio={0.78}
                  text={t.contact.secondary}
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>{t.footer.product}</span>
        <span>{t.footer.rights}</span>
      </footer>
    </div>
  );
};

export default App;
