import { ESI_LABELS, type ESILevel } from "@/lib/triage-data";

const levelStyles: Record<ESILevel, string> = {
  1: "bg-esi-1/15 text-esi-1 border-esi-1/30",
  2: "bg-esi-2/15 text-esi-2 border-esi-2/30",
  3: "bg-esi-3/15 text-esi-3 border-esi-3/30",
  4: "bg-esi-4/15 text-esi-4 border-esi-4/30",
  5: "bg-esi-5/15 text-esi-5 border-esi-5/30",
};

export function ESIBadge({ level }: { level: ESILevel }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold ${levelStyles[level]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${level <= 2 ? "animate-pulse" : ""}`}
        style={{ backgroundColor: "currentColor" }}
      />
      ESI-{level} · {ESI_LABELS[level]}
    </span>
  );
}
