"use client";

import React from "react";
import { interpolate, useCurrentFrame, Img } from "remotion";

const PROJECTS = [
  {
    id: "buatin",
    name: "Buatin.biz.id",
    tagline: "Agensi Web Kilat & Solusi Bisnis/Kuliah",
    tech: "HTML5 • CSS3 • Vanilla JS • Coolify",
    image: "/screenshots/buatin.png",
  },
  {
    id: "atlas",
    name: "Atlas — Personal Dashboard",
    tagline: "Student Productivity & Google Drive 15GB Offload",
    tech: "Next.js 16 • Supabase • Google Drive API • Proxmox",
    image: "/screenshots/atlas.png",
  },
  {
    id: "arrohman",
    name: "Presensi SMP Islam Arrohman",
    tagline: "Fingerprint ADMS iClock & VAPID Web Push PWA",
    tech: "TanStack Start • Nitro • React 19 • Supabase Realtime",
    image: "/screenshots/arrohman.png",
  },
  {
    id: "wagate",
    name: "WaGate AI Gateway",
    tagline: "WhatsApp Multi-Device API & Gemini Auto-Reply",
    tech: "Next.js • Node.js • Baileys • Gemini AI • Docker",
    image: "/screenshots/wagate.png",
  },
];

export const ShowcaseComposition: React.FC = () => {
  const frame = useCurrentFrame();

  // 4 projects, 60 frames (2s) each = 240 frames total loop
  const totalFrames = 240;
  const projectIndex = Math.floor((frame % totalFrames) / 60);
  const currentProject = PROJECTS[projectIndex];
  const localFrame = frame % 60;

  // Cinematic scale and drift inside the 60 frame window
  const scale = interpolate(localFrame, [0, 60], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(localFrame, [0, 60], [0, -10], {
    extrapolateRight: "clamp",
  });

  const fadeIn = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0c0d10",
        fontFamily: "var(--font-mono), monospace",
      }}
    >
      {/* Background Image with Ken Burns drift */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity: fadeIn,
          transition: "opacity 0.2s ease-out",
        }}
      >
        <Img
          src={currentProject.image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(12,13,16,0.6) 0%, rgba(12,13,16,0.2) 50%, rgba(12,13,16,0.92) 100%)",
        }}
      />

      {/* Technical HUD Top Bar */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#a1a1aa",
          fontSize: 11,
          letterSpacing: "0.08em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
            }}
          />
          <span style={{ color: "#f4f4f5", fontWeight: 700 }}>
            REMOTION LIVE SHOWCASE
          </span>
          <span style={{ color: "#71717a" }}>// REAL-TIME CANVAS</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#f59e0b" }}>
            PROJ [{projectIndex + 1}/4]: {currentProject.id.toUpperCase()}
          </span>
          <span>FRAME: {frame % 240}/240</span>
        </div>
      </div>

      {/* Project Info Lower Banner */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          padding: "16px 20px",
          background: "rgba(18, 19, 24, 0.88)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: "#f4f4f5" }}>
            {currentProject.name}
          </div>
          <div style={{ fontSize: 11, color: "#f59e0b", letterSpacing: "0.04em" }}>
            {currentProject.tagline}
          </div>
        </div>

        <div
          style={{
            fontSize: 11,
            color: "#71717a",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "#10b981" }}>● LIVE DEPLOYMENT</span>
          <span>•</span>
          <span style={{ color: "#a1a1aa" }}>{currentProject.tech}</span>
        </div>
      </div>
    </div>
  );
};
