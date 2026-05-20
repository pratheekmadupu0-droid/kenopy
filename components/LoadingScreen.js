"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShouldShow(false);
            if (onComplete) onComplete();
          }, 850);
          return 100;
        }
        const diff = Math.floor(Math.random() * 18) + 6;
        return Math.min(prev + diff, 100);
      });
    }, 110);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05100d] text-[#efeae2]"
          exit={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 100%)",
            transition: { duration: 1.15, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Tech Grid Grid lines overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="w-full h-full bg-[linear-gradient(to_right,#efeae2_1px,transparent_1px),linear-gradient(to_bottom,#efeae2_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
          </div>

          <div className="flex flex-col items-center gap-4 relative z-10">
            {/* Premium 3D Geo Emblem */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3.5 mb-2"
            >
              <div className="w-9 h-9 rounded-tr-[18px] rounded-bl-[18px] bg-gradient-to-tr from-[#a07855] via-[#a07855] to-[#efeae2] relative shadow-[0_0_24px_rgba(160,120,85,0.35)]">
                <div className="absolute inset-0.5 rounded-tr-[16px] rounded-bl-[16px] bg-[#05100d] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-tr-lg rounded-bl-lg bg-[#a07855]" />
                </div>
              </div>
              <span className="font-space tracking-[0.55em] text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#efeae2] via-[#efeae2] to-[#a07855]/70">
                Kanopy
              </span>
            </motion.div>

            {/* Glowing Percent Loader */}
            <div className="h-28 overflow-hidden flex items-center justify-center">
              <motion.span 
                key={progress}
                initial={{ y: 55, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -55, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="font-space text-8xl font-extralight tracking-tighter tabular-nums text-[#a07855]"
              >
                {String(progress).padStart(3, "0")}
              </motion.span>
              <span className="font-space text-2xl font-light text-[#efeae2]/25 ml-1.5 self-end mb-3.5">%</span>
            </div>

            {/* Quote Reveal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 0.25 }}
              className="font-inter text-[10px] tracking-[0.35em] uppercase text-center text-[#efeae2] max-w-xs mt-3"
            >
              Architectural Sanctuaries in Wild Spaces
            </motion.p>
          </div>

          {/* Luxury loading stripe */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#efeae2]/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#a07855] to-[#efeae2]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
