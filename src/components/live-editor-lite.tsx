"use client";

import { useMemo, useState } from "react";

type PreviewMode = "clay" | "wireframe" | "studio";
type MaterialMode = "plaster" | "clay" | "plastic" | "ceramic" | "metal";

export function LiveEditorLite() {
  const [mode, setMode] = useState<PreviewMode>("studio");
  const [accent, setAccent] = useState("#f59e0b");
  const [material, setMaterial] = useState<MaterialMode>("plaster");

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
              onClick={() => setMode(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                mode === item
                  ? "bg-zinc-950 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative h-[27rem] bg-[radial-gradient(circle_at_top,#fff3d6_0%,#f4ecdf_36%,#ddd0bd_100%)]">
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="PaintersGO Lite Viewer"
            className="h-full w-full border-0"
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

          <div>
            <p className="text-sm font-medium text-zinc-800">Accent Color</p>
            <div className="mt-3 flex gap-2">
              {["#f59e0b", "#14b8a6", "#8b5cf6", "#ef4444"].map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => setAccent(swatch)}
                  className="h-8 w-8 rounded-full border border-black/10"
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
                    onClick={() => setMaterial(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      material === item
                        ? "bg-zinc-950 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
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
