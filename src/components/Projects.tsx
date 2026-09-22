"use client";

import React, { useState } from "react";
import Image from "next/image";
import projectsData from "../../data/projects.json";
import { GitHubIcon } from "./Icons";
import { ExternalLink, ArrowUpRight, Globe, X, Layers } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TechBadge from "./TechBadge";

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState<any | null>(null);
  const projects = projectsData.projects;

  return (
    <section id="portfolio" className="py-20 px-6 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 block mb-2">
              Featured Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Selected Digital Products
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-lg mx-auto mt-2 leading-relaxed">
              Real-world production applications designed with precision, modern tech stacks, and self-hosted infrastructure.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean White Cards Grid (Matching Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {projects.map((proj: any, index: number) => (
            <ScrollReveal key={proj.id} delay={(index % 2) * 0.12}>
              <div
                className="group relative bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-soft hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
              >
                {/* 1. Top Screenshot Area (Pristine High-Res) */}
                <div
                  onClick={() => setActiveModalProject(proj)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100 cursor-pointer"
                  title="Click to view full screenshot gallery"
                >
                  <Image
                    src={proj.screenshot}
                    alt={proj.nama}
                    fill
                    priority={index < 2}
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />

                  {/* Top-Right Pill Badge: 🌐 Live */}
                  <a
                    href={proj.link_live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3.5 right-3.5 z-10 px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white backdrop-blur-md text-xs font-medium flex items-center gap-1.5 shadow-md border border-white/20 transition-all hover:scale-105"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live</span>
                  </a>

                  {/* Subtle hover gradient sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* 2. Card Content Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Header Row: Title & Arrow */}
                    <div className="flex items-start justify-between gap-3">
                      <a
                        href={proj.link_live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title inline-flex items-center gap-1.5"
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover/title:text-blue-600 transition-colors tracking-tight">
                          {proj.nama}
                        </h3>
                      </a>

                      <a
                        href={proj.link_live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
                        title="Open Live Website"
                      >
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>

                    {/* Tagline Subtitle */}
                    {proj.tagline && (
                      <p className="mt-1 text-xs font-medium text-neutral-400">
                        {proj.tagline}
                      </p>
                    )}

                    {/* Description Paragraph */}
                    <p className="mt-3.5 text-sm text-neutral-600 leading-relaxed">
                      {proj.deskripsi_singkat}
                    </p>
                  </div>

                  {/* Tech Stack Badges with Official Brand SVG Icons */}
                  <div className="mt-6 flex flex-wrap gap-1.5 pt-1">
                    {proj.tech_stack.map((tech: string) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal Lightbox for Full Project Screenshots */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-neutral-200"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-neutral-900">{activeModalProject.nama}</h4>
                  <p className="text-xs text-neutral-500 font-mono">{activeModalProject.link_live}</p>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Screenshots */}
              <div className="overflow-y-auto p-6 max-h-[calc(90vh-130px)] space-y-6">
                <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                  <Image
                    src={activeModalProject.screenshot_full || activeModalProject.screenshot}
                    alt={`Full Screenshot ${activeModalProject.nama}`}
                    width={1440}
                    height={1800}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {activeModalProject.screenshots_extra && activeModalProject.screenshots_extra.length > 0 && (
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5 font-semibold">
                      <Layers className="w-3.5 h-3.5 text-neutral-600" />
                      Sub-pages & Mobile Views:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeModalProject.screenshots_extra.map((shot: string, idx: number) => (
                        <div key={idx} className="rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                          <Image
                            src={shot}
                            alt={`Subpage ${idx}`}
                            width={1440}
                            height={900}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 flex justify-end">
                <a
                  href={activeModalProject.link_live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center gap-2 shadow-sm"
                >
                  <span>Open Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
