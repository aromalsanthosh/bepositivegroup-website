"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react";

// Click-to-load YouTube player: the iframe (heavy) only loads on demand.
// The channel's live_stream embed always shows the current or next broadcast.
export function LivePlayer({ embedUrl, poster, title }: { embedUrl: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[12px] bg-black">
      {playing ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0"
        >
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="glass inline-flex size-16 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-105">
              <Play size={26} weight="fill" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
