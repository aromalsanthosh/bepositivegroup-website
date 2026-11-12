"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react";
import type { Stream } from "@/lib/youtube";

// Click-to-play facade: a thumbnail until the visitor presses play, so the
// YouTube player (and its cookies) only load on demand.
export function StreamPlayer({ stream }: { stream: Stream }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[22px] bg-navy-deep">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${stream.id}?autoplay=1&rel=0`}
          title={stream.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Play ${stream.title}`}
        >
          <Image
            src={stream.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute top-1/2 left-1/2 grid size-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-[0_0_0_10px_rgba(255,255,255,0.25)] transition duration-300 group-hover:scale-105 group-hover:bg-red group-hover:text-white group-active:scale-95">
            <Play size={28} weight="fill" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
