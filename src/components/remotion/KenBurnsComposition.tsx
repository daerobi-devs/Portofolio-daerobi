"use client";

import React from "react";
import { interpolate, useCurrentFrame, Img } from "remotion";

export interface KenBurnsProps {
  imageSrc: string;
  title: string;
  techStack?: string[];
  projectId?: string;
}

export const KenBurnsComposition: React.FC<KenBurnsProps> = ({
  imageSrc,
  title,
  techStack = [],
  projectId = "PROJ",
}) => {
  const frame = useCurrentFrame();

  // Smooth cinematic Ken Burns: subtle scale from 1.0 to 1.07 and subtle drift
  const scale = interpolate(frame, [0, 150], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 150], [0, -12], {
    extrapolateRight: "clamp",
  });

  const hudOpacity = interpolate(frame, [0, 15], [0, 1], {
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
      {/* Zooming and drifting image */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center top",
          transition: "transform 0.05s linear",
        }}
      >
        <Img
          src={imageSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </div>

      {/* Subtle vignette gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(12,13,16,0.3) 0%, rgba(12,13,16,0.1) 40%, rgba(12,13,16,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Technical HUD Overlay rendered live in Remotion */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: hudOpacity,
          padding: "3px 8px",
          background: "rgba(12,13,16,0.8)",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 4,
          fontSize: 10,
          color: "#f59e0b",
          letterSpacing: "0.05em",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: "#10b981",
          }}
        />
        <span>REMOTION LIVE // {projectId.toUpperCase()}</span>
      </div>

      {/* Bottom Technical Tag */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 12,
          right: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: hudOpacity,
          fontSize: 10,
          color: "#a1a1aa",
          letterSpacing: "0.02em",
        }}
      >
        <span style={{ fontWeight: 600, color: "#f4f4f5" }}>{title}</span>
        <span>FRAME: {frame}/150</span>
      </div>
    </div>
  );
};
