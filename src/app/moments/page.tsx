"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import initialData from "../../../data/moments.json";

interface MomentItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  location: string;
  image: string;
  aspectRatio?: string;
  aspectRatioValue?: string;
  aspectClass?: string;
  colSpan?: string;
  caption: string;
}

interface MomentsSettings {
  showBottomBar: boolean;
  showCategories: boolean;
  title: string;
  subtitle: string;
  description: string;
}

export default function MomentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedMoment, setSelectedMoment] = useState<MomentItem | null>(null);
  const [moments, setMoments] = useState<MomentItem[]>(initialData.moments || []);
  const [settings, setSettings] = useState<MomentsSettings>(
    initialData.settings || {
      showBottomBar: true,
      showCategories: true,
      title: "Moments & Chronicles",
      subtitle: "Life Beyond The Screen",
      description:
        "Koleksi visual perjalanan, ketahanan fisik di jalan raya, eksplorasi perangkat keras homelab, dan fragmen cerita personal di luar kode.",
    }
  );

  // Sync real-time on mount with cache: 'no-store'
  useEffect(() => {
    fetch(`/api/moments?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.moments) setMoments(data.moments);
          if (data.settings) setSettings(data.settings);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch fresh moments data", err);
      });
  }, []);

  // Dynamically extract unique categories from moments data
  const categories = useMemo(() => {
    const list = [{ key: "all", label: "all" }];
    const uniqueKeys = Array.from(
      new Set(
        moments
          .map((m) => m.category?.trim().toLowerCase())
          .filter((c): c is string => Boolean(c))
      )
    );

    for (const key of uniqueKeys) {
      const match = moments.find(
        (m) => m.category?.trim().toLowerCase() === key
      );
      list.push({
        key,
        label: match?.categoryLabel || key,
      });
    }

    return list;
  }, [moments]);

  const filteredMoments = useMemo(() => {
    if (activeCategory === "all") return moments;
    return moments.filter(
      (m) => m.category?.trim().toLowerCase() === activeCategory
    );
  }, [moments, activeCategory]);

  // Helper to get CSS aspectRatio
  const getAspectRatioStyle = (moment: MomentItem) => {
    if (moment.aspectRatioValue && moment.aspectRatioValue !== "auto") {
      return moment.aspectRatioValue;
    }
    if (moment.aspectRatio === "1:1") return "1 / 1";
    if (moment.aspectRatio === "4:5") return "4 / 5";
    if (moment.aspectRatio === "5:4") return "5 / 4";
    if (moment.aspectRatio === "3:4") return "3 / 4";
    if (moment.aspectRatio === "4:3") return "4 / 3";
    if (moment.aspectRatio === "9:16") return "9 / 16";
    if (moment.aspectRatio === "16:9") return "16 / 9";
    if (moment.aspectRatio === "16:10") return "16 / 10";
    if (moment.aspectRatio === "2:3") return "2 / 3";
    if (moment.aspectRatio === "3:2") return "3 / 2";
    if (moment.aspectRatio === "2:1") return "2 / 1";
    return "4 / 3";
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white pb-28">
      {/* Top Minimalist Header */}
      <div className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-mono lowercase tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            ← back to portfolio
          </Link>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
            moments / visual journal
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 sm:pt-20">
        {/* Title Section (Pure Clean Typography, Zero Icons) */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-2">
            {settings.subtitle || "Life Beyond The Screen"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
            {settings.title || "Moments & Chronicles"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
            {settings.description ||
              "Koleksi visual perjalanan, ketahanan fisik di jalan raya, eksplorasi perangkat keras homelab, dan fragmen cerita personal di luar kode."}
          </p>
        </div>

        {/* Filter Categories Bar (Conditionally displayed, Zero Icons, Dynamic categories) */}
        {settings.showCategories && categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-200/60">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono lowercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-neutral-900 text-white font-semibold shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
            <span className="ml-auto text-xs font-mono text-neutral-400 hidden sm:inline-block">
              {filteredMoments.length} frames
            </span>
          </div>
        )}

        {/* 3-Column Visual Grid (Items arranged Left, Center, Right in exact sequence) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredMoments.map((moment) => (
            <div
              key={moment.id}
              onClick={() => setSelectedMoment(moment)}
              className={`group relative rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-100 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                moment.colSpan === "col-span-2"
                  ? "sm:col-span-2"
                  : moment.colSpan === "col-span-full"
                  ? "sm:col-span-2 lg:col-span-3"
                  : "col-span-1"
              }`}
            >
              {/* Photo Image Container with Native CSS aspect-ratio */}
              <div
                className="relative w-full overflow-hidden bg-neutral-200"
                style={{ aspectRatio: getAspectRatioStyle(moment) }}
              >
                <Image
                  src={moment.image}
                  alt={moment.title || "Daerobi moment photo"}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dark Editorial Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300 tracking-wider">
                      <span>{moment.categoryLabel || moment.category || "Moment"}</span>
                      {moment.date && <span>{moment.date}</span>}
                    </div>
                    {moment.title && (
                      <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                        {moment.title}
                      </h3>
                    )}
                    {moment.location && !moment.title && (
                      <h3 className="text-sm font-semibold text-white tracking-tight">
                        {moment.location}
                      </h3>
                    )}
                    {moment.caption && (
                      <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed pt-1">
                        {moment.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Minimal Card Base Info (Only displayed if settings.showBottomBar is true AND there is title/location) */}
              {settings.showBottomBar && (moment.title || moment.location) && (
                <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    {moment.title && (
                      <h4 className="text-xs font-bold text-neutral-800 tracking-tight">
                        {moment.title}
                      </h4>
                    )}
                    {moment.location && (
                      <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        {moment.location}
                      </p>
                    )}
                  </div>
                  {moment.date && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-500 font-semibold border border-neutral-200/50 shrink-0 ml-2">
                      {moment.date}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Full Screen View, Clean Typography, Zero Icons) */}
      <AnimatePresence>
        {selectedMoment && (
          <div
            onClick={() => setSelectedMoment(null)}
            className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
                    {selectedMoment.title || selectedMoment.location || "Moment"}
                  </h3>
                  {(selectedMoment.location || selectedMoment.date) && (
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">
                      {[selectedMoment.location, selectedMoment.date]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer border border-neutral-200"
                >
                  close [esc]
                </button>
              </div>

              {/* Large Image View */}
              <div className="relative w-full h-[55vh] bg-neutral-900 overflow-hidden">
                <Image
                  src={selectedMoment.image}
                  alt={selectedMoment.title || "Moment photo"}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Caption & Metadata Bar */}
              <div className="p-6 bg-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="font-semibold text-neutral-700">
                    {selectedMoment.categoryLabel || selectedMoment.category || "Moment"}
                  </span>
                  {selectedMoment.location && <span>· {selectedMoment.location}</span>}
                  {selectedMoment.date && <span>· {selectedMoment.date}</span>}
                </div>
                {selectedMoment.caption && (
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {selectedMoment.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
