"use client";

import { useEffect, useRef, useState } from "react";

import { FeatureShowcase } from "@/components/feature-showcase";

const collabOrder = ["create", "join"] as const;
const o2oOrder = ["map", "logistics"] as const;

export function FeatureShowcaseShell() {
  const [activeCollab, setActiveCollab] = useState("create");
  const [activeO2O, setActiveO2O] = useState("map");
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) {
        return;
      }

      setActiveCollab((current) => {
        const index = collabOrder.indexOf(current as (typeof collabOrder)[number]);
        return collabOrder[(index + 1) % collabOrder.length];
      });

      setActiveO2O((current) => {
        const index = o2oOrder.indexOf(current as (typeof o2oOrder)[number]);
        return o2oOrder[(index + 1) % o2oOrder.length];
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  function pauseAutoplay() {
    pauseUntilRef.current = Date.now() + 12000;
  }

  return (
    <FeatureShowcase
      activeCollab={activeCollab}
      activeO2O={activeO2O}
      onCollabChange={(id) => {
        pauseAutoplay();
        setActiveCollab(id);
      }}
      onO2OChange={(id) => {
        pauseAutoplay();
        setActiveO2O(id);
      }}
    />
  );
}
