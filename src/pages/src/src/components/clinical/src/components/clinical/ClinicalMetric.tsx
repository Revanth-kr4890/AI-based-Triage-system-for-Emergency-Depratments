import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ClinicalMetric — a compact stat display for dashboards. Shows a label + large value + optional trend.
 */
const clinicalMetricVariants = cva(
  "rounded-lg border border-border bg-card p-4",
  {
    variants: {
      highlight: {
        none: "",
        primary: "border-primary/30 bg-primary/5",
        danger: "border-esi-1/30 bg-esi-1/5",
        warning: "border-esi-3/30 bg-esi-3/5",
        success: "border-esi-4/30 bg-esi-4/5",
      },
    },
    defaultVariants: {
      highlight: "none",
    },
  }
);

interface ClinicalMetricProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof clinicalMetricVariants> {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { direction: "up" | "down" | "flat"; label: string };
}

export function ClinicalMetric({
  icon,
  label,
  value,
  trend,
  highlight,
  className,
  ...props
}: ClinicalMetricProps) {
  return (
    <div className={cn(clinicalMetricVariants({ highlight }), className)} {...props}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-2xl font-bold tracking-tight",
          highlight === "danger" && "esi-1-text",
          highlight === "warning" && "esi-3-text",
          highlight === "success" && "esi-4-text",
          highlight === "primary" && "text-primary"
        )}
      >
        {value}
      </div>
      {trend && (
        <div className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
          <span>
            {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}
          </span>
          {trend.label}
        </div>
      )}
    </div>
  );
}

export { clinicalMetricVariants };
