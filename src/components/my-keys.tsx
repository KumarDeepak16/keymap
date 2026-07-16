"use client";

import { useMemo, useState } from "react";
import { Plus, Trash, PencilSimple, Keyboard, X, Check } from "@phosphor-icons/react";
import { useKeymap } from "@/lib/store";
import { Kbd } from "@/components/kbd";
import { KeyboardPeek } from "@/components/keyboard-peek";
import { CopyButton } from "@/components/shortcut-actions";
import { cn } from "@/lib/utils";

export function MyKeys() {
  const hydrated = useKeymap((s) => s.hydrated);
  const myKeys = useKeymap((s) => s.myKeys);
  const addMyKey = useKeymap((s) => s.addMyKey);
  const removeMyKey = useKeymap((s) => s.removeMyKey);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  // Group by the user's own labels, preserving insertion order.
  const groups = useMemo(() => {
    const g = new Map<string, typeof myKeys>();
    for (const k of myKeys) {
      const key = k.group.trim() || "Ungrouped";
      g.set(key, [...(g.get(key) ?? []), k]);
    }
    return [...g.entries()];
  }, [myKeys]);

  // Render nothing until the store rehydrates — otherwise the server's empty
  // list flashes before the user's saved keys appear.
  if (!hydrated) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-secondary">
          {myKeys.length === 0
            ? "Nothing saved yet."
            : `${myKeys.length} ${myKeys.length === 1 ? "shortcut" : "shortcuts"} across ${groups.length} ${groups.length === 1 ? "group" : "groups"}.`}
        </p>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] bg-ink px-3.5 py-2 text-sm font-medium text-bg transition-colors hover:bg-ink/90 active:scale-[0.98]"
          >
            <Plus size={14} weight="bold" />
            Add a shortcut
          </button>
        )}
      </div>

      {adding && (
        <div className="mb-6">
          <KeyForm
            onCancel={() => setAdding(false)}
            onSave={(v) => {
              addMyKey(v);
              setAdding(false);
            }}
          />
        </div>
      )}

      {myKeys.length === 0 && !adding ? (
        <EmptyState onAdd={() => setAdding(true)} />
      ) : (
        <div className="space-y-8">
          {groups.map(([group, keys]) => (
            <section key={group}>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="font-serif text-lg text-ink">{group}</h2>
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-ink-tertiary">{keys.length}</span>
              </div>
              <div className="divide-y divide-border overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
                {keys.map((k) =>
                  editing === k.id ? (
                    <div key={k.id} className="p-4">
                      <KeyForm
                        initial={k}
                        onCancel={() => setEditing(null)}
                        onSave={(v) => {
                          useKeymap.getState().updateMyKey(k.id, v);
                          setEditing(null);
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      key={k.id}
                      data-peek-row
                      className="flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-surface-sunken/60 sm:flex-row sm:items-center sm:gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.94rem] leading-snug text-ink sm:truncate">
                          {k.action}
                        </p>
                        {k.note && (
                          <p className="mt-0.5 text-xs leading-snug text-ink-tertiary">
                            {k.note}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <KeyboardPeek combo={k.combo} action={k.action}>
                          <Kbd combo={k.combo} />
                        </KeyboardPeek>
                        <CopyButton text={k.combo} label={`Copy ${k.action}`} />
                        <button
                          onClick={() => setEditing(k.id)}
                          aria-label={`Edit ${k.action}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-transparent text-ink-tertiary transition-colors hover:border-border hover:bg-surface-sunken hover:text-ink"
                        >
                          <PencilSimple size={15} weight="bold" />
                        </button>
                        <button
                          onClick={() => removeMyKey(k.id)}
                          aria-label={`Delete ${k.action}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-transparent text-ink-tertiary transition-colors hover:border-border hover:bg-surface-sunken hover:text-[var(--red-ink)]"
                        >
                          <Trash size={15} weight="bold" />
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

const MODIFIERS = ["Ctrl", "Cmd", "Alt", "Shift"] as const;

// Every key we can render on a keycap, grouped for the dropdown.
const KEY_OPTIONS: Array<[string, string[]]> = [
  ["Letters", "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")],
  ["Numbers", "0123456789".split("")],
  ["Function", Array.from({ length: 12 }, (_, i) => `F${i + 1}`)],
  ["Navigation", ["Up", "Down", "Left", "Right", "Home", "End", "Tab", "Enter", "Esc", "Space", "Delete", "Backspace"]],
  ["Symbols", ["`", "-", "=", "[", "]", "\\", ";", "'", ",", ".", "/"]],
];

function KeyForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: { action: string; combo: string; group: string; note?: string };
  onSave: (v: { action: string; combo: string; group: string; note?: string }) => void;
  onCancel: () => void;
}) {
  const [action, setAction] = useState(initial?.action ?? "");
  const [group, setGroup] = useState(initial?.group ?? "");
  const [note, setNote] = useState(initial?.note ?? "");

  // Split an existing combo back into its parts so editing works.
  const parsed = (initial?.combo ?? "").split("+").map((s) => s.trim()).filter(Boolean);
  const [mods, setMods] = useState<string[]>(
    parsed.filter((p) => (MODIFIERS as readonly string[]).includes(p)),
  );
  const [key, setKey] = useState(
    parsed.find((p) => !(MODIFIERS as readonly string[]).includes(p)) ?? "",
  );

  // Modifiers first, in a conventional order, then the key.
  const combo = [...MODIFIERS.filter((m) => mods.includes(m)), key]
    .filter(Boolean)
    .join("+");

  const valid = action.trim() !== "" && key !== "";

  function toggleMod(m: string) {
    setMods((cur) => (cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSave({
          action: action.trim(),
          combo: combo.trim(),
          group: group.trim() || "Ungrouped",
          note: note.trim() || undefined,
        });
      }}
      className="rounded-[var(--radius)] border border-border-strong bg-surface p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="What it does" required>
          <input
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Toggle terminal"
            autoFocus
            className={inputCls}
          />
        </Field>

        {/*
          Picked, not captured. Listening for a real keypress means the browser
          acts on it first — Ctrl+T opens a tab before we ever see the event,
          and preventDefault cannot stop reserved chrome shortcuts.
        */}
        <Field label="Key" required>
          <select
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={cn(inputCls, "cursor-pointer")}
          >
            <option value="">Choose a key…</option>
            {KEY_OPTIONS.map(([label, keys]) => (
              <optgroup key={label} label={label}>
                {keys.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>

        <Field label="Group">
          <input
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="Figma, my terminal…"
            className={inputCls}
          />
        </Field>

        <Field label="Note">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-3">
        <span className="mb-1 block text-[0.7rem] font-medium uppercase tracking-wider text-ink-tertiary">
          Modifiers
        </span>
        <div className="flex flex-wrap gap-1.5">
          {MODIFIERS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggleMod(m)}
              aria-pressed={mods.includes(m)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors",
                mods.includes(m)
                  ? "border-ink bg-ink text-bg"
                  : "border-border bg-surface text-ink-secondary hover:border-border-strong hover:text-ink",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs text-ink-tertiary">
        Preview
        {combo ? (
          <Kbd combo={combo} />
        ) : (
          <span className="italic">pick a key</span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="submit"
          disabled={!valid}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-ink px-3.5 py-2 text-sm font-medium text-bg transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check size={14} weight="bold" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-3.5 py-2 text-sm text-ink-secondary transition-colors hover:border-border-strong hover:text-ink"
        >
          <X size={14} weight="bold" />
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "h-9 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-tertiary focus:border-border-strong";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.7rem] font-medium uppercase tracking-wider text-ink-tertiary">
        {label}
        {required && <span className="ml-0.5 text-[var(--red-ink)]">*</span>}
      </span>
      {children}
    </label>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-sunken/40 px-6 py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface">
        <Keyboard size={22} className="text-ink-tertiary" weight="bold" />
      </div>
      <p className="text-sm font-medium text-ink">Your own shortcuts, in one place.</p>
      <p className="mt-1 max-w-sm text-sm text-ink-secondary">
        The custom binding you always forget. The one from the app nobody documents.
        Add it once and it stays in this browser.
      </p>
      <button
        onClick={onAdd}
        className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-ink px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-ink/90"
      >
        <Plus size={14} weight="bold" />
        Add your first
      </button>
    </div>
  );
}
