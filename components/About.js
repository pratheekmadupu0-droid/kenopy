"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref} className="font-space tabular-nums">{count}</span>;
}

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-[#05100d] overflow-hidden px-6 md:px-12 border-t border-[#efeae2]/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-8 h-[1px] bg-[#a07855]" />
                <span className="font-space text-xs tracking-[0.3em] uppercase text-[#a07855] font-semibold">
                  Wilderness Refined
                </span>
              </div>
              <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tight text-[#efeae2] leading-tight">
                Where luxury <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efeae2] to-[#a07855]/70">
                  dissolves.
                </span>
              </h2>
            </div>

            <p className="font-inter text-sm md:text-base text-[#efeae2]/70 leading-relaxed font-light">
              We design modular eco-sanctuaries that float above forest ecosystems. By combining luxury sustainable architecture with premium interactive off-grid technology, Kanopy crafts experiences that restore the soul and respect the environment.
            </p>

            <p className="font-inter text-sm md:text-base text-[#efeae2]/70 leading-relaxed font-light">
              Our retreats are built off-site with minimal environmental footprint, then gently lowered into pristine wilderness locations using custom hover rigging systems.
            </p>

            {/* Premium Stat Counter Dashboard */}
            <div className="grid grid-cols-3 gap-6 border-t border-[#efeae2]/10 pt-8 mt-4">
              <div className="flex flex-col">
                <span className="font-space text-3xl md:text-4xl font-bold text-[#efeae2]">
                  <Counter value="98" />%
                </span>
                <span className="font-inter text-[10px] tracking-widest uppercase text-[#efeae2]/50 mt-1">
                  Eco-Certified
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space text-3xl md:text-4xl font-bold text-[#efeae2]">
                  <Counter value="12" />
                </span>
                <span className="font-inter text-[10px] tracking-widest uppercase text-[#efeae2]/50 mt-1">
                  Sanctuaries
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space text-3xl md:text-4xl font-bold text-[#efeae2]">
                  <Counter value="24" />/7
                </span>
                <span className="font-inter text-[10px] tracking-widest uppercase text-[#efeae2]/50 mt-1">
                  Concierge
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Reveal Column */}
          <div className="lg:col-span-6 relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden group border border-[#efeae2]/10 bg-[#091b15]">
            <Image
              src="/images/hut3.png"
              alt="Misty sanctuary"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
            />
            {/* Cinematic Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05100d]/90 via-[#05100d]/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#05100d]/60 backdrop-blur-md border border-[#efeae2]/5 flex items-center justify-between">
              <div>
                <span className="font-space text-[10px] tracking-widest uppercase text-[#a07855] block">Location Coordinates</span>
                <span className="font-space text-xs text-[#efeae2] font-semibold tracking-wider">47.6062° N, 122.3321° W</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#bfff44] animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
