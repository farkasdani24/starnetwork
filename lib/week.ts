// Hét kezdetének (hétfő) meghatározása ISO hét szerint, YYYY-MM-DD formátumban.
export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay(); // 0 = vasárnap, 1 = hétfő, ...
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diffToMonday);
  return d.toISOString().slice(0, 10);
}

export function formatWeekLabel(weekStart: string): string {
  const start = new Date(weekStart + "T00:00:00Z");
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 4); // hétfő - péntek
  const fmt = (d: Date) =>
    d.toLocaleDateString("hu-HU", { month: "long", day: "numeric" });
  return `${fmt(start)} - ${fmt(end)}`;
}
