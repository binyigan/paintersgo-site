"use client";

import Image from "next/image";
import { ExternalLink, LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PreviewMode = "clay" | "wireframe" | "studio";
type MaterialMode = "plaster" | "clay" | "plastic" | "ceramic" | "metal";
type Viewport = "unknown" | "mobile" | "desktop";

const quickPresets = [
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
] as const;

const modeLabels: Record<PreviewMode, string> = {
  clay: "Clay",
  wireframe: "Wireframe",
  studio: "Studio",
};

const materialOptions: MaterialMode[] = ["plaster", "clay", "plastic", "ceramic", "metal"];

export function LiveEditorLite() {
  const [mode, setMode] = useState<PreviewMode>("studio");
  const [accent, setAccent] = useState("#f59e0b");
  const [material, setMaterial] = useState<MaterialMode>("plaster");
  const [isFrameLoading, setIsFrameLoading] = useState(true);
  const [viewport, setViewport] = useState<Viewport>("unknown");

  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams({
      mode,
      accent,
      material,
      model: "/models/ToTu.glb",
    });

    return `/paintersgo-lite/index.html?${params.toString()}`;
  }, [accent, material, mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      setViewport(mediaQuery.matches ? "mobile" : "desktop");
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const embedIframe = viewport === "desktop";

  function requestFrameReload() {
    if (embedIframe) {
      setIsFrameLoading(true);
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-4 py-4 md:px-5">
        <div>
          <p className="text-sm font-medium text-zinc-900">Live Editor Lite</p>
          <p className="text-xs text-zinc-500">Real model preview in browser</p>
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
          {embedIframe ? (
            <>
              {isFrameLoading ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(180deg,rgba(255,248,236,0.88),rgba(244,236,223,0.76))] backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-amber-700 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-900">Updating Lite Viewer</p>
                    <p className="mt-1 text-xs text-zinc-600">Loading selected mode and material</p>
                  </div>
                </div>
              ) : null}

              <iframe
                key={iframeSrc}
                src={iframeSrc}
                title="PaintersGO Lite Viewer"
                className="h-full w-full border-0"
                loading="lazy"
                onLoad={() => setIsFrameLoading(false)}
              />
            </>
          ) : (
            <div className="relative h-full w-full">
              <Image
                src="/app-assets/demo_preview.webp"
                alt="Lite Viewer mobile preview"
                fill
                className="object-cover opacity-85"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0.12)_0%,rgba(20,17,15,0.42)_54%,rgba(20,17,15,0.8)_100%)]" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/35 px-4 py-4 text-white backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">Mobile Safe Mode</p>
                <p className="mt-2 text-sm leading-6">
                  Embedded 3D is disabled on mobile to prevent scroll freezing. Open the full-screen
                  Lite Viewer if you want to interact with the model.
                </p>
                <a
                  href={iframeSrc}
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-zinc-900"
                >
                  Open Full-Screen Viewer
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 p-5 md:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Preview Controls</p>
            <h3 className="mt-2 text-2xl font-semibold">Try model look before opening the app</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              This panel uses the real <code>ToTu.glb</code> model parameters. On desktop you can
              rotate and inspect in-place; on mobile we keep the page smooth by default and provide a
              dedicated full-screen preview entry.
            </p>
          </div>

          {viewport !== "desktop" ? (
            <div className="rounded-2xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
              Mobile optimization is active: embedded interactive iframe is paused to avoid page
              freezing while scrolling.
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
                  aria-label={`Set color ${swatch}`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-800">Material Preset</p>
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
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              Current setup: {modeLabels[mode]} / {material} / {accent.toUpperCase()}
            </div>
            <a
              href={iframeSrc}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-2xl bg-zinc-950 px-4 py-4 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Open Lite Viewer
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              Desktop mode uses embedded interactive viewer for faster comparison between presets.
            </div>
            <div className="rounded-2xl bg-zinc-50 px-4 py-4 text-sm leading-7 text-zinc-700">
              Mobile mode prioritizes stable scrolling and avoids locking gestures inside an embedded
              3D frame.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
