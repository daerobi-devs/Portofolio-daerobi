"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem("dr-intro-shown");
    if (!already) {
      setVisible(true);
      sessionStorage.setItem("dr-intro-shown", "1");
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0e12] pointer-events-none"
          initial={{ y: "0%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.65 }}
          onAnimationComplete={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
            className="flex flex-col items-center gap-3 select-none"
          >
            <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <span className="text-white font-black text-2xl tracking-tight leading-none">DR</span>
            </div>
            <div className="w-16 h-[1px] bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/70 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
