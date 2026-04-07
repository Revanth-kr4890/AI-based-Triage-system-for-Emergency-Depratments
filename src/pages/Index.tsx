import { useState } from "react";
import { StatsBar } from "@/components/StatsBar";
import { PatientQueue } from "@/components/PatientQueue";
import { PatientDetail } from "@/components/PatientDetail";
import { PatientIntakeForm } from "@/components/PatientIntakeForm";
import { ESIDistribution } from "@/components/ESIDistribution";
import { AlertBanner } from "@/components/clinical/AlertBanner";
import { MOCK_PATIENTS, type Patient } from "@/lib/triage-data";
import { Activity, Plus, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [selectedId, setSelectedId] = useState<string | null>("P-001");
  const [showIntake, setShowIntake] = useState(false);

  const selectedPatient = patients.find((p) => p.id === selectedId) ?? null;

  const handleAddPatient = (patient: Patient) => {
    setPatients((prev) => [patient, ...prev]);
    setSelectedId(patient.id);
    setShowIntake(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">ED Triage</h1>
              <p className="text-[11px] text-muted-foreground">Emergency Department · AI-Assisted Triage</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIntake(!showIntake)}
              className="text-xs"
            >
              {showIntake ? (
                <>
                  <List className="mr-1.5 h-3.5 w-3.5" />
                  View Queue
                </>
              ) : (
                <>
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  New Patient
                </>
              )}
            </Button>
            <div className="flex items-center gap-1.5 rounded-full bg-esi-4/15 px-2.5 py-1">
              <span className="h-2 w-2 rounded-full bg-esi-4 animate-pulse" />
              <span className="text-[11px] font-medium text-esi-4">System Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-5">
          {patients.filter(p => p.esiLevel === 1 && p.status === "treating").length > 0 && (
            <AlertBanner severity="critical" title="Active Resuscitation">
              {patients.filter(p => p.esiLevel === 1 && p.status === "treating").length} ESI-1 patient(s) currently receiving critical care
            </AlertBanner>
          )}

          <StatsBar patients={patients} />

          <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
            {/* Left panel */}
            <div className="space-y-5">
              {showIntake ? (
                <div className="rounded-lg border border-border bg-card p-5">
                  <PatientIntakeForm onSubmit={handleAddPatient} />
                </div>
              ) : (
                <PatientQueue
                  patients={patients}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              )}
            </div>

            {/* Right panel */}
            <div className="space-y-5">
              {selectedPatient && (
                <div className="rounded-lg border border-border bg-card p-5">
                  <PatientDetail patient={selectedPatient} />
                </div>
              )}
              <ESIDistribution patients={patients} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
