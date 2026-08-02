"use client";

/**
 * use-command-palette-store — tiny zustand store so any component can
 * open/close the globally-mounted CommandPalette without prop drilling
 * or window events.
 */

import { create } from "zustand";

interface CommandPaletteState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useCommandPaletteStore = create<CommandPaletteState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set((s) => ({ open: !s.open })),
}));
