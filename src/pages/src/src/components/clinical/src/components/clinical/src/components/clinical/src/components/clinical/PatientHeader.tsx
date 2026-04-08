import { cn } from "@/lib/utils";
import { ESIBadge } from "@/components/ESIBadge";
import { StatusIndicator } from "./StatusIndicator";
import type { Patient } from "@/lib/triage-data";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

/**
 * PatientHeader — a reusable patient identity bar showing name, demographics, ESI, status, and arrival.
 */
interface PatientHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  patient: Patient;
  compact?: boolean;
}

export function PatientHeader({ patient, compact, className, ...props }: PatientHeaderProps) {
  const statusVariant =
    patient.status === "treating"
      ? "treating"
      : patient.esiLevel <= 2
      ? "critical"
      : patient.status === "waiting"
      ? "waiting"
      : "discharged";

  if (compact) {
    return (
      <div className={cn("flex items-center justify-between gap-2", className)} {...props}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-sm truncate">{patient.name}</span>
          <span className="text-xs text-muted-foreground">
            {patient.age}{patient.gender}
          </span>
        </div>
        <ESIBadge level={patient.esiLevel} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-between gap-4", className)} {...props}>
      <div>
        <h2 className="text-xl font-bold">{patient.name}</h2>
        <p className="text-sm text-muted-foreground">
          {patient.age}yo ·{" "}
          {patient.gender === "M" ? "Male" : patient.gender === "F" ? "Female" : "Other"} · ID:{" "}
          {patient.id}
        </p>
        <div className="mt-1.5 flex items-center gap-3">
          <StatusIndicator variant={statusVariant} format="pill" size="sm" />
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(patient.arrivalTime, { addSuffix: true })}
          </span>
        </div>
      </div>
      <ESIBadge level={patient.esiLevel} />
    </div>
  );
}
