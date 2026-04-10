"use client";

import Image from "next/image";
import { ExternalLink, LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/locale";

type PreviewMode = "clay" | "wireframe" | "studio";
type MaterialMode = "plaster" | "clay" | "plastic" | "ceramic" | "metal";
type Viewport = "unknown" | "mobile" | "desktop";

const modeLabelsByLocale: Record<Locale, Record<PreviewMode, string>> = {
  zh: {
    clay: "粘土",
    wireframe: "线框",
    studio: "工作室",
  },
  en: {
    clay: "Clay",
    wireframe: "Wireframe",
    studio: "Studio",
  },
};

const materialLabelsByLocale: Record<Locale, Record<MaterialMode, string>> = {
  zh: {
    plaster: "石膏",
    clay: "陶土",
    plastic: "塑料",
    ceramic: "陶瓷",
    metal: "金属",
  },
  en: {
    plaster: "Plaster",
    clay: "Clay",
    plastic: "Plastic",
    ceramic: "Ceramic",
    metal: "Metal",
  },
};

const quickPresetsByLocale = {
  zh: [
    {
      label: "工作室审视",
      description: "适合快速判断整体轮廓与材质完成度。",
      mode: "studio" as PreviewMode,
      material: "ceramic" as MaterialMode,
      accent: "#f59e0b",
    },
    {
      label: "雕塑检查",
      description: "更突出形体过渡和光影可读性。",
      mode: "clay" as PreviewMode,
      material: "clay" as MaterialMode,
      accent: "#ef4444",
    },
    {
      label: "拓扑预览",
      description: "用线框快速检查结构密度。",
      mode: "wireframe" as PreviewMode,
      material: "metal" as MaterialMode,
      accent: "#14b8a6",
    },
  ],
  en: [
    {
      label: "Studio Review",
      description: "Best for checking overall silhouette and finish quality.",
      mode: "studio" as PreviewMode,
      material: "ceramic" as MaterialMode,
      accent: "#f59e0b",
    },
    {
      label: "Sculpt Check",
      description: "Highlights shape transitions and light-shadow readability.",
      mode: "clay" as PreviewMode,
      material: "clay" as MaterialMode,
      accent: "#ef4444",
    },
    {
      label: "Topology Peek",
      description: "Quick wireframe inspection for structure density.",
      mode: "wireframe" as PreviewMode,
      material: "metal" as MaterialMode,
      accent: "#14b8a6",
    },
  ],
} as const;

const copyByLocale = {
  zh: {
    headerTitle: "Live Editor Lite",
    headerSubtitle: "浏览器中预览真实模型",
    loadingTitle: "正在更新 Lite Viewer",
    loadingBody: "加载你选择的模式和材质",
    exitInteraction: "退出交互",
    mobileSafeMode: "移动端安全模式",
    mobileSafeBody:
      "移动端默认关闭内嵌 3D，避免滚动卡顿。需要交互时可打开全屏 Lite Viewer。",
    enableEmbeddedZoom: "启用内嵌交互",
    openFullScreen: "全屏打开",
    previewControls: "预览控制",
    panelTitle: "先看模型效果，再决定是否进入 App",
    panelBody:
      "这个面板直接使用真实 ToTu.glb 参数。桌面端支持旋转、缩放、平移；移动端默认优先滚动流畅。",
    mobileTip:
      "移动端默认是顺滑滚动模式。只有在需要双指缩放和旋转时，再开启内嵌交互。",
    active: "已启用",
    accentColor: "强调色",
    materialPreset: "材质预设",
    openLiteViewer: "打开 Lite Viewer",
    desktopNote: "桌面端使用内嵌交互预览，便于快速对比不同预设。",
    mobileNote: "移动端可在顺滑模式与内嵌交互模式之间切换。",
    currentSetupPrefix: "当前配置",
    frameTitle: "PaintersGO Lite 预览器",
    mobilePreviewAlt: "Lite Viewer 移动端预览图",
    colorAriaPrefix: "设置颜色",
  },
  en: {
    headerTitle: "Live Editor Lite",
    headerSubtitle: "Real model preview in browser",
    loadingTitle: "Updating Lite Viewer",
    loadingBody: "Loading selected mode and material",
    exitInteraction: "Exit Interaction",
    mobileSafeMode: "Mobile Safe Mode",
    mobileSafeBody:
      "Embedded 3D is disabled on mobile to prevent scroll freezing. Open full-screen Lite Viewer for interaction.",
    enableEmbeddedZoom: "Enable Embedded Zoom",
    openFullScreen: "Open Full-Screen",
    previewControls: "Preview Controls",
    panelTitle: "Try model look before opening the app",
    panelBody:
      "This panel uses real ToTu.glb parameters. On desktop you can orbit, zoom, and pan in-place; on mobile we keep smooth scrolling by default.",
    mobileTip:
      "Mobile defaults to smooth-scroll mode. Enable embedded zoom only when you need two-finger interaction.",
    active: "Active",
    accentColor: "Accent Color",
    materialPreset: "Material Preset",
    openLiteViewer: "Open Lite Viewer",
    desktopNote: "Desktop mode uses embedded interactive viewer for quick preset comparison.",
    mobileNote: "Mobile can switch between smooth-scroll mode and embedded zoom mode.",
    currentSetupPrefix: "Current setup",
    frameTitle: "PaintersGO Lite Viewer",
    mobilePreviewAlt: "Lite Viewer mobile preview",
    colorAriaPrefix: "Set color",
  },
} as const;

const materialOptions: MaterialMode[] = ["plaster", "clay", "plastic", "ceramic", "metal"];

export function LiveEditorLite({ locale = "zh" }: { locale?: Locale }) {
  const [mode, setMode] = useState<PreviewMode>("studio");
  const [accent, setAccent] = useState("#f59e0b");
  const [material, setMaterial] = useState<MaterialMode>("plaster");
  const [isFrameLoading, setIsFrameLoading] = useState(true);
  const [viewport, setViewport] = useState<Viewport>("unknown");
  const [mobileInteractive, setMobileInteractive] = useState(false);

  const isMobile = viewport === "mobile";
  const canEmbedIframe = viewport === "desktop" || mobileInteractive;
  const modeLabels = modeLabelsByLocale[locale];
  const materialLabels = materialLabelsByLocale[locale];
  const quickPresets = quickPresetsByLocale[locale];
  const t = copyByLocale[locale];

  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams({
      mode,
      accent,
      material,
      lang: locale,
      model: "/models/ToTu.glb",
      autorotate: viewport === "desktop" ? "true" : "false",
    });

    return `/paintersgo-lite/index.html?${params.toString()}`;
  }, [accent, locale, material, mode, viewport]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      setViewport(mediaQuery.matches ? "mobile" : "desktop");
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  function requestFrameReload() {
    if (canEmbedIframe) {
      setIsFrameLoading(true);
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-4 py-4 md:px-5">
        <div>
          <p className="text-sm font-medium text-zinc-900">{t.headerTitle}</p>
          <p className="text-xs text-zinc-500">{t.headerSubtitle}</p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          {(["clay", "wireframe", "studio"] as PreviewMode[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                requestFrameReload();
                setMode(item);
              }}
              aria-pressed={mode === item}
              className={`inline-flex min-h-10 items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
                mode === item
                  ? "bg-zinc-950 text-white shadow-[0_10px_24px_rgba(24,24,27,0.16)]"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {modeLabels[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative h-[20rem] overflow-hidden bg-[radial-gradient(circle_at_top,#fff3d6_0%,#f4ecdf_36%,#ddd0bd_100%)] sm:h-[24rem] lg:h-[27rem]">
          {canEmbedIframe ? (
            <>
              {isFrameLoading ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(180deg,rgba(255,248,236,0.88),rgba(244,236,223,0.76))] backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-amber-700 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-900">{t.loadingTitle}</p>
                    <p className="mt-1 text-xs text-zinc-600">{t.loadingBody}</p>
                  </div>
                </div>
              ) : null}

              <iframe
                key={iframeSrc}
                src={iframeSrc}
                title={t.frameTitle}
                className="h-full w-full border-0"
                loading="lazy"
                onLoad={() => setIsFrameLoading(false)}
              />

              {isMobile ? (
                <button
                  type="button"
                  onClick={() => setMobileInteractive(false)}
                  className="absolute right-3 top-3 z-20 inline-flex min-h-9 items-center rounded-full border border-white/25 bg-black/50 px-3 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {t.exitInteraction}
                </button>
              ) : null}
            </>
          ) : (
            <div className="relative h-full w-full">
              <Image
                src="/app-assets/demo_preview.webp"
                alt={t.mobilePreviewAlt}
                fill
                className="object-cover opacity-85"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0.12)_0%,rgba(20,17,15,0.42)_54%,rgba(20,17,15,0.8)_100%)]" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/35 px-4 py-4 text-white backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">{t.mobileSafeMode}</p>
                <p className="mt-2 text-sm leading-6">{t.mobileSafeBody}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileInteractive(true);
                      setIsFrameLoading(true);
                    }}
                    className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-xs font-semibold text-zinc-900"
                  >
                    {t.enableEmbeddedZoom}
                  </button>
                  <a
                    href={iframeSrc}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 text-xs font-semibold text-white"
                  >
                    {t.openFullScreen}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 p-5 md:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">{t.previewControls}</p>
            <h3 className="mt-2 text-2xl font-semibold">{t.panelTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-700">{t.panelBody}</p>
          </div>

          {isMobile ? (
            <div className="rounded-2xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
              {t.mobileTip}
            </div>
          ) : null}

          <div className="grid gap-3">
            {quickPresets.map((preset) => {
              const isActive =
                preset.mode === mode &&
                preset.material === material &&
                preset.accent.toLowerCase() === accent.toLowerCase();

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    requestFrameReload();
                    setMode(preset.mode);
                    setMaterial(preset.material);
                    setAccent(preset.accent);
                  }}
                  className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                    isActive
                      ? "border-amber-300 bg-amber-50 shadow-[0_12px_30px_rgba(245,158,11,0.12)]"
                      : "border-black/8 bg-zinc-50 hover:border-black/12 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{preset.label}</p>
                      <p className="mt-1 text-xs leading-6 text-zinc-600">{preset.description}</p>
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-900">
                        <Sparkles className="h-3.5 w-3.5" />
                        {t.active}
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-800">{t.accentColor}</p>
            <div className="mt-3 flex gap-2">
              {["#f59e0b", "#14b8a6", "#8b5cf6", "#ef4444"].map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => {
                    requestFrameReload();
                    setAccent(swatch);
                  }}
                  aria-pressed={accent === swatch}
                  className={`h-8 w-8 rounded-full border transition ${
                    accent === swatch
                      ? "scale-110 border-zinc-950 shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
                      : "border-black/10 hover:scale-105"
                  }`}
                  style={{ backgroundColor: swatch }}
                  aria-label={`${t.colorAriaPrefix} ${swatch}`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-800">{t.materialPreset}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {materialOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    requestFrameReload();
                    setMaterial(item);
                  }}
                  aria-pressed={material === item}
                  className={`inline-flex min-h-10 items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    material === item
                      ? "bg-zinc-950 text-white shadow-[0_10px_24px_rgba(24,24,27,0.16)]"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {materialLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              {`${t.currentSetupPrefix}: ${modeLabels[mode]} / ${materialLabels[material]} / ${accent.toUpperCase()}`}
            </div>
            <a
              href={iframeSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-2xl bg-zinc-950 px-4 py-4 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              {t.openLiteViewer}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              {t.desktopNote}
            </div>
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              {t.mobileNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
