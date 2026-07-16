import type { App } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BRAND_ICONS } from "@/data/brand-icons";

/** Perceived luminance of a #rrggbb hex (0–255). */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * App tile. Renders the real brand logo (bundled simple-icon) on a tinted
 * surface when available; otherwise a clean monogram tile in the brand color.
 * Near-black logos (Notion, Slack, Cursor…) flip to the ink color so they stay
 * visible in dark mode — the tile uses `currentColor` + the themed `--ink`.
 */
export function AppGlyph({
  app,
  size = 40,
  className,
}: {
  app: Pick<App, "monogram" | "color" | "name" | "slug">;
  size?: number;
  className?: string;
}) {
  const brand = BRAND_ICONS[app.slug];
  const radius = Math.max(6, size * 0.24);

  if (brand) {
    const isDarkLogo = luminance(brand.hex) < 45;
    // Dark logos: use themed ink so they invert with the theme. Others: brand hex.
    const fill = isDarkLogo ? "var(--ink)" : brand.hex;
    const tint = isDarkLogo
      ? "color-mix(in srgb, var(--ink) 8%, var(--surface))"
      : `color-mix(in srgb, ${brand.hex} 12%, var(--surface))`;

    return (
      <span
        className={cn("inline-flex shrink-0 items-center justify-center select-none", className)}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: tint,
          border: "1px solid color-mix(in srgb, var(--ink) 8%, transparent)",
        }}
        aria-hidden
      >
        <svg role="img" viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56} fill={fill}>
          <title>{brand.title}</title>
          <path d={brand.path} />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-mono font-semibold text-white select-none",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        borderRadius: radius,
        background: app.color,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 2px rgba(0,0,0,0.12)",
      }}
      aria-hidden
    >
      {app.monogram}
    </span>
  );
}
