"use client";

import React from "react";
import { GitHubIcon, InstagramIcon } from "./Icons";
import { ChevronUp, Mail, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-white border-t border-neutral-100 py-16 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Adham Dannaway Style Divider */}
        <ScrollReveal>
          <div className="section-divider">
            get in touch
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Let&apos;s build something great together.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Interested in building a modern web application, partnering with Buatin.biz.id, or discussing self-hosted homelab setups? My inbox is always open.
          </p>

          {/* Email Contact Form */}
          <form
            action="mailto:daerobii0223@gmail.com"
            method="POST"
            encType="text/plain"
            className="mt-8 max-w-md mx-auto flex flex-col gap-3 text-left"
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-[11px] font-mono font-medium text-neutral-500 mb-1 uppercase tracking-wider">
                  Nama
                </label>
                <input
                  type="text"
                  name="Nama"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-mono font-medium text-neutral-500 mb-1 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  required
                  placeholder="kamu@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-medium text-neutral-500 mb-1 uppercase tracking-wider">
                Pesan
              </label>
              <textarea
                name="Pesan"
                required
                rows={4}
                placeholder="Ceritain projectmu atau ngobrol santai..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              Kirim Email
            </button>

            <p className="text-[11px] text-neutral-400 text-center font-mono">
              Atau langsung ke · <a href="mailto:daerobii0223@gmail.com" className="underline underline-offset-2 hover:text-neutral-700 transition-colors">daerobii0223@gmail.com</a>
            </p>
          </form>

          {/* Action Contact Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6285123607711"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="https://github.com/daerobi-devs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105"
            >
              <GitHubIcon className="w-4 h-4 text-neutral-700" />
              <span>GitHub Profile</span>
            </a>

            <a
              href="https://www.instagram.com/dae.obiy?stkn=MTJxNGZ3YzBiYzdwcw=="
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4 text-neutral-700" />
              <span>Instagram</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Adham Dannaway Signature Centered Back to Top Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-neutral-200 hover:border-neutral-400 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-neutral-900 shadow-xs transition-all hover:-translate-y-1"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Navigation Links */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs lowercase text-neutral-400">
          <a href="#about" className="hover:text-neutral-900 transition-colors">about</a>
          <span>·</span>
          <a href="#journey" className="hover:text-neutral-900 transition-colors">journey</a>
          <span>·</span>
          <a href="#portfolio" className="hover:text-neutral-900 transition-colors">portfolio</a>
          <span>·</span>
          <a href="#skills" className="hover:text-neutral-900 transition-colors">skills</a>
          <span>·</span>
          <a href="#contact" className="hover:text-neutral-900 transition-colors">contact</a>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-xs text-neutral-400 font-sans">
          © {new Date().getFullYear()} Daerobi. Crafted with clean minimalism, Next.js & Remotion.
        </div>
      </div>
    </footer>
  );
}
