import { ESI_LABELS, type Patient, type ESILevel } from "@/lib/triage-data";

export function ESIDistribution({ patients }: { patients: Patient[] }) {
  const counts: Record<ESILevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  patients.forEach((p) => counts[p.esiLevel]++);
  const max = Math.max(...Object.values(counts), 1);

  const colors: Record<ESILevel, string> = {
    1: "bg-esi-1",
    2: "bg-esi-2",
    3: "bg-esi-3",
    4: "bg-esi-4",
    5: "bg-esi-5",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        ESI Distribution
      </h3>
      <div className="flex items-end gap-2 h-24">
        {([1, 2, 3, 4, 5] as ESILevel[]).map((level) => (
          <div key={level} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-xs font-bold font-mono">{counts[level]}</span>
            <div
              className={`w-full rounded-t ${colors[level]} transition-all duration-500`}
              style={{ height: `${(counts[level] / max) * 100}%`, minHeight: counts[level] > 0 ? "4px" : "0" }}
            />
            <span className="text-[10px] text-muted-foreground">{level}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        <span>{ESI_LABELS[1]}</span>
        <span>{ESI_LABELS[5]}</span>
      </div>
    </div>
  );
}
