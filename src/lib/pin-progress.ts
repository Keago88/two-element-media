export const PIN_HEADER_PX = 72;

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function pinMotionActive() {
  return (
    window.matchMedia("(min-width: 768px)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

/** 0 when the sticky stage locks, 1 when it unlocks. */
export function pinProgress(track: HTMLElement, headerPx = PIN_HEADER_PX) {
  const rect = track.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  const pinDist = Math.max(rect.height - (viewH - headerPx), 1);
  return clamp01((headerPx - rect.top) / pinDist);
}

export function coverProgress(track: HTMLElement) {
  const rect = track.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  const total = viewH + rect.height;
  return clamp01((viewH - rect.top) / Math.max(total, 1));
}
