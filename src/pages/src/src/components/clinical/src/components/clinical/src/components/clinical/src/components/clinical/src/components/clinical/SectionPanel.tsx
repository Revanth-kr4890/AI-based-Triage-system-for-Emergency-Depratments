import { cn } from "@/lib/utils";

/**
 * SectionPanel — a reusable container for dashboard sections with a title and optional actions.
 */
interface SectionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export function SectionPanel({
  title,
  icon,
  actions,
  children,
  className,
  ...props
}: SectionPanelProps) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {icon}
          {title}
        </h3>
        {actions}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
