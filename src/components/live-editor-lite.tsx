"use client";

import { ExternalLink, LoaderCircle, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type PreviewMode = "clay" | "wireframe" | "studio";
type MaterialMode = "plaster" | "clay" | "plastic" | "ceramic" | "metal";

const quickPresets = [
  {
    label: "Studio Review",
    description: "适合先看整体体块和完成度",
    mode: "studio" as PreviewMode,
    material: "ceramic" as MaterialMode,
    accent: "#f59e0b",
  },
  {
    label: "Sculpt Check",
    description: "更适合观察雕塑轮廓和光影起伏",
    mode: "clay" as PreviewMode,
    material: "clay" as MaterialMode,
    accent: "#ef4444",
  },
  {
    label: "Topology Peek",
    description: "快速确认线框和结构分布",
    mode: "wireframe" as PreviewMode,
    material: "metal" as MaterialMode,
    accent: "#14b8a6",
  },
] as const;

const modeLabels: Record<PreviewMode, string> = {
  clay: "Clay",
  wireframe: "Wireframe",
  studio: "Studio",
};

export function LiveEditorLite() {
  const [mode, setMode] = useState<PreviewMode>("studio");
  const [accent, setAccent] = useState("#f59e0b");
  const [material, setMaterial] = useState<MaterialMode>("plaster");
  const [isFrameLoading, setIsFrameLoading] = useState(true);

  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams({
      mode,
      accent,
      material,
      model: "/models/ToTu.glb",
    });

    return `/paintersgo-lite/index.html?${params.toString()}`;
  }, [accent, material, mode]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-5 py-4">
        <div>
          <p className="text-sm font-medium text-zinc-900">Live Editor Lite</p>
          <p className="text-xs text-zinc-500">真实模型网页试看器</p>
        </div>

        <div className="flex items-center gap-2">
          {(["clay", "wireframe", "studio"] as PreviewMode[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setIsFrameLoading(true);
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
        <div className="relative h-[27rem] bg-[radial-gradient(circle_at_top,#fff3d6_0%,#f4ecdf_36%,#ddd0bd_100%)]">
          {isFrameLoading ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(180deg,rgba(255,248,236,0.88),rgba(244,236,223,0.76))] backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-amber-700 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <LoaderCircle className="h-5 w-5 animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-900">Updating Lite Viewer</p>
                <p className="mt-1 text-xs text-zinc-600">正在刷新材质和预览模式</p>
              </div>
            </div>
          ) : null}

          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="PaintersGO Lite Viewer"
            className="h-full w-full border-0"
            onLoad={() => setIsFrameLoading(false)}
          />
        </div>

        <div className="space-y-6 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Preview Controls</p>
            <h3 className="mt-2 text-2xl font-semibold">像进入 App 之前的一次快速试用</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              这里已经接入真实的 `ToTu.glb`。用户不需要下载 App，也能先在浏览器里旋转模型、切换材质和观察整体形体。
            </p>
          </div>

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
                    setIsFrameLoading(true);
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
                        Active
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-800">Accent Color</p>
            <div className="mt-3 flex gap-2">
              {["#f59e0b", "#14b8a6", "#8b5cf6", "#ef4444"].map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => {
                    setIsFrameLoading(true);
                    setAccent(swatch);
                  }}
                  aria-pressed={accent === swatch}
                  className={`h-8 w-8 rounded-full border transition ${
                    accent === swatch
                      ? "scale-110 border-zinc-950 shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
                      : "border-black/10 hover:scale-105"
                  }`}
                  style={{ backgroundColor: swatch }}
                  aria-label={`Set color ${swatch}`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-800">Material Preset</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["plaster", "clay", "plastic", "ceramic", "metal"] as MaterialMode[]).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setIsFrameLoading(true);
                      setMaterial(item);
                    }}
                    aria-pressed={material === item}
                    className={`inline-flex min-h-10 items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      material === item
                        ? "bg-zinc-950 text-white shadow-[0_10px_24px_rgba(24,24,27,0.16)]"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              当前组合：{modeLabels[mode]} / {material} / {accent.toUpperCase()}
            </div>
            <a
              href={iframeSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-2xl bg-zinc-950 px-4 py-4 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              单独打开 Lite Viewer
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              现在左侧已经是独立网页版 Lite Viewer，不再只是 React 里的演示 Canvas。
            </div>
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              这次已经直接加载 `ToTu.glb`。后续如果还有其他 PaintersGO 导出模型，只需要替换 iframe 参数里的模型路径。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
