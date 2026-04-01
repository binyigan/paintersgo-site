"use client";

import { useState } from "react";

import { FeatureShowcase } from "@/components/feature-showcase";

export function FeatureShowcaseShell() {
  const [activeCollab, setActiveCollab] = useState("create");
  const [activeO2O, setActiveO2O] = useState("map");

  return (
    <FeatureShowcase
      activeCollab={activeCollab}
      activeO2O={activeO2O}
      onCollabChange={setActiveCollab}
      onO2OChange={setActiveO2O}
    />
  );
}
