import { VitalCard } from "@/components/clinical/VitalCard";
import { PatientHeader } from "@/components/clinical/PatientHeader";
import { SectionPanel } from "@/components/clinical/SectionPanel";
import type { Patient } from "@/lib/triage-data";
import { Heart, Thermometer, Wind, Droplets, Gauge, Stethoscope } from "lucide-react";

export function PatientDetail({ patient }: { patient: Patient }) {
  const vitalsData = [
    { label: "Heart Rate", value: patient.vitals.hr, unit: "bpm", icon: <Heart className="h-3 w-3" />, warn: patient.vitals.hr > 100 || patient.vitals.hr < 50 },
    { label: "Blood Pressure", value: patient.vitals.bp, icon: <Gauge className="h-3 w-3" />, warn: false },
    { label: "SpO₂", value: patient.vitals.spo2, unit: "%", icon: <Droplets className="h-3 w-3" />, warn: patient.vitals.spo2 < 94 },
    { label: "Temperature", value: patient.vitals.temp, unit: "°C", icon: <Thermometer className="h-3 w-3" />, warn: patient.vitals.temp > 38.0 },
    { label: "Resp Rate", value: patient.vitals.rr, unit: "/min", icon: <Wind className="h-3 w-3" />, warn: patient.vitals.rr > 22 },
    { label: "Pain Scale", value: `${patient.painScale}/10`, icon: <Gauge className="h-3 w-3" />, warn: patient.painScale >= 7 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PatientHeader patient={patient} />

      <SectionPanel title="Chief Complaint" icon={<Stethoscope className="h-3.5 w-3.5" />}>
        <p className="text-sm font-medium">{patient.chiefComplaint}</p>
      </SectionPanel>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Vitals
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {vitalsData.map((v) => (
            <VitalCard
              key={v.label}
              icon={v.icon}
              label={v.label}
              value={v.value}
              unit={v.unit}
              state={v.warn ? "critical" : "normal"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
