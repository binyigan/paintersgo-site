import { useMemo, useState } from "react";

type Locale = "zh" | "en";

type Feature = {
  id: string;
  title: string;
  description: string;
  mediaLabel: string;
};

type Persona = {
  title: string;
  body: string;
};

type WorkflowStep = {
  title: string;
  body: string;
};

type ProofCard = {
  title: string;
  body: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type SiteCopy = {
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
    note: string;
  };
  introStrip: Array<string>;
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
    slots: Array<{ title: string; body: string }>;
  };
  faq: {
    kicker: string;
    title: string;
    items: FaqItem[];
  };
  contact: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    cards: Array<{ label: string; value: string }>;
  };
  footer: {
    product: string;
    rights: string;
  };
};

const copy: Record<Locale, SiteCopy> = {
  zh: {
    nav: {
      features: "核心能力",
      workflow: "创作链路",
      audience: "适用人群",
      faq: "常见问题",
      contact: "下载与联系"
    },
    hero: {
      badge: "PaintersGO 官方展示页提案",
      title: "降低 3D 内容创作门槛，打通从虚拟资产到实物制造的全链路",
      subtitle:
        "PaintersGO 将 AI 生成 3D 模型、移动端 3D 上色编辑、多人协作、云修复与 O2O 制造/打印整合到一套连续体验里，让更多人能真正把 3D 创作做起来、做下去、做成实物。",
      primaryCta: "下载 Android 版本",
      secondaryCta: "查看功能展示",
      stats: [
        { value: "AI", label: "从文本或图像快速生成可操作的 3D 起点" },
        { value: "Edit", label: "在手机端直接查看、上色与调整模型" },
        { value: "Make", label: "继续走向修复、打印与实体交付" }
      ],
      note:
        "这一版先建立正式官网的表达骨架。截图、录屏、品牌图和案例素材后续可以逐块替换进来，不需要再推翻布局。"
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
      title: "首页先把五个关键价值讲透",
      description:
        "这版不再把 PaintersGO 讲成模糊的“沉浸式技术展示”。它应该是一款真正帮助用户跨过门槛、完成创作并走向实物输出的产品。",
      items: [
        {
          id: "01",
          title: "AI 生成 3D 模型",
          description:
            "从文字或图像出发，快速生成可继续编辑的 3D 模型，把创意变成三维资产的起点成本降下来。",
          mediaLabel: "预留素材位：文生 3D / 图生 3D 的界面截图、录屏或对比图"
        },
        {
          id: "02",
          title: "3D 上色编辑",
          description:
            "在移动端完成模型查看、涂装、材质切换与细节表达，突出 PaintersGO 的即时性和触屏创作体验。",
          mediaLabel: "预留素材位：编辑器界面、笔刷、材质与操作演示"
        },
        {
          id: "03",
          title: "多人协作",
          description:
            "支持邀请朋友、团队成员或社区创作者一起处理同一个模型，让创作从单人流程扩展为共创流程。",
          mediaLabel: "预留素材位：协作房间、实时同步、加入房间流程"
        },
        {
          id: "04",
          title: "云修复",
          description:
            "将复杂模型交给云端流程做打印前处理与结构修复，减少模型在走向制造时的阻力和失败概率。",
          mediaLabel: "预留素材位：修复前后对比、打印准备状态说明"
        },
        {
          id: "05",
          title: "O2O 制造 / 打印",
          description:
            "把数字模型继续延伸到线下制造和打印场景，让 PaintersGO 成为连接创作与实体交付的入口。",
          mediaLabel: "预留素材位：打印服务、制造链路、成品交付照片"
        }
      ]
    },
    workflow: {
      kicker: "创作链路",
      title: "从灵感到实物，不再是割裂的几段流程",
      description:
        "PaintersGO 最重要的产品价值，不只是某一个 AI 功能，而是把原本分散的工具和步骤串成一条更容易理解、更容易开始的路径。",
      steps: [
        {
          title: "生成",
          body: "输入提示词、导入图片，或打开已有模型，快速得到可以继续处理的 3D 起点。"
        },
        {
          title: "编辑",
          body: "在手机端直接完成查看、上色、材质预览和局部细节调整。"
        },
        {
          title: "协作",
          body: "把同一个模型交给更多人共同完善，让创意、结构和风格一起推进。"
        },
        {
          title: "修复与制造",
          body: "经过云修复流程后，进一步对接打印或制造服务，向实体成品迈进。"
        }
      ]
    },
    audience: {
      kicker: "适用人群",
      title: "不只面向专业 3D 从业者",
      description:
        "PaintersGO 的官网应该让不同类型的访问者都能找到自己的位置，而不是默认每个人都已经熟悉复杂 3D 工具链。",
      personas: [
        {
          title: "AI 创作者",
          body: "更快把想法转成三维内容，用更低的启动成本尝试创作。"
        },
        {
          title: "3D 打印玩家",
          body: "把数字模型继续推进到可修复、可打印、可落地的实物流程。"
        },
        {
          title: "设计师与内容创作者",
          body: "在移动端更直接地展示、上色和表达模型视觉效果。"
        },
        {
          title: "团队与社区合作者",
          body: "围绕同一个模型协同创作，让灵感、反馈和结果同步推进。"
        }
      ]
    },
    proof: {
      kicker: "为什么是它",
      title: "PaintersGO 应该被看见的产品差异",
      description:
        "真实素材还没补齐之前，官网也需要先把差异讲出来。这里用的是可替换的内容框架，后续可以逐条替换成更具体的证据。",
      cards: [
        {
          title: "不是单点功能，而是完整路径",
          body: "从生成、编辑到制造的表达更完整，更适合官网作为产品主叙事。"
        },
        {
          title: "不是桌面优先，而是移动端优先",
          body: "PaintersGO 的重要特点在于让 3D 创作和处理更接近手机场景。"
        },
        {
          title: "不是孤立创作，而是支持协作",
          body: "多人协作会成为产品很强的区分点，也更适合展示未来潜力。"
        }
      ]
    },
    media: {
      kicker: "展示区域",
      title: "先留出对的网站位，再逐步补上真实素材",
      description:
        "现在我们优先做对信息架构和页面质感。后续你只需要把内容替换进这些区域，就能很快接近正式官网。",
      slots: [
        {
          title: "产品主视觉位",
          body: "适合放 logo 海报、应用合成图、3D 模型主渲染图或品牌 KV。"
        },
        {
          title: "功能演示位",
          body: "适合放录屏、GIF 或连续截图，突出“生成 - 编辑 - 协作”的动态过程。"
        },
        {
          title: "成果展示位",
          body: "适合放打印成品、前后对比、用户案例或真实使用场景。"
        }
      ]
    },
    faq: {
      kicker: "常见问题",
      title: "先回答访问者最容易关心的几个点",
      items: [
        {
          q: "PaintersGO 是做什么的？",
          a: "它是一款把 AI 3D 生成、移动端上色编辑、多人协作、云修复和实体制造链路连接起来的产品。"
        },
        {
          q: "它更像创作工具还是制造入口？",
          a: "两者都有，但官网表达重点应该先强调它如何降低 3D 创作门槛，再引出制造能力。"
        },
        {
          q: "这版页面为什么先用占位素材？",
          a: "因为当前最紧急的是先把结构和方向做对，之后再替换真实截图和案例会更高效。"
        }
      ]
    },
    contact: {
      title: "先让官网具备展示能力，再逐步补齐真实转化入口",
      body:
        "下一步你可以继续给我 logo、截图、动图、下载链接、联系渠道和实际案例。我会在这套结构上继续做成更接近正式上线版本。",
      primary: "继续完善官网",
      secondary: "准备下一批素材",
      cards: [
        { label: "当前优先", value: "官网重做 / 结构重排 / 双语首页" },
        { label: "后续补充", value: "Logo / 截图 / Demo / 下载链接 / 联系方式" },
        { label: "落地形态", value: "React 官网，后续可接真实素材与部署流程" }
      ]
    },
    footer: {
      product: "PaintersGO",
      rights: "中英双语官网首版草案，后续可继续替换真实素材与转化信息。"
    }
  },
  en: {
    nav: {
      features: "Features",
      workflow: "Workflow",
      audience: "Audience",
      faq: "FAQ",
      contact: "Contact"
    },
    hero: {
      badge: "PaintersGO Official Website Draft",
      title: "Lower the barrier to 3D creation, from virtual assets to physical making",
      subtitle:
        "PaintersGO combines AI 3D generation, mobile-first painting and editing, multiplayer collaboration, cloud repair, and O2O manufacturing into one connected creative pipeline.",
      primaryCta: "Download for Android",
      secondaryCta: "Explore Product Flow",
      stats: [
        { value: "AI", label: "Generate workable 3D starting points from prompts or images" },
        { value: "Edit", label: "Inspect, paint, and adjust models directly on mobile" },
        { value: "Make", label: "Continue into repair, printing, and physical delivery" }
      ],
      note:
        "This version focuses on the official website structure first. Real screenshots, recordings, branding assets, and case studies can be dropped into the existing slots later."
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
      title: "Lead with the five product values that matter most",
      description:
        "This homepage should not frame PaintersGO as vague immersive tech. It should position it as a product that helps more people start creating 3D content, refine it, and move it toward physical output.",
      items: [
        {
          id: "01",
          title: "AI 3D Generation",
          description:
            "Start from text or images and generate editable 3D content faster, reducing the startup cost from idea to usable asset.",
          mediaLabel: "Reserved slot: text-to-3D / image-to-3D screenshots, recordings, or comparison visuals"
        },
        {
          id: "02",
          title: "3D Painting & Editing",
          description:
            "Paint, inspect, and tune models directly on mobile, showing the immediacy of touch-based 3D creation.",
          mediaLabel: "Reserved slot: editor UI, brush controls, materials, and interaction demos"
        },
        {
          id: "03",
          title: "Multiplayer Collaboration",
          description:
            "Invite teammates, friends, or creators into the same model workflow and turn solo creation into co-creation.",
          mediaLabel: "Reserved slot: collaboration rooms, sync states, join flow, shared editing"
        },
        {
          id: "04",
          title: "Cloud Repair",
          description:
            "Push complex models through a cloud repair step before fabrication and reduce friction on the road to printing.",
          mediaLabel: "Reserved slot: before/after repair comparison and print-ready cues"
        },
        {
          id: "05",
          title: "O2O Manufacturing / Printing",
          description:
            "Extend digital assets into offline production and turn PaintersGO into an entry point for real-world making.",
          mediaLabel: "Reserved slot: printing service flow, manufacturing scenes, final outputs"
        }
      ]
    },
    workflow: {
      kicker: "Workflow",
      title: "From idea to object, without breaking the story into disconnected tools",
      description:
        "The strongest product narrative is not a single AI feature. It is the fact that PaintersGO connects scattered steps into one easier path to start and finish.",
      steps: [
        {
          title: "Generate",
          body: "Use prompts, images, or existing models to create a fast and editable 3D starting point."
        },
        {
          title: "Edit",
          body: "Inspect, paint, preview materials, and refine details directly on mobile."
        },
        {
          title: "Collaborate",
          body: "Bring more people into the same model so ideas, structure, and style can evolve together."
        },
        {
          title: "Repair & Make",
          body: "Prepare the asset through cloud repair, then connect it to printing or manufacturing services."
        }
      ]
    },
    audience: {
      kicker: "Audience",
      title: "Not only for traditional 3D professionals",
      description:
        "The website should help multiple visitor types recognize themselves in the product, instead of assuming everyone already speaks the language of complex 3D pipelines.",
      personas: [
        {
          title: "AI Creators",
          body: "Turn ideas into 3D content faster and explore making with less startup friction."
        },
        {
          title: "3D Printing Hobbyists",
          body: "Push digital models toward repair, print readiness, and real-world output."
        },
        {
          title: "Designers & Content Creators",
          body: "Show, paint, and present model visuals more directly in a mobile workflow."
        },
        {
          title: "Teams & Communities",
          body: "Collaborate around the same model and move ideas forward together."
        }
      ]
    },
    proof: {
      kicker: "Why It Matters",
      title: "The product differences the homepage should make visible",
      description:
        "Even before real assets are added, the website should already communicate why PaintersGO is different. These placeholders can later become stronger proof blocks.",
      cards: [
        {
          title: "Not a single feature, but a full path",
          body: "The narrative connects generation, editing, and making instead of isolating one capability."
        },
        {
          title: "Not desktop-first, but mobile-first",
          body: "PaintersGO stands out by making parts of 3D creation feel more native to the phone."
        },
        {
          title: "Not just solo work, but collaboration",
          body: "Multiplayer collaboration is both a product differentiator and a strong future-facing story."
        }
      ]
    },
    media: {
      kicker: "Media Slots",
      title: "Build the right website zones first, then swap in real assets",
      description:
        "For now, we prioritize information architecture and visual quality. Later, your real product media can be dropped into these sections without rewriting the layout.",
      slots: [
        {
          title: "Hero Visual Slot",
          body: "Best for logo key visuals, app compositions, flagship model renders, or campaign art."
        },
        {
          title: "Feature Demo Slot",
          body: "Best for recordings, GIFs, and screenshots that show generation, editing, and collaboration in motion."
        },
        {
          title: "Results Slot",
          body: "Best for printed outputs, before/after comparisons, use cases, or real-world photos."
        }
      ]
    },
    faq: {
      kicker: "FAQ",
      title: "Answer the first questions visitors are likely to ask",
      items: [
        {
          q: "What is PaintersGO?",
          a: "It is a product that connects AI 3D generation, mobile painting and editing, collaboration, cloud repair, and physical production flow."
        },
        {
          q: "Is it mainly a creation tool or a manufacturing gateway?",
          a: "Both matter, but the homepage should first explain how PaintersGO lowers the barrier to 3D creation before expanding into making."
        },
        {
          q: "Why are some sections still placeholders?",
          a: "Because the urgent step is getting the structure and direction right first. Real screenshots and case studies can be added on top of a stable layout."
        }
      ]
    },
    contact: {
      title: "Make the website presentation-ready first, then layer in real conversion paths",
      body:
        "Next, you can give me the logo, screenshots, video clips, download links, contact channels, and real proof points. I can keep refining this structure toward a production homepage.",
      primary: "Keep Building the Website",
      secondary: "Prepare the Next Asset Batch",
      cards: [
        { label: "Current Focus", value: "Website rebuild / structure reset / bilingual homepage" },
        { label: "Next Assets", value: "Logo / Screenshots / Demo clips / Download links / Contact paths" },
        { label: "Implementation", value: "React website, ready for later deployment and content replacement" }
      ]
    },
    footer: {
      product: "PaintersGO",
      rights: "First bilingual website draft, ready for later real assets and conversion details."
    }
  }
};

const App = () => {
  const [locale, setLocale] = useState<Locale>("zh");
  const t = copy[locale];

  const stageLabels = useMemo(
    () =>
      locale === "zh"
        ? { left: "AI 生成", top: "多人协作", bottom: "制造 / 打印" }
        : { left: "AI Generation", top: "Co-create", bottom: "Make / Print" },
    [locale]
  );

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">
            <img src="/logo.png" alt="PaintersGO logo" />
          </span>
          <span className="brand-text">PaintersGO</span>
        </a>

        <nav className="nav">
          <a href="#features">{t.nav.features}</a>
          <a href="#workflow">{t.nav.workflow}</a>
          <a href="#audience">{t.nav.audience}</a>
          <a href="#faq">{t.nav.faq}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>

        <button
          className="locale-toggle"
          type="button"
          onClick={() => setLocale((current) => (current === "zh" ? "en" : "zh"))}
          aria-label="Toggle language"
        >
          {locale === "zh" ? "EN" : "中文"}
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">{t.hero.badge}</span>
            <h1>{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="/PaintersGO.apk">
                {t.hero.primaryCta}
              </a>
              <a className="button button-secondary" href="#features">
                {t.hero.secondaryCta}
              </a>
            </div>

            <div className="hero-stats">
              {t.hero.stats.map((item) => (
                <article key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>

            <p className="hero-note">{t.hero.note}</p>
          </div>

          <div className="hero-stage" aria-label="PaintersGO website hero concept">
            <div className="stage-glow stage-glow-a" />
            <div className="stage-glow stage-glow-b" />

            <div className="stage-panel primary-panel">
              <span className="panel-label">{stageLabels.left}</span>
              <div className="panel-screen">
                <div className="screen-chip">Text / Image</div>
                <div className="screen-model" />
                <div className="screen-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className="stage-panel side-panel top">
              <span className="panel-label">{stageLabels.top}</span>
              <div className="mini-grid">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="stage-panel side-panel bottom">
              <span className="panel-label">{stageLabels.bottom}</span>
              <div className="timeline">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>

        <section className="capability-strip">
          {t.introStrip.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </section>

        <section className="section" id="features">
          <div className="section-head">
            <span className="eyebrow">{t.features.kicker}</span>
            <h2>{t.features.title}</h2>
            <p>{t.features.description}</p>
          </div>

          <div className="feature-grid">
            {t.features.items.map((item) => (
              <article key={item.id} className="feature-card">
                <div className="feature-meta">
                  <span className="feature-tag">{item.id}</span>
                  <span className="feature-label">{item.title}</span>
                </div>
                <p>{item.description}</p>
                <div className="media-slot">{item.mediaLabel}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="section-head">
            <span className="eyebrow">{t.workflow.kicker}</span>
            <h2>{t.workflow.title}</h2>
            <p>{t.workflow.description}</p>
          </div>

          <div className="workflow-grid">
            {t.workflow.steps.map((step, index) => (
              <article key={step.title} className="workflow-card">
                <span className="step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section audience-section" id="audience">
          <div className="section-head">
            <span className="eyebrow">{t.audience.kicker}</span>
            <h2>{t.audience.title}</h2>
            <p>{t.audience.description}</p>
          </div>

          <div className="audience-grid">
            {t.audience.personas.map((item) => (
              <article key={item.title} className="audience-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section proof-section">
          <div className="section-head">
            <span className="eyebrow">{t.proof.kicker}</span>
            <h2>{t.proof.title}</h2>
            <p>{t.proof.description}</p>
          </div>

          <div className="proof-grid">
            {t.proof.cards.map((card) => (
              <article key={card.title} className="proof-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section showcase-section">
          <div className="section-head">
            <span className="eyebrow">{t.media.kicker}</span>
            <h2>{t.media.title}</h2>
            <p>{t.media.description}</p>
          </div>

          <div className="showcase-grid">
            {t.media.slots.map((slot) => (
              <article key={slot.title} className="showcase-card">
                <div className="showcase-placeholder" />
                <h3>{slot.title}</h3>
                <p>{slot.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-head">
            <span className="eyebrow">{t.faq.kicker}</span>
            <h2>{t.faq.title}</h2>
          </div>

          <div className="faq-list">
            {t.faq.items.map((item) => (
              <article key={item.q} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div className="cta-card">
            <span className="eyebrow">Next Step</span>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.body}</p>

            <div className="contact-grid">
              {t.contact.cards.map((card) => (
                <article key={card.label} className="contact-chip">
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </article>
              ))}
            </div>

            <div className="hero-actions">
              <a className="button button-primary" href="/PaintersGO.apk">
                {t.contact.primary}
              </a>
              <a className="button button-secondary" href="#features">
                {t.contact.secondary}
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
