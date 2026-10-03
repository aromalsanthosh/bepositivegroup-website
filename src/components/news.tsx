"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Newspaper } from "@phosphor-icons/react";
import { news, newsCategories } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

type Filter = (typeof newsCategories)[number];

export function News() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = filter === "All" ? news : news.filter((n) => n.category === filter);

  return (
    <section id="news" className="mx-auto max-w-[1240px] px-5 py-24 sm:py-32">
      <SectionHeading
        title="News"
        accent="& insights."
        intro="Updates from across the group, our verticals and the industries we work in."
      />

      {/* Category filter: wrapping pills on phones so every option is visible,
          one glass capsule from sm up. */}
      <div className="mt-10">
        <ul
          aria-label="Filter news by category"
          className="flex flex-wrap gap-2 sm:inline-flex sm:flex-nowrap sm:gap-1 sm:rounded-full sm:bg-white/[0.06] sm:p-1.5 sm:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),inset_0_0_0_1px_rgb(255_255_255/0.09)] sm:backdrop-blur-[18px]"
        >
          {newsCategories.map((c) => {
            const on = c === filter;
            return (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c)}
                  className={`h-10 rounded-full px-4 text-[14px] font-semibold whitespace-nowrap transition-colors duration-200 active:translate-y-px ${on ? "bg-white text-bg" : "bg-white/[0.06] text-text/80 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)] hover:bg-white/10 hover:text-white sm:bg-transparent sm:shadow-none sm:hover:bg-white/8"}`}
                >
                  {c}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p aria-live="polite" className="sr-only">
        {items.length} {items.length === 1 ? "story" : "stories"} in {filter}
      </p>

      {items.length > 0 ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map((n, i) => {
            const external = n.href.startsWith("http");
            return (
              <li key={n.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <a
                    href={n.href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="lg group flex h-full flex-col overflow-hidden rounded-[30px] p-3"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[22px]">
                      <Image
                        src={n.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 600px, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-4 p-4 sm:p-5">
                      <div>
                        <p className="text-[14px] font-semibold text-blue-bright">{n.category}</p>
                        <h3 className="mt-1.5 text-[21px] leading-snug font-semibold tracking-[-0.015em]">{n.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-muted">{n.text}</p>
                      </div>
                      <ArrowUpRight size={20} aria-hidden className="mt-1 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </div>
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="lg-thin mt-8 flex flex-col items-start gap-4 rounded-[30px] p-8 sm:flex-row sm:items-center sm:p-10">
          <span className="lg grid size-14 shrink-0 place-items-center rounded-2xl text-blue-bright">
            <Newspaper size={26} aria-hidden />
          </span>
          <div>
            <p className="text-[19px] font-semibold tracking-[-0.01em]">No {filter} stories yet.</p>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">
              Updates will appear here as they are published.{" "}
              <button type="button" onClick={() => setFilter("All")} className="font-semibold text-text underline-offset-4 hover:underline">
                Show all news
              </button>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
