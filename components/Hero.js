"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-start overflow-hidden px-6 md:px-12 pt-20">
      
      {/* Background Cinematic Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05100d] via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05100d]/90 via-[#05100d]/30 to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col justify-center min-h-[calc(100vh-80px)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col gap-6"
        >
          {/* Subtitle Accent */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a07855] animate-ping" />
            <span className="font-space text-xs md:text-sm tracking-[0.4em] uppercase text-[#a07855] font-semibold">
              Now Open for Bookings
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-space text-5xl md:text-8xl font-bold tracking-tight text-[#efeae2] leading-[1.05]"
          >
            Sanctuaries <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efeae2] via-[#efeae2] to-[#a07855]/70">
              in the wild.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="font-inter text-sm md:text-lg text-[#efeae2]/65 max-w-xl leading-relaxed tracking-wide font-light"
          >
            Immerse yourself in a luxurious glass-wooden retreat nestled in deep forest mist. Architectural design meets raw, untamed wilderness.
          </motion.p>

          {/* Call-to-Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="#booking"
              className="px-8 py-4 rounded-full font-space text-[10px] tracking-[0.25em] uppercase font-bold bg-[#a07855] text-[#05100d] hover:bg-[#efeae2] hover:text-[#05100d] transition-all duration-300 shadow-[0_12px_24px_rgba(160,120,85,0.2)] flex items-center gap-2 hover-magnetic"
            >
              Book Retreat <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#featured"
              className="px-8 py-4 rounded-full font-space text-[10px] tracking-[0.25em] uppercase font-semibold border border-[#efeae2]/20 text-[#efeae2] hover:bg-[#efeae2]/5 hover:border-[#efeae2] transition-all duration-300 flex items-center gap-2 hover-magnetic"
            >
              Explore Huts
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.7 }}
          className="font-inter text-[9px] tracking-[0.3em] uppercase text-[#efeae2] font-light"
        >
          Scroll to explore
        </motion.span>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.9, 
            duration: 0.6, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          className="w-5 h-8 rounded-full border border-[#efeae2]/30 flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#a07855] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
