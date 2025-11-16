export function formatDateTime(s) {
  if (!s) return "TBD";
  const d = new Date(s);
  return d.toLocaleString();
}