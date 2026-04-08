import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * VitalCard — displays a single vital sign with label, value, unit, and optional alert state.
 */
const vitalCardVariants = cva(
  "rounded-lg border p-3 transition-colors",
  {
    variants: {
      state: {
        normal: "border-border bg-card",
        warning: "border-esi-3/40 bg-esi-3/5",
        critical: "border-esi-1/40 bg-esi-1/5",
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: {
      state: "normal",
      size: "md",
    },
  }
);

interface VitalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof vitalCardVariants> {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
}

export function VitalCard({
  icon,
  label,
  value,
  unit,
  state,
  size,
  className,
  ...props
}: VitalCardProps) {
  return (
    <div className={cn(vitalCardVariants({ state, size }), className)} {...props}>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "mt-1 font-mono font-bold tracking-tight",
          size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg",
          state === "critical" && "esi-1-text",
          state === "warning" && "esi-3-text"
        )}
      >
        {value}
        {unit && (
          <span className="ml-0.5 text-xs font-normal text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export { vitalCardVariants };
