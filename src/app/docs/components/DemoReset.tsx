"use client";

import { createContext, ReactNode, useContext, useState } from "react";
const Context = createContext(() => {});

/** Remount the route's client page so every local control returns to its declared default. */
export default function DemoReset({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);
  return (
    <Context.Provider value={() => setVersion((value) => value + 1)}>
      <div key={version}>{children}</div>
    </Context.Provider>
  );
}
export const useDemoReset = () => useContext(Context);
