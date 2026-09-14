"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion value koordinat posisi belahan (0% - 100%, default 50% di tengah)
  const splitPercent = useMotionValue(50);

  // Physics Spring: inersia empuk, berbobot, dan sangat halus (LERP / Spring Damping)
  const smoothPercent = useSpring(splitPercent, {
    damping: 32,
    stiffness: 140,
    mass: 0.6,
  });

  // Dynamic clip-path berbasis spring physics (mengikuti kursor secara proporsional)
  const clipPath = useTransform(
    smoothPercent,
    (v) => `polygon(0% 0%, ${v}% 0%, ${v}% 100%, 0% 100%)`
  );

  // Mikro-paralaks halus (inverted): kursor di kiri -> gambar geser lembut ke kanan (+15px), kursor di kanan -> gambar geser lembut ke kiri (-15px)
  const imageTranslateX = useTransform(
    smoothPercent,
    [0, 50, 100],
    [15, 0, -15]
  );

  // Efek redup teks secara halus dan proporsional sesuai pergeseran belahan
  const leftTextOpacity = useTransform(
    smoothPercent,
    [10, 50, 100],
    [0.35, 1, 1]
  );
  const rightTextOpacity = useTransform(
    smoothPercent,
    [0, 50, 90],
    [1, 1, 0.35]
  );

  // Pelacakan kursor mouse secara proporsional di atas foto
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    splitPercent.set(pct);
  };

  // Dukungan sentuhan layar di HP / Tablet (Touch Gesture)
  const handlePortraitTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    splitPercent.set(pct);
  };

  // Saat mouse keluar dari area Hero, pegas meluncur lembut kembali ke tengah (50/50 split)
  const handleSectionMouseLeave = () => {
    splitPercent.set(50);
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-white overflow-hidden select-none border-b border-neutral-100"
      onMouseLeave={handleSectionMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10 min-h-[520px]">
          
          {/* SISI KIRI: DESIGNER / DEVELOPER */}
          <motion.div
            style={{ opacity: leftTextOpacity }}
            onMouseEnter={() => splitPercent.set(100)}
            className="flex-1 text-center md:text-right cursor-pointer"
          >
            <a href="#portfolio" className="inline-block group">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight lowercase">
                developer
              </h1>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-sm ml-auto mr-auto md:mr-0">
                Product developer specialising in UI design, Next.js, and building clean, functional user experiences.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 group-hover:translate-x-[-3px] transition-transform">
                <span>see web projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </a>
          </motion.div>

          {/* TENGAH: ADHAM DANNAWAY THE SPLIT PORTRAIT DENGAN SPRING PHYSICS */}
          <div
            ref={containerRef}
            onMouseMove={handlePortraitMouseMove}
            onTouchMove={handlePortraitTouchMove}
            onTouchEnd={() => splitPercent.set(50)}
            className="relative w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[580px] aspect-square shrink-0 mx-auto group cursor-ew-resize"
          >
            {/* INNER MOTION WRAPPER: Subtle Inverted Micro-Parallax Shift */}
            <motion.div
              style={{ x: imageTranslateX }}
              className="absolute inset-0 w-full h-full"
            >
              {/* LAYER 1 (BOTTOM): REAL HUMAN PHOTOGRAPH (Coder Side) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <Image
                  src="/selfie-hero-real.jpg"
                  alt="Daerobi Real Photo"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 380px, (max-width: 1200px) 540px, 580px"
                />
              </div>

              {/* LAYER 2 (TOP): ARTISTIC ILLUSTRATION (Designer Side) dengan Spring Clip-Path */}
              <motion.div
                style={{
                  clipPath,
                  WebkitClipPath: clipPath,
                }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <Image
                  src="/selfie-hero-art.jpg"
                  alt="Daerobi Art Illustration"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 380px, (max-width: 1200px) 540px, 580px"
                />
              </motion.div>
            </motion.div>

            {/* Seamless Bottom Gradient to blend into white canvas */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          </div>

          {/* SISI KANAN: CODER */}
          <motion.div
            style={{ opacity: rightTextOpacity }}
            onMouseEnter={() => splitPercent.set(0)}
            className="flex-1 text-center md:text-left cursor-pointer"
          >
            <a href="#about" className="inline-block group">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight lowercase flex items-center justify-center md:justify-start">
                <span className="text-neutral-400 font-light">&lt;</span>coder<span className="text-neutral-400 font-light">&gt;</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-sm ml-auto mr-auto md:ml-0">
                Front end developer &amp; self-hoster who writes clean, elegant and efficient code for modern platforms.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 group-hover:translate-x-[3px] transition-transform">
                <span>see developer info</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
