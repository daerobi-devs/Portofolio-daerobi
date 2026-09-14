"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { Code2, Server, Database } from "lucide-react";
import {
  NextJsIcon,
  ReactIcon,
  TypeScriptIcon,
  TailwindIcon,
  Html5Icon,
  NodeJsIcon,
  WhatsAppIcon,
  SupabaseIcon,
  ProxmoxIcon,
  CoolifyIcon,
  DockerIcon,
  CloudflareIcon,
  UbuntuIcon,
  RestApiIcon,
  AuthShieldIcon,
} from "./TechIcons";

interface SkillItem {
  name: string;
  detail: string;
  badge: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: SkillItem[];
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend & Web Craft",
      icon: <Code2 className="w-5 h-5 text-neutral-900" />,
      description: "Developing responsive, clean, and high-performance user interfaces with modern React frameworks.",
      skills: [
        {
          name: "Next.js 15",
          detail: "App Router & Fullstack SSR",
          badge: "v15",
          icon: <NextJsIcon className="w-5 h-5" />,
        },
        {
          name: "React 19",
          detail: "Modern Hooks & UI State",
          badge: "v19",
          icon: <ReactIcon className="w-5 h-5" />,
        },
        {
          name: "TypeScript",
          detail: "Strict Type Safety & Schemas",
          badge: "v5.7",
          icon: <TypeScriptIcon className="w-5 h-5" />,
        },
        {
          name: "Tailwind CSS",
          detail: "Design System & Clean Tokens",
          badge: "v3.4",
          icon: <TailwindIcon className="w-5 h-5" />,
        },
        {
          name: "HTML5 & Modern CSS",
          detail: "Semantics & Responsive Layouts",
          badge: "Core",
          icon: <Html5Icon className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Backend & Automation",
      icon: <Database className="w-5 h-5 text-neutral-900" />,
      description: "Building scalable backend services, WhatsApp AI gateways, and clean relational database schemas.",
      skills: [
        {
          name: "Node.js & Express",
          detail: "API Engines & Async Services",
          badge: "Runtime",
          icon: <NodeJsIcon className="w-5 h-5" />,
        },
        {
          name: "Baileys WhatsApp API",
          detail: "Bot Automation & Gateways",
          badge: "Gateway",
          icon: <WhatsAppIcon className="w-5 h-5" />,
        },
        {
          name: "Supabase & Postgres",
          detail: "Relational Tables & RLS Policies",
          badge: "Database",
          icon: <SupabaseIcon className="w-5 h-5" />,
        },
        {
          name: "RESTful APIs",
          detail: "Clean Endpoints & Webhooks",
          badge: "Endpoints",
          icon: <RestApiIcon className="w-5 h-5" />,
        },
        {
          name: "Authentication & Security",
          detail: "JWT, Session Flow & Auth Guards",
          badge: "Security",
          icon: <AuthShieldIcon className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Homelab & Infrastructure",
      icon: <Server className="w-5 h-5 text-neutral-900" />,
      description: "Operating physical mini PC servers at home with virtualized containers and self-hosted orchestrators.",
      skills: [
        {
          name: "Proxmox VE",
          detail: "Type-1 Hypervisor (LXC & VM)",
          badge: "Virtualization",
          icon: <ProxmoxIcon className="w-5 h-5" />,
        },
        {
          name: "Coolify Orchestration",
          detail: "Self-Hosted PaaS & Auto-Deploy",
          badge: "Orchestration",
          icon: <CoolifyIcon className="w-5 h-5" />,
        },
        {
          name: "Docker & Compose",
          detail: "Isolated Multi-Service Stacks",
          badge: "Containers",
          icon: <DockerIcon className="w-5 h-5" />,
        },
        {
          name: "Cloudflare Tunnels",
          detail: "Secure Zero-Trust Public Routes",
          badge: "Networking",
          icon: <CloudflareIcon className="w-5 h-5" />,
        },
        {
          name: "Linux (Ubuntu / Debian)",
          detail: "Server Admin & Shell Management",
          badge: "OS",
          icon: <UbuntuIcon className="w-5 h-5" />,
        },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-[#fafafa] border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        {/* Adham Dannaway Signature Section Divider */}
        <ScrollReveal>
          <div className="section-divider">
            skills & homelab stack
          </div>
          <p className="text-center text-sm text-neutral-500 max-w-xl mx-auto -mt-4 mb-14 leading-relaxed">
            The core tools, languages, and self-hosted infrastructure I use on a daily basis.
          </p>
        </ScrollReveal>

        {/* 3 Clean Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {skillCategories.map((cat, idx) => (
            <ScrollReveal key={cat.title} delay={idx * 0.12}>
              <div className="group bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-soft hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between h-full">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-900 group-hover:scale-105 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300 shadow-2xs">
                      {React.cloneElement(cat.icon as React.ReactElement<{ className?: string }>, {
                        className: "w-5 h-5 transition-colors duration-300",
                      })}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Authentic Original Brand Tech Stack List */}
                  <div className="pt-4 border-t border-neutral-100 space-y-1.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/item flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50/90 border border-transparent hover:border-neutral-200/70 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Brand Logo Container */}
                          <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-200/60 group-hover/item:border-neutral-300 group-hover/item:bg-white flex items-center justify-center shrink-0 shadow-2xs transition-all duration-200">
                            <span className="group-hover/item:scale-110 transition-transform duration-200 inline-flex items-center justify-center">
                              {skill.icon}
                            </span>
                          </div>

                          {/* Tech Name & Role Detail */}
                          <div className="truncate">
                            <h4 className="text-xs sm:text-[13px] font-semibold text-neutral-800 group-hover/item:text-neutral-950 transition-colors truncate">
                              {skill.name}
                            </h4>
                            <p className="text-[10.5px] text-neutral-600 truncate leading-tight mt-0.5">
                              {skill.detail}
                            </p>
                          </div>
                        </div>

                        {/* Tech Role / Version Pill */}
                        <span className="ml-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-neutral-100/80 text-neutral-600 border border-neutral-200/50 group-hover/item:bg-white group-hover/item:text-neutral-700 group-hover/item:border-neutral-300 shrink-0 transition-colors">
                          {skill.badge}
                        </span>
                      </div>
                    ))}
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
