"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import { MoveDown, ChevronsRight } from "lucide-react";

interface LanyardData {
  id: string;
  stepNumber: string;
  badgeCode: string;
  era: string;
  title: string;
  role: string;
  institution: string;
  description: string;
  statusLabel: string;
}

function LanyardCardItem({ item }: { item: LanyardData }) {
  // Motion value koordinat Y tarikan kartu perorangan
  const y = useMotionValue(0);

  // Tali melar elastis mengikuti tarikan kursor secara real-time (karet melar)
  const strapHeight = useTransform(y, (v) => Math.max(72, 72 + v));

  return (
    <div className="relative flex flex-col items-center w-full min-h-[440px] pt-0">
      
      {/* 1. TOP CEILING MOUNT BRACKET (TERKUNCI DI ATAS REL KERETA) */}
      <div className="w-9 h-3.5 bg-neutral-900 rounded-b-md shadow-xs z-30 shrink-0 border-b border-neutral-700" />

      {/* 2. ELASTIC RUBBER STRAP (MELAR SEPERTI KARET KETIKA DITARIK) */}
      <motion.div
        style={{ height: strapHeight }}
        className="absolute top-3 w-5 bg-[#18181b] border-x border-neutral-700 shadow-sm overflow-hidden flex justify-between px-[2px] z-10 origin-top"
      >
        {/* Jahitan Mikro di Tepi Tali */}
        <div className="w-[1px] h-full border-l border-dashed border-white/20" />
        <div className="w-[1px] h-full border-r border-dashed border-white/20" />
        {/* Tekstur Anyaman Pita */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* 3. CARD & CLASP UNIT (DAPAT DITARIK DENGAN MOUSE KE BAWAH) */}
      <motion.div
        style={{ y }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 105 }}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 380, bounceDamping: 22 }}
        whileHover={{ scale: 1.015 }}
        whileDrag={{ scale: 1.03, cursor: "grabbing" }}
        className="absolute top-[72px] w-full max-w-[275px] flex flex-col items-center cursor-grab active:cursor-grabbing z-20 group"
      >
        {/* METALLIC SILVER SWIVEL CLASP (PENGAIT LOGAM MENGGIGIT KE LUBANG KARTU) */}
        <div className="relative flex flex-col items-center shrink-0 z-30 -mb-2">
          {/* Badan Klip Perak */}
          <div className="w-6 h-3.5 bg-gradient-to-b from-neutral-200 via-neutral-100 to-neutral-400 rounded-xs border border-neutral-400 shadow-xs" />
          {/* Cincin Pengait Melingkar Tepat di Lubang Kartu */}
          <div className="w-4 h-5 -mt-1 border-2 border-neutral-400 rounded-b-full bg-gradient-to-b from-neutral-300 to-neutral-100 shadow-xs" />
        </div>

        {/* 4. REFINED ACRYLIC BADGE CARD BODY */}
        <div className="w-full relative bg-white rounded-2xl border border-neutral-200/90 group-hover:border-neutral-400 p-5 shadow-lg shadow-neutral-200/60 overflow-hidden flex flex-col justify-between min-h-[330px] transition-colors duration-300">
          
          {/* PUNCHED OVAL LANYARD HOLE */}
          <div className="w-8 h-2.5 mx-auto -mt-1 mb-4 rounded-full bg-neutral-100 border border-neutral-300 shadow-inner flex items-center justify-center">
            <div className="w-5 h-1 rounded-full bg-neutral-200" />
          </div>

          {/* GLOSSY SPECULAR LIGHT SHEEN (PANTULAN KILAP CAHAYA) */}
          <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-tr from-transparent via-white/50 to-transparent rotate-45 pointer-events-none opacity-60 group-hover:translate-x-12 group-hover:translate-y-12 transition-transform duration-700 ease-out" />

          {/* CARD CONTENT */}
          <div className="relative z-10">
            {/* Header Row: Step Number & Year Badge */}
            <div className="flex items-center justify-between font-mono text-xs border-b border-neutral-100 pb-3 mb-3">
              <span className="font-bold text-neutral-400 tracking-wider">
                {item.stepNumber} · {item.badgeCode}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white font-bold text-[11px] tracking-wide shadow-xs">
                {item.era}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors mt-1">
              {item.title}
            </h3>

            {/* Role & Institution */}
            <div className="mt-1.5 font-mono text-[11px] text-neutral-500 leading-snug">
              <p className="font-semibold text-neutral-700">{item.role}</p>
              <p className="text-neutral-400 mt-0.5">{item.institution}</p>
            </div>

            {/* Narrative Description */}
            <p className="mt-3.5 pt-3 border-t border-neutral-100 text-xs text-neutral-600 leading-relaxed font-sans font-normal">
              {item.description}
            </p>
          </div>

          {/* CARD FOOTER: STATUS & PULL HINT */}
          <div className="relative z-10 mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-semibold tracking-wider">
              {item.statusLabel}
            </span>

            {/* Pull Indicator Hint */}
            <span className="text-[10px] text-neutral-400 flex items-center gap-0.5 group-hover:text-neutral-700 transition-colors">
              <MoveDown className="w-3 h-3 animate-bounce" />
              <span>tarik</span>
            </span>
          </div>

        </div>
      </motion.div>

    </div>
  );
}

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mengaitkan scroll vertikal dengan progres gerak kereta horizontal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics untuk melembutkan putaran scroll roda mouse (tanpa patah-patah)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 90,
    mass: 0.35,
  });

  // Pemetaan rute perjalanan kereta:
  // Masuk dari kanan (55vw) -> Masuk ke tengah/fokus baca (10vw sampai -15vw) -> Keluar ke kiri (-95vw)
  // Saat scroll ke atas, nilai berkurang sehingga kereta otomatis berjalan mundur!
  const trainX = useTransform(
    smoothProgress,
    [0, 0.2, 0.75, 1],
    ["60vw", "12vw", "-15vw", "-100vw"]
  );

  // Clip rel dari sisi kiri: saat card lewat ke kiri, rel ikut terpotong dari kiri
  const railClipLeft = useTransform(trainX, (val: string) => {
    const num = parseFloat(val); // "60vw" → 60, "-15vw" → -15
    if (num >= 0) return "inset(0px 0px 0px 0px)";
    const clip = Math.min(100, Math.abs(num));
    return `inset(0px 0px 0px ${clip}vw)`;
  });

  const lanyards: LanyardData[] = [
    {
      id: "lanyard-1",
      stepNumber: "01",
      badgeCode: "DR-1722",
      era: "2017 — 2022",
      title: "Character & Discipline",
      role: "Boarding Scholar · 5-Yr Tenacity",
      institution: "Intensive Boarding Institution",
      description:
        "Menempa kemandirian, fokus mental, dan kedisiplinan hidup selama 5 tahun di asrama intensif. Fondasi karakter tangguh dan integritas yang menjadi modal utama dalam memecahkan masalah logika coding rumit.",
      statusLabel: "CLEARED & FORGED",
    },
    {
      id: "lanyard-2",
      stepNumber: "02",
      badgeCode: "DR-2024",
      era: "2024",
      title: "Computer Science Leap",
      role: "Undergraduate Software Engineer",
      institution: "Universitas Pamulang · Informatics",
      description:
        "Memulai studi S1 Teknik Informatika. Mendalami arsitektur rekayasa perangkat lunak modern, struktur data, komputasi terdistribusi, dan membangun ekosistem web full-stack modern.",
      statusLabel: "IN PROGRESS",
    },
    {
      id: "lanyard-3",
      stepNumber: "03",
      badgeCode: "DR-2025",
      era: "2025",
      title: "Venture & Endurance",
      role: "Founder Buatin & Endurance Cyclist",
      institution: "Buatin.biz.id & Velo Lifestyle",
      description:
        "Meluncurkan agensi kilat Buatin.biz.id untuk transformasi digital UMKM dan mahasiswa. Beriringan aktif dalam endurance cycling untuk melatih ritme kayuhan, stamina mental panjang, dan fokus jernih di luar layar.",
      statusLabel: "ACCELERATED",
    },
    {
      id: "lanyard-4",
      stepNumber: "04",
      badgeCode: "DR-2026",
      era: "2026 · PRESENT",
      title: "AI Agentic & Homelab",
      role: "Autonomous Agent & Cloud Architect",
      institution: "Antigravity, Claude & Proxmox",
      description:
        "Mengorkestrasi sistem AI Agentic multi-model (Google Antigravity, Claude 3.7, Hermes) dan mengelola infrastruktur private homelab (Proxmox, Coolify, Cloudflare Tunnel) untuk workflow development otomatis end-to-end.",
      statusLabel: "CURRENT FOCUS",
    },
  ];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative h-[250vh] bg-[#fafafa] border-t border-neutral-100 select-none"
    >
      {/* STICKY SCREEN VIEWPORT: MENGUNCI LAYAR SAAT RANGKAIAN KERETA BERGERAK */}
      <div className="sticky top-0 h-screen w-full overflow-x-hidden flex flex-col justify-center pb-4">
        <div className="max-w-7xl mx-auto w-full px-6">
          
          {/* Section Header */}
          <div className="text-center mb-8 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-mono font-medium text-neutral-600 mb-2 shadow-xs">
              <ChevronsRight className="w-3.5 h-3.5 text-neutral-500 animate-pulse" />
              <span>SCROLL-DRIVEN CONVOY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Hanging Life Milestones
            </h2>
          </div>

          {/* OVERHEAD MONORAIL TRACK — statis, tapi sisi kiri terpotong saat card lewat */}
          <motion.div
            style={{ clipPath: railClipLeft }}
            className="relative w-full h-[3px] bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 rounded-full shadow-inner mb-0 z-0"
          />

          {/* THE MOVING LANYARD TRAIN CONVOY */}
          <div className="relative w-full overflow-hidden">
            <motion.div
              style={{ x: trainX }}
              className="flex items-start gap-8 sm:gap-10 pt-0 w-max relative z-10"
            >
              {lanyards.map((item) => (
                <div key={item.id} className="w-[280px] sm:w-[300px] shrink-0">
                  <LanyardCardItem item={item} />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
