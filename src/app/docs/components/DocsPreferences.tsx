"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { docEntries } from "@/lib/docs/catalog";

const STORAGE_KEY = "interaction-guidebook:favorites";
const validPaths = new Set(docEntries.map((item) => item.path));
function readFavorites() {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value)
      ? value.filter((path): path is string => typeof path === "string" && validPaths.has(path))
      : [];
  } catch {
    return [];
  }
}
const Context = createContext<{ favorites: string[]; toggleFavorite: (path: string) => void }>({
  favorites: [],
  toggleFavorite: () => {},
});

export function DocsPreferences({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const toggleFavorite = useCallback((path: string) => {
    setFavorites((current) => {
      const next = current.includes(path) ? current.filter((item) => item !== path) : [...current, path];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* Session state remains usable without storage. */
      }
      return next;
    });
  }, []);
  return <Context.Provider value={{ favorites, toggleFavorite }}>{children}</Context.Provider>;
}
export const useDocsPreferences = () => useContext(Context);
