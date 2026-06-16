"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  hint?: string;
}

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };
type SelectProps = BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: string[];
  };

export type HudInputProps = InputProps | TextareaProps | SelectProps;

const fieldCls =
  "clip-chip w-full bg-surface/80 border border-line px-3 py-2 font-mono text-sm text-text " +
  "placeholder:text-muted/60 outline-none transition-colors " +
  "focus:border-accent-active focus:ring-1 focus:ring-accent-active/60";

/** HUD form field — input / textarea / select with a mono uppercase label. */
export const HudInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  HudInputProps
>(function HudInput(props, ref) {
  const id = useId();
  const { label, hint } = props;

  let field: React.ReactNode;
  if (props.as === "textarea") {
    const { label: _l, hint: _h, as: _a, className, ...rest } = props;
    field = (
      <textarea
        id={id}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        {...rest}
        className={cn(fieldCls, "min-h-[120px] resize-y", className)}
      />
    );
  } else if (props.as === "select") {
    const { label: _l, hint: _h, as: _a, options, className, ...rest } = props;
    field = (
      <select
        id={id}
        ref={ref as React.Ref<HTMLSelectElement>}
        {...rest}
        className={cn(fieldCls, className)}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-surface text-text">
            {o}
          </option>
        ))}
      </select>
    );
  } else {
    const { label: _l, hint: _h, as: _a, className, ...rest } = props;
    field = (
      <input
        id={id}
        ref={ref as React.Ref<HTMLInputElement>}
        {...rest}
        className={cn(fieldCls, className)}
      />
    );
  }

  return (
    <label htmlFor={id} className="block">
      <span className="hud-label mb-1 flex items-center gap-2">
        <span className="h-2 w-1 bg-accent" />
        {label}
      </span>
      {field}
      {hint && (
        <span className="mt-1 block text-[0.65rem] text-muted">{hint}</span>
      )}
    </label>
  );
});
