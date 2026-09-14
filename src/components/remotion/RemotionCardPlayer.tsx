"use client";

import React, { useRef, useState, useEffect } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { KenBurnsComposition } from "./KenBurnsComposition";

interface RemotionCardPlayerProps {
  imageSrc: string;
  title: string;
  projectId: string;
}

export default function RemotionCardPlayer({
  imageSrc,
  title,
  projectId,
}: RemotionCardPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
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
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#0c0d10]">
      {isVisible ? (
        <Player
          ref={playerRef}
          component={KenBurnsComposition}
          inputProps={{
            imageSrc,
            title,
            projectId,
          }}
          durationInFrames={150}
          compositionWidth={1440}
          compositionHeight={900}
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
        <div className="w-full h-full bg-[#0c0d10] flex items-center justify-center">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover object-top opacity-80"
          />
        </div>
      )}
    </div>
  );
}
