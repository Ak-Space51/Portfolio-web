"use client";

import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "ghost";

const BASE =
  "clip-btn group relative inline-flex items-center justify-center gap-2 head text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-2 px-5 py-3 shadow-[var(--shadow-accent)]",
  ghost:
    "bg-panel text-text ring-1 ring-edge hover:ring-accent hover:text-accent px-5 py-3",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Beveled tactical button. Renders <a> when `href` is provided, else <button>. */
export function HudButton(props: ButtonProps | AnchorProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(BASE, VARIANTS[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
