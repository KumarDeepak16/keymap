"use client";

import { useEffect, useState } from "react";
import { cn, slugifyHeading } from "@/lib/utils";

/**
 * Sticky section index for a lesson. Highlights the section currently in view.
 * Hidden below lg — the lesson reads top-to-bottom on mobile.
 */
export function LessonToc({ headings }: { headings: string[] }) {
  const ids = headings.map(slugifyHeading);
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading currently intersecting the upper part of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {headings.map((h, i) => (
          <li key={ids[i]}>
            <a
              href={`#${ids[i]}`}
              className={cn(
                "-ml-px block border-l py-1.5 pl-3 leading-snug transition-colors",
                active === ids[i]
                  ? "border-ink font-medium text-ink"
                  : "border-transparent text-ink-tertiary hover:border-border-strong hover:text-ink-secondary",
              )}
            >
              {h}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
