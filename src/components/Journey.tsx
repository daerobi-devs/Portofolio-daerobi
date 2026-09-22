"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight, CheckCircle2, Clock, Zap, Cpu } from "lucide-react";

interface Milestone {
  id: string;
  stepNumber: string;
  period: string;
  badge: string;
  statusType: "completed" | "progress" | "accelerated" | "active";
  title: string;
  role: string;
  institution: string;
  link?: string;
  description: string;
  highlights: string[];
}

export default function Journey() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const milestones: Milestone[] = [
    {
      id: "journey-1",
      stepNumber: "01",
      period: "2017 — 2022",
      badge: "CLEARED & FORGED",
      statusType: "completed",
      title: "Character & Discipline",
      role: "Boarding Scholar · 5-Yr Tenacity",
      institution: "Intensive Boarding Institution",
      description:
        "Menempa kemandirian, ketahanan mental, dan kedisiplinan hidup selama 5 tahun penuh di lingkungan asrama intensif. Fondasi karakter pantang menyerah dan etos kerja ini menjadi modal fundamental dalam memecahkan masalah logika coding rumit dan menjaga stamina belajar teknologi baru.",
      highlights: ["Tenacity & Kemandirian", "Fokus Mental Tinggi", "Integritas Karakter", "Problem Solving"],
    },
    {
      id: "journey-2",
      stepNumber: "02",
      period: "2024",
      badge: "IN PROGRESS",
      statusType: "progress",
      title: "Computer Science Leap",
      role: "Undergraduate Software Engineer",
      institution: "Universitas Pamulang · Informatics",
      description:
        "Memulai pendidikan formal S1 Teknik Informatika. Mendalami teori fundamental ilmu komputer mulai dari algoritma & struktur data, arsitektur rekayasa perangkat lunak, komputasi terdistribusi, hingga mempraktekkan ekosistem web modern berbasis React, TypeScript, dan Next.js.",
      highlights: ["S1 Teknik Informatika", "Struktur Data & Algoritma", "Fullstack Web Engineering", "Database Systems"],
    },
    {
      id: "journey-3",
      stepNumber: "03",
      period: "2025",
      badge: "ACCELERATED",
      statusType: "accelerated",
      title: "Venture & Endurance",
      role: "Founder Buatin & Endurance Cyclist",
      institution: "Buatin.biz.id & Velo Lifestyle",
      link: "https://buatin.biz.id",
      description:
        "Membangun agensi pembuatan website kilat Buatin.biz.id untuk membantu digitalisasi UMKM dan mahasiswa dengan solusi web yang terjangkau. Secara paralel aktif dalam olahraga endurance cycling jarak jauh untuk melatih ritme kayuhan, kesabaran, stamina jantung, dan ketajaman fokus di luar layar.",
      highlights: ["Founder Buatin.biz.id", "Digitalisasi UMKM", "Client Relationship", "Endurance & Mental Toughness"],
    },
    {
      id: "journey-4",
      stepNumber: "04",
      period: "2026 — PRESENT",
      badge: "CURRENT FOCUS",
      statusType: "active",
      title: "AI Agentic & Private Cloud Architect",
      role: "Autonomous Agent & Cloud Infrastructure Engineer",
      institution: "Antigravity, Claude Code & Proxmox Homelab",
      description:
        "Mengembangkan dan mengorkestrasi sistem AI Agentic mandiri (Google Antigravity, Claude Code, Gemini, Hermes) dengan protokol MCP (Model Context Protocol). Sekaligus merancang infrastruktur private homelab berbasis Proxmox VE, container Coolify, Docker, dan Cloudflare Tunnel untuk eksekusi software otonom end-to-end.",
      highlights: ["Google Antigravity & MCP", "Claude Code Workflow", "Proxmox Private Cloud", "Coolify & Docker Self-Hosting"],
    },
  ];

  const getBadgeStyle = (type: Milestone["statusType"]) => {
    switch (type) {
      case "active":
        return "bg-amber-500/10 text-amber-600 border-amber-500/30";
      case "accelerated":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "progress":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
      case "completed":
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-300";
    }
  };

  const getStatusIcon = (type: Milestone["statusType"]) => {
    switch (type) {
      case "active":
        return <Zap className="w-3 h-3 text-amber-500 shrink-0" />;
      case "accelerated":
        return <Cpu className="w-3 h-3 text-blue-500 shrink-0" />;
      case "progress":
        return <Clock className="w-3 h-3 text-emerald-500 shrink-0" />;
      case "completed":
      default:
        return <CheckCircle2 className="w-3 h-3 text-neutral-500 shrink-0" />;
    }
  };

  return (
    <section id="journey" className="py-24 sm:py-32 px-6 bg-[#fafafa] border-t border-neutral-200/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 block mb-2">
              Career & Life Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Chronicles of Growth
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto mt-2.5 leading-relaxed">
              Transformasi berkesinambungan dari tempaan karakter 5 tahun asrama, lompatan akademik ilmu komputer, hingga arsitektur AI agentic dan private cloud.
            </p>
          </div>
        </ScrollReveal>

        {/* Brittany Chiang Inspired Experience List */}
        <div className="space-y-5 sm:space-y-6">
          {milestones.map((m, index) => (
            <ScrollReveal key={m.id} delay={index * 0.1}>
              <div
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative rounded-2xl border p-6 sm:p-8 transition-all duration-300 ease-out ${
                  hoveredId === m.id
                    ? "bg-white border-neutral-300/90 shadow-lg shadow-neutral-200/60 -translate-y-1"
                    : "bg-white/80 hover:bg-white border-neutral-200/70 shadow-xs"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  
                  {/* Left Column: Period & Badge */}
                  <div className="md:col-span-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-2 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neutral-400">
                        {m.stepNumber}
                      </span>
                      <span className="text-neutral-300">•</span>
                      <span className="font-mono text-xs font-bold text-neutral-700 tracking-wide">
                        {m.period}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border uppercase transition-colors ${getBadgeStyle(
                        m.statusType
                      )}`}
                    >
                      {getStatusIcon(m.statusType)}
                      <span>{m.badge}</span>
                    </span>
                  </div>

                  {/* Right Column: Title, Role, Description, and Tags */}
                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors tracking-tight">
                          {m.title}
                        </h3>
                        {m.link && (
                          <a
                            href={m.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-neutral-400 hover:text-blue-600 transition-colors"
                            title="Open Link"
                          >
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-neutral-500 mt-0.5">
                        <span className="text-neutral-700 font-semibold">{m.role}</span> —{" "}
                        <span className="text-neutral-500">{m.institution}</span>
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {m.description}
                    </p>

                    {/* Skill / Domain Highlights Badges */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {m.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-0.5 rounded-md bg-neutral-100/90 text-neutral-600 text-[11px] font-medium border border-neutral-200/60 transition-colors group-hover:bg-neutral-100 group-hover:border-neutral-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
