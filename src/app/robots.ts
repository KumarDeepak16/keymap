import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://keymap.1619.in/sitemap.xml",
    host: "https://keymap.1619.in",
  };
}
