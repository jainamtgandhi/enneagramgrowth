import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutVariant = "tip" | "practice" | "warning" | "insight";

interface CalloutBoxProps {
  variant?: CalloutVariant;
  children: ReactNode;
}

const variantStyles: Record<
  CalloutVariant,
  { border: string; bg: string; label: string; labelColor: string }
> = {
  tip: {
    border: "border-l-brand",
    bg: "bg-brand-soft",
    label: "Tip",
    labelColor: "text-brand",
  },
  practice: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    label: "Try This",
    labelColor: "text-emerald-700",
  },
  warning: {
    border: "border-l-amber-500",
    bg: "bg-amber-50",
    label: "Watch For",
    labelColor: "text-amber-700",
  },
  insight: {
    border: "border-l-purple-500",
    bg: "bg-purple-50",
    label: "Insight",
    labelColor: "text-purple-700",
  },
};

export function CalloutBox({ variant = "tip", children }: CalloutBoxProps) {
  const style = variantStyles[variant];

  return (
    <aside
      className={cn(
        "my-6 rounded-lg border-l-4 p-4 sm:p-5",
        style.border,
        style.bg
      )}
      role="note"
    >
      <p
        className={cn(
          "text-small font-bold uppercase tracking-wide mb-1.5",
          style.labelColor
        )}
      >
        {style.label}
      </p>
      <div className="text-body text-ink [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
