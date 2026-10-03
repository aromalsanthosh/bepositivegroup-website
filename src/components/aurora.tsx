// Fixed, static aurora behind everything: soft blue and navy light pools for
// the glass to refract. Static on purpose, so backdrop blur only recomputes on
// scroll, never every frame.
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-bg">
      <div className="absolute -top-[30%] -left-[15%] size-[75vmax] rounded-full bg-[radial-gradient(closest-side,rgba(29,91,240,0.34),transparent)]" />
      <div className="absolute top-[20%] -right-[25%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(7,41,108,0.6),transparent)]" />
      <div className="absolute -bottom-[35%] left-[15%] size-[65vmax] rounded-full bg-[radial-gradient(closest-side,rgba(122,162,255,0.16),transparent)]" />
      {/* Fine vignette keeps edges deep. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_55%,rgba(2,4,10,0.8))]" />
    </div>
  );
}
