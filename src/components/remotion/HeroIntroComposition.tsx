"use client";

import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HeroIntroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Terminal prompt typing
  const textPrompt = "> daerobi --init --homelab";
  const charsShown = Math.floor(
    interpolate(frame, [0, 25], [0, textPrompt.length], {
      extrapolateRight: "clamp",
    })
  );
  const currentPrompt = textPrompt.slice(0, charsShown);

  // 2. Name Spring Reveal
  const nameSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // 3. Staggered Badges reveal
  const badges = [
    { label: "Next.js", color: "#f59e0b" },
    { label: "TypeScript", color: "#38bdf8" },
    { label: "Supabase", color: "#34d399" },
    { label: "Proxmox LXC", color: "#fb923c" },
    { label: "Coolify", color: "#a78bfa" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0f1015",
        borderRadius: 8,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono), monospace",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top terminal bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: "#71717a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: 8,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ef4444" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10b981" }} />
        </div>
        <div style={{ color: "#f59e0b", fontSize: 10, letterSpacing: "0.05em" }}>
          ● REMOTION REACT CANVAS // 30 FPS
        </div>
      </div>

      {/* Terminal typing output */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 13, color: "#a1a1aa" }}>
          {currentPrompt}
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 14,
              backgroundColor: "#f59e0b",
              marginLeft: 4,
              opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
              verticalAlign: "middle",
            }}
          />
        </div>

        {/* Dynamic Name Reveal with spring animation */}
        {frame > 28 && (
          <div
            style={{
              marginTop: 10,
              transform: `scale(${Math.max(0, nameSpring)})`,
              opacity: Math.min(1, nameSpring),
              transformOrigin: "left center",
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>
              DAEROBI
            </span>
            <span style={{ fontSize: 12, color: "#f59e0b", marginLeft: 8 }}>
              // VIBE CODER & HOMELAB OPERATOR
            </span>
          </div>
        )}
      </div>

      {/* Staggered Tech Stack Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
        {badges.map((b, i) => {
          const badgeSpring = spring({
            frame: frame - (45 + i * 8),
            fps,
            config: { damping: 14, stiffness: 140 },
          });

          if (frame < 45 + i * 8) return null;

          return (
            <div
              key={b.label}
              style={{
                transform: `scale(${Math.max(0, badgeSpring)})`,
                opacity: Math.min(1, badgeSpring),
                padding: "3px 8px",
                borderRadius: 4,
                backgroundColor: "#181920",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: 10,
                color: b.color,
                fontWeight: 600,
              }}
            >
              + {b.label}
            </div>
          );
        })}
      </div>

      {/* Bottom Telemetry ticker */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          color: "#71717a",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 8,
          marginTop: 8,
        }}
      >
        <span>STATUS: PROXMOX_LXC_ONLINE</span>
        <span>FRAME: {frame % 150}/150</span>
      </div>
    </div>
  );
};
