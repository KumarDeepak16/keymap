import type { MetadataRoute } from "next";
import { APPS } from "@/data/apps";
import { CATEGORIES } from "@/data/categories";
import { LESSONS } from "@/data/lessons";

const SITE = "https://keymap.1619.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/apps",
    "/categories",
    "/favorites",
    "/my-keys",
    "/google-search-tips",
    "/learn",
    "/learn/prompts",
  ].map(
    (path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const appRoutes = APPS.map((a) => ({
    url: `${SITE}/app/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: a.status === "verified" ? 0.8 : 0.4,
  }));

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${SITE}/category/${c.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const lessonRoutes = LESSONS.map((l) => ({
    url: `${SITE}/learn/${l.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...appRoutes, ...categoryRoutes, ...lessonRoutes];
}
