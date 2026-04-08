import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react";

/**
 * AlertBanner — a prominent notification bar for clinical alerts, system messages, or triage prompts.
 */
const alertBannerVariants = cva(
  "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      severity: {
        critical: "border-esi-1/40 bg-esi-1/10 text-esi-1",
        warning: "border-esi-3/40 bg-esi-3/10 text-esi-3",
        info: "border-esi-5/40 bg-esi-5/10 text-esi-5",
        success: "border-esi-4/40 bg-esi-4/10 text-esi-4",
      },
    },
    defaultVariants: {
      severity: "info",
    },
  }
);

const ICONS = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBannerVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function AlertBanner({
  severity = "info",
  title,
  children,
  dismissible,
  onDismiss,
  className,
  ...props
}: AlertBannerProps) {
  const Icon = ICONS[severity ?? "info"];

  return (
    <div className={cn(alertBannerVariants({ severity }), className)} role="alert" {...props}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="shrink-0 rounded p-1 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export { alertBannerVariants };
