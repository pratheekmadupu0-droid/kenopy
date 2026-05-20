"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#05100d] border-t border-[#efeae2]/5 pt-20 pb-10 px-6 md:px-12 overflow-hidden">
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#efeae2_1px,transparent_1px),linear-gradient(to_bottom,#efeae2_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-[#efeae2]/5">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-tr-xl rounded-bl-xl bg-gradient-to-tr from-[#a07855] to-[#efeae2] relative">
                <div className="absolute inset-[1.5px] rounded-tr-xl rounded-bl-xl bg-[#05100d] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-tr-md rounded-bl-md bg-[#a07855]" />
                </div>
              </div>
              <span className="font-space tracking-[0.45em] text-lg font-bold uppercase text-[#efeae2]">
                Kanopy
              </span>
            </a>
            <p className="font-inter text-xs md:text-sm text-[#efeae2]/50 leading-relaxed font-light max-w-sm">
              Spatially integrated modular sanctuaries designed for minimal ecological footprints and absolute luxury.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-[#efeae2]/10 flex items-center justify-center text-[#efeae2]/60 hover:text-[#a07855] hover:border-[#a07855] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-[#efeae2]/10 flex items-center justify-center text-[#efeae2]/60 hover:text-[#a07855] hover:border-[#a07855] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-[#efeae2]/10 flex items-center justify-center text-[#efeae2]/60 hover:text-[#a07855] hover:border-[#a07855] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-5 md:pl-8">
            <span className="font-space text-[10px] tracking-widest uppercase text-[#a07855] font-semibold">Coordinates</span>
            <nav className="flex flex-col gap-3 font-inter text-xs text-[#efeae2]/60 font-light">
              <a href="#featured" className="hover:text-[#efeae2] transition-colors flex items-center gap-1.5">
                The Canopy <ArrowUpRight className="w-3 h-3 text-[#a07855]" />
              </a>
              <a href="#featured" className="hover:text-[#efeae2] transition-colors flex items-center gap-1.5">
                Obsidian Lounge <ArrowUpRight className="w-3 h-3 text-[#a07855]" />
              </a>
              <a href="#featured" className="hover:text-[#efeae2] transition-colors flex items-center gap-1.5">
                Solitude Dome <ArrowUpRight className="w-3 h-3 text-[#a07855]" />
              </a>
            </nav>
          </div>

          {/* Newsletter Form */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-5">
            <span className="font-space text-[10px] tracking-widest uppercase text-[#a07855] font-semibold">Join the Dispatch</span>
            <p className="font-inter text-xs text-[#efeae2]/50 font-light leading-relaxed">
              Subscribe to receive coordinates to our newest modular installations before they open.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2.5">
              <input
                type="email"
                required
                placeholder={subscribed ? "Thank you for subscribing." : "Enter your email"}
                disabled={subscribed}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#091b15]/60 border border-[#efeae2]/10 rounded-xl px-4 py-3 font-inter text-xs text-[#efeae2] focus:outline-none focus:border-[#a07855]/70 disabled:opacity-75 disabled:text-[#bfff44]"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-6 py-3 rounded-xl bg-[#efeae2] text-[#05100d] font-space text-[10px] tracking-widest uppercase font-bold hover:bg-[#a07855] hover:text-[#05100d] transition-all duration-300 disabled:bg-[#091b15] disabled:text-[#bfff44] disabled:border disabled:border-[#efeae2]/5"
              >
                Send
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <span className="font-inter text-[10px] tracking-widest text-[#efeae2]/30 uppercase">
            © {new Date().getFullYear()} KANOPY INC. ALL RIGHTS RESERVED.
          </span>
          
          {/* Scroll to top */}
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 text-[#efeae2]/40 hover:text-[#efeae2] transition-colors py-1 group"
          >
            <span className="font-space text-[10px] tracking-widest uppercase">Back to Zenith</span>
            <div className="w-7 h-7 rounded-full border border-[#efeae2]/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
