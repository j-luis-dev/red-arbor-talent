/**
 * Derives initials from a name for use in avatars or labels.
 * - Empty/whitespace-only: returns "?".
 * - Single word: returns the first two characters (e.g. "Jo" for "John").
 * - Multiple words: returns first letter of first and last word (e.g. "JD" for "John Doe").
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts.at(-1)![0]).toUpperCase();
}

/**
 * Produces a stable HSL color from a string (e.g. a name) for avatar backgrounds.
 * Uses a simple hash over Unicode code points and maps the result to hue 0–359,
 * with fixed saturation and lightness for consistent, readable contrast.
 */
export function hashColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++)
    h = (h << 5) - h + (name.codePointAt(i) ?? 0);
  const hue = Math.abs(h % 360);
  return `hsl(${hue}, 45%, 40%)`;
}
