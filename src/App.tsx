import { useEffect, useState } from "react";
import { BalancedHeadline } from "./components/BalancedHeadline";

type Locale = "zh" | "en";

type NavItem = {
  href: string;
  label: string;
};

type HeroMetric = {
  value: string;
  label: string;
};

type FlowCard = {
  id: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

type AppPanel = {
  title: string;
  body: string;
  image: string;
  alt: string;
  bullets: string[];
};

type UseCase = {
  title: string;
  body: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type ContactChip = {
  label: string;
  value: string;
};

type SiteCopy = {
  meta: {
    title: string;
    description: string;
  };
  nav: NavItem[];
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: HeroMetric[];
    screenTitle: string;
    screenBody: string;
    floatingTop: string;
    floatingBottom: string;
  };
  flow: {
    kicker: string;
    title: string;
    description: string;
    cards: FlowCard[];
  };
  inside: {
    kicker: string;
    title: string;
    description: string;
    panels: AppPanel[];
  };
  useCases: {
    kicker: string;
    title: string;
    items: UseCase[];
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
    chips: ContactChip[];
  };
  footer: {
    product: string;
    rights: string;
  };
};

const siteBaseUrl = "https://paintersgo.top";
const sectionIds = ["home", "flow", "inside", "use-cases", "faq", "download"] as const;

const copy: Record<Locale, SiteCopy> = {
  zh: {
    meta: {
      title: "PaintersGO | 一款真正把 3D 创作带到手机上的应用",
      description:
        "PaintersGO 把 AI 生成、3D 上色、多人协作、云修复与打印输出整合成一条更像 app 的移动工作流。"
    },
    nav: [
      { href: "#flow", label: "核心流程" },
      { href: "#inside", label: "应用界面" },
      { href: "#use-cases", label: "适用场景" },
      { href: "#faq", label: "FAQ" },
      { href: "#download", label: "下载" }
    ],
    hero: {
      badge: "A mobile-first 3D creation app",
      title: "像真正的 3D 应用一样介绍它，而不是像一页散乱官网",
      subtitle:
        "PaintersGO 的重点不是堆功能词，而是把 AI 生成、模型上色、多人协作和打印前处理整合成一个在手机上可用、可理解、可持续推进的 3D 创作体验。",
      primaryCta: "下载 Android APK",
      secondaryCta: "查看应用界面",
      metrics: [
        { value: "AI", label: "从文字或图片生成 3D 起点" },
        { value: "Paint", label: "在手机上直接上色与查看材质" },
        { value: "Output", label: "继续走向修复、打印和交付" }
      ],
      screenTitle: "移动端 3D 工作台",
      screenBody: "更接近真实 app 的介绍方式：先看到界面、再理解流程、最后决定是否下载。",
      floatingTop: "多人共创同一模型",
      floatingBottom: "打印前修复与输出"
    },
    flow: {
      kicker: "Core Flow",
      title: "PaintersGO 的价值，在于这四步能自然连起来",
      description: "这不是几个孤立能力的堆叠，而是一条对移动端更友好的 3D 工作流。",
      cards: [
        {
          id: "01",
          title: "AI 生成",
          body: "从文字提示或图片快速生成三维起点，先把灵感变成可操作对象。",
          image: "/vedio-to-3d.png",
          alt: "PaintersGO AI generation"
        },
        {
          id: "02",
          title: "模型上色",
          body: "直接在手机上查看模型、切换材质、调整颜色，让表达更接近即时创作。",
          image: "/pic1.jpg",
          alt: "PaintersGO painting editor"
        },
        {
          id: "03",
          title: "协作推进",
          body: "邀请团队或朋友围绕同一模型继续迭代，不再停留在单人编辑。",
          image: "/pic2.jpg",
          alt: "PaintersGO collaboration"
        },
        {
          id: "04",
          title: "修复输出",
          body: "完成云修复后继续走向打印或制造，让数字内容更容易抵达现实世界。",
          image: "/o2o2.png",
          alt: "PaintersGO output flow"
        }
      ]
    },
    inside: {
      kicker: "Inside The App",
      title: "把应用界面放到最前面，访客才能快速理解这是什么产品",
      description: "相比大段说明文字，真实界面、状态和操作氛围更能建立对 3D app 的第一印象。",
      panels: [
        {
          title: "生成与查看",
          body: "先看到内容如何被生成，再看到它如何进入移动端查看和继续编辑。",
          image: "/AR.png",
          alt: "PaintersGO app preview",
          bullets: ["Prompt 到 3D 起点", "移动端查看模型", "更快决定是否继续细化"]
        },
        {
          title: "材质与结果",
          body: "不是静态海报，而是更贴近 app 内部状态的模型展示和结果呈现。",
          image: "/video-to-3d1.png",
          alt: "PaintersGO result preview",
          bullets: ["颜色与材质表达", "输出效果更直观", "适合介绍成品质量"]
        }
      ]
    },
    useCases: {
      kicker: "Use Cases",
      title: "更适合这些会真的下载一个 3D app 的人",
      items: [
        {
          title: "AI 创作者",
          body: "想把灵感尽快变成 3D 结果，不想被复杂桌面软件挡在门外。"
        },
        {
          title: "3D 打印玩家",
          body: "需要从模型处理一路走到修复、打印和实体输出。"
        },
        {
          title: "内容团队",
          body: "需要更轻量地展示模型效果、配色方向和视觉成果。"
        }
      ]
    },
    faq: {
      kicker: "FAQ",
      title: "先回答真正会影响下载决策的问题",
      items: [
        {
          q: "PaintersGO 是什么？",
          a: "它是一款把 AI 3D 生成、移动端上色、协作、修复和打印输出整合在一起的 3D 创作应用。"
        },
        {
          q: "它更偏创作还是更偏打印？",
          a: "两者都覆盖，但体验重点是先让 3D 创作在手机上更容易开始，再自然延伸到打印与交付。"
        },
        {
          q: "现在可以直接体验吗？",
          a: "可以，当前官网已经提供 Android APK 下载入口。"
        }
      ]
    },
    contact: {
      kicker: "Download",
      title: "如果你想看一个更像 app 的 3D 产品，先从安装开始",
      body: "官网负责帮助你快速理解产品，真正的体验仍然发生在应用里。当前已经提供 Android APK 下载。",
      primary: "立即下载 APK",
      secondary: "查看 FAQ",
      chips: [
        { label: "平台", value: "Android APK" },
        { label: "语言", value: "中文 / English" },
        { label: "关键词", value: "AI 生成、上色、协作、打印" }
      ]
    },
    footer: {
      product: "PaintersGO",
      rights: "PaintersGO 官方站点，持续更新应用界面、演示素材与下载入口。"
    }
  },
  en: {
    meta: {
      title: "PaintersGO | A real mobile intro for a 3D creation app",
      description:
        "PaintersGO combines AI generation, model painting, collaboration, cloud repair, and print output into a clearer mobile-first 3D workflow."
    },
    nav: [
      { href: "#flow", label: "Core Flow" },
      { href: "#inside", label: "App Screens" },
      { href: "#use-cases", label: "Use Cases" },
      { href: "#faq", label: "FAQ" },
      { href: "#download", label: "Download" }
    ],
    hero: {
      badge: "A mobile-first 3D creation app",
      title: "Introduce it like a real 3D app, not like a scattered landing page",
      subtitle:
        "PaintersGO is not about stacking feature buzzwords. It brings AI generation, model painting, collaboration, and output preparation into a mobile 3D workflow that people can actually understand and want to try.",
      primaryCta: "Download Android APK",
      secondaryCta: "See App Screens",
      metrics: [
        { value: "AI", label: "Turn text or images into a 3D starting point" },
        { value: "Paint", label: "Inspect and paint models directly on phone" },
        { value: "Output", label: "Continue into repair, print, and delivery" }
      ],
      screenTitle: "Mobile 3D workspace",
      screenBody: "A stronger app intro starts with the interface, then the workflow, then the download decision.",
      floatingTop: "Co-create around one model",
      floatingBottom: "Repair and output before print"
    },
    flow: {
      kicker: "Core Flow",
      title: "The value of PaintersGO is that these four steps connect naturally",
      description: "This should feel like one mobile 3D workflow, not a pile of disconnected features.",
      cards: [
        {
          id: "01",
          title: "AI Generation",
          body: "Start from text prompts or images and turn the idea into something workable in 3D.",
          image: "/vedio-to-3d.png",
          alt: "PaintersGO AI generation"
        },
        {
          id: "02",
          title: "Model Painting",
          body: "Inspect, switch materials, and paint directly on mobile so the workflow feels immediate.",
          image: "/pic1.jpg",
          alt: "PaintersGO painting editor"
        },
        {
          id: "03",
          title: "Collaboration",
          body: "Invite teammates or friends to keep evolving the same model instead of stopping at solo editing.",
          image: "/pic2.jpg",
          alt: "PaintersGO collaboration"
        },
        {
          id: "04",
          title: "Repair & Output",
          body: "Move through repair and continue toward printing or making so digital work gets closer to reality.",
          image: "/o2o2.png",
          alt: "PaintersGO output flow"
        }
      ]
    },
    inside: {
      kicker: "Inside The App",
      title: "Put the app interface first so visitors understand the product quickly",
      description: "Real screens, states, and visual atmosphere explain a 3D app better than paragraphs of generic product copy.",
      panels: [
        {
          title: "Generate & Inspect",
          body: "Show how content starts, then how it moves into a mobile interface for inspection and iteration.",
          image: "/AR.png",
          alt: "PaintersGO app preview",
          bullets: ["Prompt to 3D starting point", "Mobile model inspection", "Faster iteration decisions"]
        },
        {
          title: "Materials & Results",
          body: "Present actual in-app model views and visual output instead of abstract marketing blocks.",
          image: "/video-to-3d1.png",
          alt: "PaintersGO result preview",
          bullets: ["Color and material presentation", "Clearer output expectation", "Stronger result storytelling"]
        }
      ]
    },
    useCases: {
      kicker: "Use Cases",
      title: "A better fit for people who would actually download a 3D app",
      items: [
        {
          title: "AI Creators",
          body: "People who want to turn ideas into 3D output quickly without getting blocked by heavy desktop tooling."
        },
        {
          title: "3D Printing Hobbyists",
          body: "People who need a path from model handling into repair, printing, and physical output."
        },
        {
          title: "Content Teams",
          body: "People who need a lighter way to show model quality, color direction, and visual results."
        }
      ]
    },
    faq: {
      kicker: "FAQ",
      title: "Answer the questions that actually affect the download decision",
      items: [
        {
          q: "What is PaintersGO?",
          a: "It is a 3D creation app that combines AI generation, mobile painting, collaboration, repair, and print-ready output flow."
        },
        {
          q: "Is it more for creation or more for printing?",
          a: "It covers both, but the experience starts by making 3D creation easier on mobile before extending naturally toward print and delivery."
        },
        {
          q: "Can I try it right now?",
          a: "Yes. The current website already provides an Android APK download."
        }
      ]
    },
    contact: {
      kicker: "Download",
      title: "If you want to experience a more app-like 3D product, start with the install",
      body: "The site helps people understand the product quickly. The real experience still happens inside the app, and Android APK is already available.",
      primary: "Download APK",
      secondary: "View FAQ",
      chips: [
        { label: "Platform", value: "Android APK" },
        { label: "Language", value: "Chinese / English" },
        { label: "Keywords", value: "AI generation, painting, collaboration, print" }
      ]
    },
    footer: {
      product: "PaintersGO",
      rights: "Official PaintersGO site with evolving app screens, demos, and download access."
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
    typeof window !== "undefined" && window.location.pathname.startsWith("/en") ? "en" : "zh";

  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>("home");
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
      setScrolled(window.scrollY > 16);
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
      node.style.setProperty("--reveal-delay", `${Math.min(index * 40, 220)}ms`);
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

    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.history.replaceState({}, "", `${window.location.pathname}#${id}`);
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    setActiveSection(id as (typeof sectionIds)[number]);
    setMenuOpen(false);
  };

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
          {t.nav.map((item) => {
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
                minWidthRatio={locale === "zh" ? 0.62 : 0.58}
                text={t.hero.title}
              />
            </h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="/PaintersGO.apk">
                {t.hero.primaryCta}
              </a>
              <a
                className="button button-secondary"
                href="#inside"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#inside");
                }}
              >
                {t.hero.secondaryCta}
              </a>
            </div>

            <div className="hero-metrics">
              {t.hero.metrics.map((item) => (
                <article key={item.label} className="metric-card" data-reveal="metric-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual" data-reveal="hero-visual">
            <div className="screen-card">
              <div className="screen-header">
                <div className="screen-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span>{t.hero.screenTitle}</span>
              </div>
              <div className="screen-frame">
                <img src="/AR.png" alt="PaintersGO app preview" />
              </div>
              <div className="screen-copy">
                <h2>{t.hero.screenTitle}</h2>
                <p>{t.hero.screenBody}</p>
              </div>
            </div>

            <article className="floating-card floating-top">
              <div className="floating-thumb">
                <img src="/pic2.jpg" alt="PaintersGO collaboration preview" />
              </div>
              <span>{t.hero.floatingTop}</span>
            </article>

            <article className="floating-card floating-bottom">
              <div className="floating-thumb">
                <img src="/o2o2.png" alt="PaintersGO output preview" />
              </div>
              <span>{t.hero.floatingBottom}</span>
            </article>
          </div>
        </section>

        <section className="section flow-section" id="flow" data-reveal="flow">
          <div className="section-head">
            <span className="eyebrow">{t.flow.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.66 : 0.6}
                text={t.flow.title}
              />
            </h2>
            <p>{t.flow.description}</p>
          </div>

          <div className="flow-grid">
            {t.flow.cards.map((card) => (
              <article key={card.id} className="flow-card" data-reveal="flow-card">
                <div className="flow-card-top">
                  <span className="flow-index">{card.id}</span>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.body}</p>
                <div className="flow-media">
                  <img src={card.image} alt={card.alt} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section inside-section" id="inside" data-reveal="inside">
          <div className="section-head">
            <span className="eyebrow">{t.inside.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.66 : 0.6}
                text={t.inside.title}
              />
            </h2>
            <p>{t.inside.description}</p>
          </div>

          <div className="inside-grid">
            {t.inside.panels.map((panel) => (
              <article key={panel.title} className="inside-card" data-reveal="inside-card">
                <div className="inside-preview">
                  <img src={panel.image} alt={panel.alt} />
                </div>
                <div className="inside-copy">
                  <h3>{panel.title}</h3>
                  <p>{panel.body}</p>
                  <ul className="inside-bullets">
                    {panel.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section use-case-section" id="use-cases" data-reveal="use-cases">
          <div className="section-head">
            <span className="eyebrow">{t.useCases.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.68 : 0.62}
                text={t.useCases.title}
              />
            </h2>
          </div>

          <div className="use-case-grid">
            {t.useCases.items.map((item) => (
              <article key={item.title} className="use-case-card" data-reveal="use-case-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
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
                minWidthRatio={locale === "zh" ? 0.68 : 0.62}
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
                  onClick={() => setFaqOpenIndex((current) => (current === index ? -1 : index))}
                >
                  <h3>{item.q}</h3>
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

        <section className="section download-section" id="download" data-reveal="download">
          <div className="download-copy">
            <span className="eyebrow">{t.contact.kicker}</span>
            <h2>
              <BalancedHeadline
                className="balanced-text balanced-text-section"
                locale={locale}
                minWidthRatio={locale === "zh" ? 0.68 : 0.62}
                text={t.contact.title}
              />
            </h2>
            <p>{t.contact.body}</p>

            <div className="download-actions">
              <a className="button button-primary" href="/PaintersGO.apk">
                {t.contact.primary}
              </a>
              <a
                className="button button-secondary"
                href="#faq"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#faq");
                }}
              >
                {t.contact.secondary}
              </a>
            </div>
          </div>

          <div className="download-chips">
            {t.contact.chips.map((chip) => (
              <article key={chip.label} className="download-chip" data-reveal="download-chip">
                <span>{chip.label}</span>
                <strong>{chip.value}</strong>
              </article>
            ))}
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
