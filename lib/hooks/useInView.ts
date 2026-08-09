"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";

/**
 * Thin wrapper around framer's useInView with tactical defaults: trigger once,
 * slightly before the element fully enters the viewport. Returns a ref to attach
 * and a boolean. Off-screen modules stay un-animated until needed (perf).
 */
export function useInView(margin: `${number}px` = "-80px") {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useFramerInView(ref, {
    once: true,
    margin: margin as never,
  });
  return { ref, inView };
}
