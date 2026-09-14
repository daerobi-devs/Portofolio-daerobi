"use client";

import React, { useRef, useState, useEffect } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { HeroIntroComposition } from "./HeroIntroComposition";

export default function HeroRemotionPlayer() {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          playerRef.current?.play();
        } else {
          playerRef.current?.pause();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-lg h-44 rounded-lg overflow-hidden my-4 shadow-xl">
      {isVisible ? (
        <Player
          ref={playerRef}
          component={HeroIntroComposition}
          durationInFrames={150}
          compositionWidth={520}
          compositionHeight={176}
          fps={30}
          loop
          autoPlay
          controls={false}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <div className="w-full h-full bg-[#0f1015] border border-white/5 rounded-lg flex items-center justify-center font-mono text-xs text-stone-500">
          REMOTION INTRO ENGINE READY
        </div>
      )}
    </div>
  );
}
