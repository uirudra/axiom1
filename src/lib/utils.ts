export function cn(...classes: (string | undefined | null | false | 0)[]) {
  return classes.filter(Boolean).join(" ");
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function formatNum(n: number, decimals = 2) {
  return n.toFixed(decimals);
}

export function getHeatColor(pct: number): string {
  if (pct > 2) return "rgba(0, 214, 143, 0.25)";
  if (pct > 0.5) return "rgba(0, 214, 143, 0.12)";
  if (pct > -0.5) return "rgba(26, 26, 46, 0.8)";
  if (pct > -2) return "rgba(247, 37, 133, 0.12)";
  return "rgba(247, 37, 133, 0.25)";
}

export function getHeatBorder(pct: number): string {
  if (pct > 2) return "rgba(0, 214, 143, 0.5)";
  if (pct > 0.5) return "rgba(0, 214, 143, 0.25)";
  if (pct > -0.5) return "rgba(26, 26, 46, 1)";
  if (pct > -2) return "rgba(247, 37, 133, 0.25)";
  return "rgba(247, 37, 133, 0.5)";
}
