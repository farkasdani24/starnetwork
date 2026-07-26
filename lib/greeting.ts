export function timeGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 5) return "Szia";
  if (hour < 10) return "Jó reggelt";
  if (hour < 18) return "Jó napot";
  return "Jó estét";
}
