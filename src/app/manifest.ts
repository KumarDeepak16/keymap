import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KeyMap — Keyboard shortcut reference",
    short_name: "KeyMap",
    description:
      "Fast, verified keyboard shortcuts for the tools you use every day. Windows and macOS.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f6",
    theme_color: "#1a1a17",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
