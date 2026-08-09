import type { ModuleId } from "@/lib/types";

/**
 * Scrolls a module section into view. Honors reduced-motion via CSS
 * (scroll-behavior is overridden to auto under the media query).
 */
export function scrollToModule(id: ModuleId) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(`module-${id}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Move focus to the section heading for keyboard/SR users.
  const heading = el.querySelector<HTMLElement>("[data-module-heading]");
  heading?.focus({ preventScroll: true });
}
