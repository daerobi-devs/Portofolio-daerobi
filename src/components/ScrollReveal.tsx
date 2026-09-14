"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  amount?: number | "some" | "all";
  duration?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = false,
  amount = 0.15,
  duration = 0.65,
}: ScrollRevealProps) {
  const initialY = direction === "up" ? 36 : direction === "down" ? -36 : 0;
  const initialX = direction === "left" ? 36 : direction === "right" ? -36 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount, margin: "-30px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
