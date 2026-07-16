"use client";

import { create } from "zustand";

/**
 * Split out from command-palette.tsx on purpose: the header needs `open()`,
 * but importing it from the palette module would pull the whole shortcut index
 * (~230KB) into every route's first load. This module stays tiny.
 */
interface PaletteState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const usePalette = create<PaletteState>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));
