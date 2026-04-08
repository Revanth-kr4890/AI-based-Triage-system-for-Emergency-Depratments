import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * StatusIndicator — a pill/dot showing patient or system status with semantic color.
 */
const statusIndicatorVariants = cva(
  "inline-flex items-center gap-1.5 font-medium",
  {
    variants: {
      variant: {
        waiting: "text-esi-3",
        treating: "text-esi-4",
        critical: "text-esi-1",
        stable: "text-esi-5",
        discharged: "text-muted-foreground",
      },
      size: {
        sm: "text-[10px]",
        md: "text-xs",
        lg: "text-sm",
      },
      format: {
        dot: "",
        pill: "rounded-full px-2.5 py-0.5",
        badge: "rounded-md border px-2 py-0.5",
      },
    },
    compoundVariants: [
      { variant: "waiting", format: "pill", className: "bg-esi-3/15" },
      { variant: "treating", format: "pill", className: "bg-esi-4/15" },
      { variant: "critical", format: "pill", className: "bg-esi-1/15" },
      { variant: "stable", format: "pill", className: "bg-esi-5/15" },
      { variant: "discharged", format: "pill", className: "bg-muted" },
      { variant: "waiting", format: "badge", className: "bg-esi-3/10 border-esi-3/30" },
      { variant: "treating", format: "badge", className: "bg-esi-4/10 border-esi-4/30" },
      { variant: "critical", format: "badge", className: "bg-esi-1/10 border-esi-1/30" },
      { variant: "stable", format: "badge", className: "bg-esi-5/10 border-esi-5/30" },
      { variant: "discharged", format: "badge", className: "bg-muted/50 border-border" },
    ],
    defaultVariants: {
      variant: "stable",
      size: "md",
      format: "dot",
    },
  }
);

const STATUS_LABELS: Record<string, string> = {
  waiting: "Waiting",
  treating: "In Treatment",
  critical: "Critical",
  stable: "Stable",
  discharged: "Discharged",
};

const dotColorMap: Record<string, string> = {
  waiting: "bg-esi-3",
  treating: "bg-esi-4",
  critical: "bg-esi-1",
  stable: "bg-esi-5",
  discharged: "bg-muted-foreground",
};

interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {
  pulse?: boolean;
  label?: string;
}

export function StatusIndicator({
  variant = "stable",
  size,
  format,
  pulse,
  label,
  className,
  ...props
}: StatusIndicatorProps) {
  const shouldPulse = pulse ?? (variant === "critical" || variant === "treating");

  return (
    <span
      className={cn(statusIndicatorVariants({ variant, size, format }), className)}
      {...props}
    >
      <span
        className={cn(
          "inline-block rounded-full",
          size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-2.5 w-2.5" : "h-2 w-2",
          dotColorMap[variant ?? "stable"],
          shouldPulse && "animate-pulse"
        )}
      />
      {label ?? STATUS_LABELS[variant ?? "stable"]}
    </span>
  );
}

export { statusIndicatorVariants };
