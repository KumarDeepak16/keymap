import type { AccentKey, Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

const DIFF_ACCENT: Record<Difficulty, AccentKey> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

export function Chip({
  children,
  accent = "neutral",
  className,
}: {
  children: React.ReactNode;
  accent?: AccentKey;
  className?: string;
}) {
  return (
    <span
      data-accent={accent}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider",
        "bg-[var(--a-bg)] text-[var(--a-ink)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <Chip accent={DIFF_ACCENT[level]}>{level}</Chip>;
}
