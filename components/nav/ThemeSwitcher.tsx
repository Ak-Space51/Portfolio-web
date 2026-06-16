"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

/** HUD toggle between the dark (crimson) and light (blue) OS themes. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Theme: ${theme.toUpperCase()}`}
      className={cn(
        "clip-chip group flex items-center gap-2 border border-line bg-surface/70 px-2.5 py-1.5",
        "font-mono text-[0.6rem] uppercase tracking-widest text-muted transition-colors",
        "hover:border-accent-active hover:text-accent-active focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-active",
        className,
      )}
    >
      {isDark ? (
        <Moon className="h-3.5 w-3.5" strokeWidth={1.5} />
      ) : (
        <Sun className="h-3.5 w-3.5" strokeWidth={1.5} />
      )}
      <span className="hidden sm:inline">{isDark ? "DARK" : "LIGHT"}</span>
    </button>
  );
}
