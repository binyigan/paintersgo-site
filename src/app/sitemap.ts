import type { MetadataRoute } from "next";

const siteUrl = "https://paintersgo.top";
const lastModified = new Date("2026-05-09T00:00:00.000Z");

const routes = [
  { path: "/", priority: 1 },
  { path: "/?lang=zh", priority: 1 },
  { path: "/author", priority: 0.8 },
  { path: "/author?lang=zh", priority: 0.8 },
  { path: "/project", priority: 0.8 },
  { path: "/project?lang=zh", priority: 0.8 },
  { path: "/privacy", priority: 0.5 },
  { path: "/privacy?lang=zh", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
