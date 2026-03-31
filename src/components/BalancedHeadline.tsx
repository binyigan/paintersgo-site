import { useEffect, useRef, useState } from "react";
import { layoutWithLines, prepareWithSegments, setLocale, walkLineRanges } from "@chenglou/pretext";

type BalancedHeadlineProps = {
  text: string;
  locale?: string;
  className?: string;
  minWidthRatio?: number;
};

type BalancedState = {
  width: number;
  lines: string[];
};

const countLines = (
  prepared: ReturnType<typeof prepareWithSegments>,
  width: number
) => {
  let count = 0;
  walkLineRanges(prepared, width, () => {
    count += 1;
  });
  return count;
};

export function BalancedHeadline({
  text,
  locale,
  className,
  minWidthRatio = 0.58
}: BalancedHeadlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [balanced, setBalanced] = useState<BalancedState | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    let frame = 0;

    const update = async () => {
      const host = node.parentElement;
      if (!host) {
        return;
      }

      const computed = window.getComputedStyle(host);
      const maxWidth = host.clientWidth;
      const fontSize = Number.parseFloat(computed.fontSize);
      const lineHeightValue = Number.parseFloat(computed.lineHeight);
      const lineHeight = Number.isFinite(lineHeightValue) ? lineHeightValue : fontSize * 1.05;

      if (!maxWidth || !fontSize) {
        return;
      }

      if ("fonts" in document) {
        await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      }

      setLocale(locale);

      const font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
      const prepared = prepareWithSegments(text, font);
      const baseline = layoutWithLines(prepared, maxWidth, lineHeight);

      if (baseline.lineCount <= 1) {
        setBalanced({
          width: maxWidth,
          lines: [text]
        });
        return;
      }

      let low = Math.max(fontSize * 5, maxWidth * minWidthRatio);
      let high = maxWidth;
      let best = maxWidth;

      for (let i = 0; i < 14; i += 1) {
        const width = (low + high) / 2;
        const lineCount = countLines(prepared, width);

        if (lineCount <= baseline.lineCount) {
          best = width;
          high = width;
        } else {
          low = width;
        }
      }

      const result = layoutWithLines(prepared, best, lineHeight);
      setBalanced({
        width: Math.min(maxWidth, Math.ceil(best)),
        lines: result.lines.map((line) => line.text)
      });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        void update();
      });
    };

    schedule();

    const observer = new ResizeObserver(() => {
      schedule();
    });

    const host = node.parentElement;
    if (host) {
      observer.observe(host);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [locale, minWidthRatio, text]);

  return (
    <span
      ref={ref}
      className={className}
      style={balanced ? { maxWidth: `${balanced.width}px` } : undefined}
    >
      {balanced
        ? balanced.lines.map((line, index) => (
            <span key={`${line}-${index}`} className="balanced-line">
              {line}
            </span>
          ))
        : text}
    </span>
  );
}
