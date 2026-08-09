"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Reads/writes a boolean flag in sessionStorage. Used to play the boot sequence
 * only once per browser session. SSR-safe: starts `null` until hydrated so the
 * UI can avoid flashing the wrong state.
 */
export function useSessionFlag(key: string): {
  ready: boolean;
  value: boolean;
  set: (v: boolean) => void;
} {
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(false);

  useEffect(() => {
    try {
      setValue(sessionStorage.getItem(key) === "1");
    } catch {
      // storage unavailable (private mode / SSR) — treat as not set
    }
    setReady(true);
  }, [key]);

  const set = useCallback(
    (v: boolean) => {
      setValue(v);
      try {
        sessionStorage.setItem(key, v ? "1" : "0");
      } catch {
        /* ignore */
      }
    },
    [key],
  );

  return { ready, value, set };
}
