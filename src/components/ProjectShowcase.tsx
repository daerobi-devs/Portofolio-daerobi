"use client";

import React from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";
import { Play, Sparkles } from "lucide-react";

// Dynamically import ShowcasePlayer for client-only canvas execution
const ShowcasePlayer = dynamic(
  () => import("./remotion/ShowcasePlayer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-video rounded-xl bg-neutral-100 flex flex-col items-center justify-center font-mono text-xs text-neutral-400">
        <Sparkles className="w-6 h-6 text-neutral-400 animate-pulse mb-2" />
        <span>loading live canvas...</span>
      </div>
    ),
  }
);

export default function ProjectShowcase() {
  return (
    <section id="showcase" className="py-12 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-5xl mx-auto">
        {/* Adham Dannaway Style Divider */}
        <ScrollReveal>
          <div className="section-divider">
            interactive project reel
          </div>
          <p className="text-center text-sm text-neutral-500 max-w-xl mx-auto -mt-4 mb-8">
            A dynamic canvas showcase rendered live in your browser using <span className="font-mono text-neutral-800">@remotion/player</span>.
          </p>
        </ScrollReveal>

        {/* Browser Mockup Frame */}
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-neutral-200/90 overflow-hidden shadow-soft bg-white">
            {/* Minimalist Browser Chrome Bar */}
            <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              </div>
              <div className="px-6 py-1 rounded-md bg-white border border-neutral-200 text-[11px] font-mono text-neutral-500 shadow-xs">
                https://daerobi.dev/live-showcase
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="hidden sm:inline">60fps</span>
              </div>
            </div>

            {/* Remotion Canvas Component */}
            <div className="p-2 sm:p-4 bg-neutral-900">
              <ShowcasePlayer />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
