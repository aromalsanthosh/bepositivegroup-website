"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// 3D BPG crest, rendered in Blender as a seamless 5 s loop (see scripts/emblem/).
// The render sits on pure black and mix-blend-mode: screen drops the black, so
// the crest floats on whatever dark background is behind it without needing
// alpha video (which Safari cannot play from WebM). Keep it out of transformed
// or isolated wrappers: those give the blend an empty backdrop.
const SRC = "/videos/bpg-emblem/dark";
const POSTER = "/images/brand/bpg-emblem-dark.webp";
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function BrandEmblem({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // false on the server and during hydration, so the poster renders first.
  const animate = useSyncExternalStore(
    subscribeMotion,
    () => !matchMedia(REDUCED).matches,
    () => false,
  );

  // Nothing downloads until the crest is about to scroll into view; then ONE
  // file is chosen for this device (size by viewport, WebM where supported)
  // rather than <source media> lists, which some browsers fetch more than
  // once. After that, play only while on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (!video.src) {
          const size = matchMedia("(max-width: 767px)").matches ? 720 : 1080;
          const webm = video.canPlayType('video/webm; codecs="vp9"') !== "";
          video.src = `${SRC}-${size}.${webm ? "webm" : "mp4"}`;
        }
        video.play().catch(() => {});
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div
      role="img"
      aria-label="Be Positive Group crest"
      className={`relative aspect-square ${className}`}
    >
      {animate ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full mix-blend-screen"
          poster={POSTER}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- poster must match the video frame exactly
        <img
          src={POSTER}
          alt=""
          width={640}
          height={640}
          className="absolute inset-0 size-full mix-blend-screen"
        />
      )}
    </div>
  );
}
