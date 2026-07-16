"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { OSToggle } from "@/components/os-toggle";
import { cn } from "@/lib/utils";

const SECTIONS: Array<{ label: string; links: Array<{ href: string; label: string }> }> = [
  {
    label: "Shortcuts",
    links: [
      { href: "/apps", label: "All apps" },
      { href: "/categories", label: "Categories" },
      { href: "/favorites", label: "Favorites" },
      { href: "/my-keys", label: "My Keys" },
    ],
  },
  {
    label: "Learn",
    links: [
      { href: "/learn", label: "Prompt engineering course" },
      { href: "/learn/prompts", label: "Prompt library" },
      { href: "/google-search-tips", label: "Google search tips" },
    ],
  },
];

/** Hamburger + slide-down panel. Replaces the desktop nav below md. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation — the panel would otherwise stay open over the new page.
  // Keyed off the pathname we opened at, so this is a render-time reset rather
  // than a setState-in-effect cascade.
  const [openedAt, setOpenedAt] = useState(pathname);
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink"
      >
        {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-ink/20 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            aria-label="Main"
            className="fixed inset-x-0 top-16 z-40 animate-[sheet-fade_180ms_ease] border-b border-border bg-bg-elevated shadow-[var(--shadow-float)]"
          >
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-4 py-3">
              {SECTIONS.map((section) => (
                <div key={section.label} className="mb-2 last:mb-0">
                  <p className="mb-1 mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-tertiary">
                    {section.label}
                  </p>
                  <ul>
                    {section.links.map((l) => {
                      // `/learn` must not light up while on `/learn/prompts`.
                      const active =
                        pathname === l.href ||
                        (l.href !== "/" &&
                          pathname.startsWith(`${l.href}/`) &&
                          !SECTIONS.some((s) =>
                            s.links.some(
                              (x) => x.href !== l.href && x.href === pathname,
                            ),
                          ));
                      return (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center justify-between border-b border-border py-3 text-[0.95rem] transition-colors last:border-b-0",
                              active ? "font-medium text-ink" : "text-ink-secondary",
                            )}
                          >
                            {l.label}
                            {active && (
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-ink"
                                aria-hidden
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <span className="text-xs uppercase tracking-[0.14em] text-ink-tertiary">
                Platform
              </span>
              <OSToggle />
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
