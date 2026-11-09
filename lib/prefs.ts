"use client";

import { useSyncExternalStore } from "react";

export type Unit = "c" | "f";
type Prefs = { unit: Unit; favorites: string[] };

const KEY = "weather-prefs";
const DEFAULT: Prefs = { unit: "c", favorites: [] };
const listeners = new Set<() => void>();

let cache: Prefs = DEFAULT;
let loaded = false;

function read(): Prefs {
  if (!loaded) {
    loaded = true;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) cache = { ...DEFAULT, ...JSON.parse(raw) };
    } catch {}
  }
  return cache;
}

function write(next: Prefs) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePrefs() {
  const prefs = useSyncExternalStore(subscribe, read, () => DEFAULT);

  return {
    unit: prefs.unit,
    favorites: prefs.favorites,
    setUnit: (unit: Unit) => write({ ...read(), unit }),
    toggleFavorite: (slug: string) => {
      const current = read();
      const favorites = current.favorites.includes(slug)
        ? current.favorites.filter((s) => s !== slug)
        : [...current.favorites, slug];
      write({ ...current, favorites });
    },
    clearFavorites: () => write({ ...read(), favorites: [] }),
    reset: () => write(DEFAULT),
  };
}

export function formatTemp(tempC: number, unit: Unit): string {
  const value = unit === "c" ? tempC : Math.round((tempC * 9) / 5 + 32);
  return `${value}°${unit.toUpperCase()}`;
}
