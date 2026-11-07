export function readProgress(top: number, height: number, viewHeight: number): number {
  if (height <= 0) return 0
  const seen = Math.min(Math.max(viewHeight - top, 0), height)
  return seen / height
}
