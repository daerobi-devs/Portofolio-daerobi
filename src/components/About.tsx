"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { AntigravityIcon, ClaudeIcon, OpenAiIcon, HermesIcon } from "./TechIcons";

function TypewriterHeadline({
  text = "Human craftsmanship, amplified by AI",
  speed = 45,
  delay = 200,
}: {
  text?: string;
  speed?: number;
  delay?: number;
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let current = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (current < text.length) {
          current++;
          setDisplayedLength(current);
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasStarted, text, speed, delay]);

  const currentText = text.slice(0, displayedLength);

  return (
    <h2
      ref={containerRef}
      className="text-xl sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] font-extrabold text-neutral-900 tracking-tight leading-tight sm:whitespace-nowrap min-h-[2.2rem] sm:min-h-[2.6rem]"
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{currentText}</span>
      <span
        aria-hidden="true"
        className="inline-block w-[3px] h-[0.85em] bg-neutral-900 ml-1.5 align-baseline animate-pulse"
      />
    </h2>
  );
}

export default function About() {
  return (
    <section id="about" className="py-16 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        {/* Adham Dannaway Style Section Divider */}
        <ScrollReveal>
          <div className="section-divider">
            about me
          </div>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Kolom Kiri: Floating AI Logos & Names (No Card Boxes, Clean & Prominent) */}
          <div className="lg:col-span-5 flex flex-col justify-center py-4">
            <ScrollReveal delay={0.1}>
              <div className="text-center sm:text-left mb-7">
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 block mb-1.5">
                  AI & Agentic Stack
                </span>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Orchestrated daily for autonomous coding, logic & architecture
                </p>
              </div>

              {/* Clean 2x2 Open Grid (Tanpa Card, Logo Besar & Nama) */}
              <div className="grid grid-cols-2 gap-y-9 gap-x-6 sm:gap-x-8">
                {/* 1. Google Antigravity */}
                <div className="group flex flex-col items-center text-center p-2 cursor-default">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                    <AntigravityIcon className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_10px_20px_rgba(66,133,244,0.35)]" />
                  </div>
                  <h3 className="mt-3.5 font-extrabold text-sm sm:text-base text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    Antigravity
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    Google DeepMind
                  </span>
                </div>

                {/* 2. Anthropic Claude */}
                <div className="group flex flex-col items-center text-center p-2 cursor-default">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                    <ClaudeIcon className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_10px_20px_rgba(217,119,87,0.35)]" />
                  </div>
                  <h3 className="mt-3.5 font-extrabold text-sm sm:text-base text-neutral-900 tracking-tight group-hover:text-amber-600 transition-colors">
                    Claude
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    Anthropic
                  </span>
                </div>

                {/* 3. OpenAI */}
                <div className="group flex flex-col items-center text-center p-2 cursor-default">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                    <OpenAiIcon className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]" />
                  </div>
                  <h3 className="mt-3.5 font-extrabold text-sm sm:text-base text-neutral-900 tracking-tight group-hover:text-neutral-950 transition-colors">
                    OpenAI
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    ChatGPT / GPT-4o
                  </span>
                </div>

                {/* 4. Nous Hermes */}
                <div className="group flex flex-col items-center text-center p-2 cursor-default">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                    <img
                      src="/hermes-logo.png"
                      alt="Nous Hermes Logo"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_10px_20px_rgba(220,38,38,0.35)]"
                    />
                  </div>
                  <h3 className="mt-3.5 font-extrabold text-sm sm:text-base text-neutral-900 tracking-tight group-hover:text-rose-600 transition-colors">
                    Hermes
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    Nous Research
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Kolom Kanan: Narasi Personal, Kolaborasi AI & Visi */}
          <div className="lg:col-span-7 lg:pl-4">
            <ScrollReveal delay={0.15}>
              {/* Animated Typewriter Headline (1 Baris Bersih, Tanpa Titik) */}
              <TypewriterHeadline
                text="Human craftsmanship, amplified by AI"
                speed={45}
                delay={200}
              />

              <div className="mt-6 space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                <p>
                  Halo! Saya <strong className="text-neutral-900 font-semibold">Daerobi</strong>, mahasiswa dan pengembang web di balik{" "}
                  <a
                    href="https://buatin.biz.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline font-medium hover:text-teal-600 transition-colors"
                  >
                    Buatin.biz.id
                  </a>
                  . Didukung oleh armada <em>AI engine</em> di samping sebagai mitra <em>pair-programming</em>, saya merancang aplikasi web modern (<strong>Next.js &amp; TypeScript</strong>) dengan kecepatan eksekusi tinggi dan standar arsitektur yang presisi.
                </p>
                <p>
                  Tak hanya menulis kode antarmuka, saya mengoperasikan server rumahan mandiri berbasis{" "}
                  <strong className="text-neutral-900 font-semibold">Proxmox VE &amp; Coolify</strong>. Menghadirkan solusi digital yang estetis, teruji, dan berdaulat penuh dari <em>frontend</em> hingga ke <em>bare-metal infrastructure</em>.
                </p>
              </div>

              {/* 2 Micro Highlight Cards (Akademik & Founder Buatin Resmi) */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Kartu Akademik */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70 hover:border-neutral-300 hover:bg-white hover:shadow-xs transition-all duration-300 flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center shrink-0 shadow-xs group-hover:border-neutral-300 group-hover:scale-105 transition-all">
                    <GraduationCap className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-extrabold text-neutral-900 uppercase tracking-wider">
                      AKADEMIK
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5 truncate">
                      Teknik Informatika, Universitas Pamulang
                    </p>
                  </div>
                </div>

                {/* 2. Kartu Founder Buatin (Clickable Link dengan Logo Resmi Buatin) */}
                <a
                  href="https://buatin.biz.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 sm:p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70 hover:border-teal-300 hover:bg-white hover:shadow-sm hover:shadow-teal-500/5 transition-all duration-300 flex items-center gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-teal-100 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-all overflow-hidden p-1.5">
                    <img
                      src="/buatin-emblem.png"
                      alt="Buatin Logo"
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(13,148,136,0.3)]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <h4 className="text-[11px] font-extrabold text-neutral-900 uppercase tracking-wider group-hover:text-teal-700 transition-colors">
                        FOUNDER
                      </h4>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-teal-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 truncate">
                      Inisiatif Buatin.biz.id untuk digitalisasi web
                    </p>
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
