"use client";

import React, { useRef, useState, useEffect } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { ShowcaseComposition } from "./ShowcaseComposition";
import { Play, Pause, RotateCcw, MonitorPlay } from "lucide-react";

export default function ShowcasePlayer() {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          playerRef.current?.play();
          setIsPlaying(true);
        } else {
          playerRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const restart = () => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0);
    playerRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Frame wrapper with technical hairline border */}
      <div className="w-full relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0c0d10] tech-corner shadow-2xl">
        {isVisible ? (
          <Player
            ref={playerRef}
            component={ShowcaseComposition}
            durationInFrames={240}
            compositionWidth={1920}
            compositionHeight={1080}
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
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-[#0f1014]">
            <MonitorPlay className="w-10 h-10 text-amber-500 mb-2 opacity-80" />
            <span className="text-xs font-mono text-slate-400">
              REMOTION ENGINE READY // SCROLL TO PLAY
            </span>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="mt-3 w-full flex items-center justify-between px-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18191f] border border-white/10 hover:border-amber-500/40 text-slate-200 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={restart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18191f] border border-white/10 hover:border-white/20 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>RESTART</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>REAL-TIME DOM CANVAS // 30 FPS</span>
        </div>
      </div>
    </div>
  );
}
