function levelColor(v: number) {
  if (v < 35) return "from-red-500 to-orange-500";
  if (v < 65) return "from-brand-orange to-brand-orangeLight";
  return "from-brand-blue to-brand-blueLight";
}

export default function EnergyBar({ name, value, highlight }: { name: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-28 shrink-0 truncate text-sm ${highlight ? "font-semibold text-white" : "text-white/70"}`}>
        {name}
      </span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${levelColor(value)} transition-all duration-500`}
          style={{ width: `${Math.max(4, value)}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-sm tabular-nums text-white/80">{value}%</span>
    </div>
  );
}
