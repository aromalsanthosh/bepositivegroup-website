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

  // Only decode while the crest is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
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
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
        >
          <source media="(max-width: 767px)" src={`${SRC}-720.webm`} type='video/webm; codecs="vp9"' />
          <source media="(max-width: 767px)" src={`${SRC}-720.mp4`} type="video/mp4" />
          <source src={`${SRC}-1080.webm`} type='video/webm; codecs="vp9"' />
          <source src={`${SRC}-1080.mp4`} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- poster must match the video frame exactly
        <img
          src={POSTER}
          alt=""
          width={880}
          height={880}
          className="absolute inset-0 size-full mix-blend-screen"
        />
      )}
    </div>
  );
}
