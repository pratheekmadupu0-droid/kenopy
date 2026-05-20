"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Retreats", href: "#featured" },
    { name: "Story", href: "#experience" },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.95 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 md:py-6 ${
          scrolled 
            ? "bg-[#05100d]/70 backdrop-blur-xl border-b border-[#efeae2]/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group relative z-50">
            <div className="w-8 h-8 rounded-tr-xl rounded-bl-xl bg-gradient-to-tr from-[#a07855] to-[#efeae2] relative transition-transform duration-500 group-hover:rotate-45">
              <div className="absolute inset-[1.5px] rounded-tr-xl rounded-bl-xl bg-[#05100d] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-tr-md rounded-bl-md bg-[#a07855]" />
              </div>
            </div>
            <span className="font-space tracking-[0.45em] text-lg font-bold uppercase text-[#efeae2] group-hover:text-[#a07855] transition-all">
              Kanopy
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#efeae2]/75 hover:text-[#efeae2] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#a07855] scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA / Booking Trigger */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#booking"
              className="px-6 py-2.5 rounded-full font-space text-[10px] tracking-[0.25em] uppercase border border-[#a07855]/60 text-[#efeae2] hover:bg-[#a07855] hover:text-[#05100d] hover:border-[#a07855] transition-all duration-300 flex items-center gap-2 hover-magnetic"
            >
              Book Retreat <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#efeae2] p-2 hover:text-[#a07855] transition-colors relative z-50"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Screen Overlay Menu for Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(30px at calc(100% - 40px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(30px at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#05100d] flex flex-col justify-between p-8 pt-28"
          >
            {/* Tech grid overlay inside overlay menu */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
              <div className="w-full h-full bg-[linear-gradient(to_right,#efeae2_1px,transparent_1px),linear-gradient(to_bottom,#efeae2_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            </div>

            <div className="flex flex-col gap-8 relative z-10">
              <span className="font-space text-xs tracking-[0.4em] uppercase text-[#efeae2]/30">Navigation</span>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.a
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.1, duration: 0.4 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-space text-3xl font-light tracking-wide text-[#efeae2] hover:text-[#a07855] transition-colors py-2"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="w-full py-4 rounded-full font-space text-center text-xs tracking-[0.25em] uppercase bg-[#a07855] text-[#05100d] font-bold shadow-[0_8px_20px_rgba(160,120,85,0.2)] flex items-center justify-center gap-2"
              >
                Book Retreat <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#efeae2]/40 font-inter">
                <span>© Kanopy Inc.</span>
                <span>Luxury eco sanctuaries</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
