export function phoneHref(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return `tel:+${digits}`;
}

export function phoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return `+${digits}`;
}
