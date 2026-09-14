"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GitHubIcon, InstagramIcon } from "./Icons";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0e12] border-b border-[#1f2128]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Ornate Circular Monogram Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 border border-white/20">
            <Image
              src="/dr-logo.png"
              alt="Daerobi Monogram Logo"
              width={36}
              height={36}
              priority
              className="object-cover w-full h-full"
            />
          </div>
          <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest text-neutral-300 group-hover:text-white transition-colors">
            Daerobi
          </span>
        </a>

        {/* Center Minimalist Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs lowercase font-medium tracking-wider text-neutral-400">
          <a href="#about" className="hover:text-white transition-colors">
            about
          </a>
          <a href="#journey" className="hover:text-white transition-colors">
            journey
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors">
            portfolio
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            skills
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            contact
          </a>
        </nav>

        {/* Right Social Links */}
        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <a
            href="https://github.com/daerobi-devs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="GitHub"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/dae.obiy?stkn=MTJxNGZ3YzBiYzdwcw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/6285123607711"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-neutral-200 hover:bg-white hover:text-black transition-all font-mono"
          >
            say hello
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-neutral-300 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0e12] border-b border-[#1f2128] px-6 py-6 flex flex-col gap-4 text-center">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white text-sm lowercase py-1"
          >
            about
          </a>
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white text-sm lowercase py-1"
          >
            journey
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white text-sm lowercase py-1"
          >
            portfolio
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white text-sm lowercase py-1"
          >
            skills
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white text-sm lowercase py-1"
          >
            contact
          </a>
          <div className="flex items-center justify-center gap-4 pt-3 border-t border-neutral-800">
            <a
              href="https://github.com/daerobi-devs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/6285123607711"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-1.5 rounded-full bg-white text-black font-semibold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
