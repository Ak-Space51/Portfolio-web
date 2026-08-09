"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { runCommand, type TerminalLine } from "@/components/terminal/commands";
import { scrollToModule } from "@/lib/utils/navigate";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

const PROMPT = "operator@tactical";

const BANNER: TerminalLine[] = [
  { kind: "accent", text: "TACTICAL/OS TERMINAL v2.4.1" },
  { kind: "system", text: "type 'help' for commands · 'clear' to reset" },
];

const KIND_CLASS: Record<TerminalLine["kind"], string> = {
  input: "text-text",
  output: "text-text/80",
  system: "text-dim",
  error: "text-accent",
  accent: "text-accent",
};

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);

  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to newest output.
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, open]);

  // Focus input on open.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Global hotkey: Ctrl/Cmd + ` toggles the terminal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const raw = input;
    if (!raw.trim()) return;

    const result = runCommand(raw);
    setHistory((h) => [raw, ...h].slice(0, 50));
    setHistIndex(-1);

    if (result.clear) {
      setLines(BANNER);
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "input", text: `${PROMPT}:~$ ${raw}` },
        ...result.lines,
      ]);
    }
    setInput("");

    if (result.nav) {
      const target = result.nav;
      // Let the user see the output line, then jump.
      setTimeout(() => scrollToModule(target), 220);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIndex((i) => {
        const next = Math.min(i + 1, history.length - 1);
        if (history[next] !== undefined) setInput(history[next]);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIndex((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : (history[next] ?? ""));
        return next;
      });
    }
  }

  return (
    <div className="fixed bottom-20 right-3 z-50 lg:bottom-4 lg:right-4">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel cut-sm flex h-[min(360px,60dvh)] w-[min(440px,calc(100vw-1.5rem))] flex-col"
            role="region"
            aria-label="Interactive terminal"
            style={{ "--fill": "rgba(10,12,17,0.97)" } as React.CSSProperties}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-edge px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="h-2 w-2 bg-accent" />
                  <span className="h-2 w-2 bg-edge-bright" />
                  <span className="h-2 w-2 bg-edge-bright" />
                </span>
                <span className="head text-[10px] tracking-[0.2em] text-text">
                  TERMINAL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLines(BANNER)}
                  className="mono text-[10px] text-dim transition-colors hover:text-accent"
                  aria-label="Clear terminal"
                >
                  CLR
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mono text-[11px] text-dim transition-colors hover:text-accent"
                  aria-label="Close terminal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* output */}
            <div
              ref={bodyRef}
              className="no-scrollbar flex-1 overflow-y-auto px-3 py-2"
              aria-live="polite"
            >
              {lines.map((line, i) => (
                <pre
                  key={i}
                  className={cn(
                    "mono whitespace-pre-wrap break-words text-[11.5px] leading-relaxed",
                    KIND_CLASS[line.kind],
                  )}
                >
                  {line.text}
                </pre>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={submit}
              className="flex items-center gap-2 border-t border-edge px-3 py-2"
            >
              <span className="mono shrink-0 text-[11.5px] text-accent">
                {PROMPT}:~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command input"
                className="mono w-full bg-transparent text-[11.5px] text-text caret-accent outline-none placeholder:text-dim/50"
                placeholder="enter command"
              />
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-label="Open terminal"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="clip-btn group flex items-center gap-2 bg-panel px-4 py-3 text-text ring-1 ring-edge transition-colors hover:ring-accent"
          >
            <span className="mono text-accent">{">"}_</span>
            <span className="head text-[10px] tracking-[0.2em]">TERMINAL</span>
            <span className="mono ml-1 hidden text-[9px] text-dim sm:inline">
              CTRL+`
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
