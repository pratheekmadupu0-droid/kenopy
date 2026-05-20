"use client";

import { motion } from "framer-motion";
import { Flame, Wind, Droplets, Sun, Sparkles, Coffee } from "lucide-react";

export default function Amenities() {
  const list = [
    {
      title: "Geothermal Heating",
      desc: "Warmth sourced from the earth, running through custom oak floorboards.",
      icon: <Flame className="w-6 h-6 text-[#a07855]" />,
    },
    {
      title: "Pure Mountain Air",
      desc: "HEPA-13 active fresh air exchange maintaining natural humidity.",
      icon: <Wind className="w-6 h-6 text-[#a07855]" />,
    },
    {
      title: "Natural Hot Spring Tub",
      desc: "Private spring-fed cedar soaking tub warmed to exactly 104°F.",
      icon: <Droplets className="w-6 h-6 text-[#a07855]" />,
    },
    {
      title: "Tesla Solar Roof",
      desc: "Independent power grid with Powerwall storage for zero interruptions.",
      icon: <Sun className="w-6 h-6 text-[#a07855]" />,
    },
    {
      title: "Volumetric Skylights",
      desc: "Architectural ceiling glass optimized for stargazing and aurora viewing.",
      icon: <Sparkles className="w-6 h-6 text-[#a07855]" />,
    },
    {
      title: "Organic Forest Roast",
      desc: "Complimentary single-origin espresso and local botanical tea blends.",
      icon: <Coffee className="w-6 h-6 text-[#a07855]" />,
    },
  ];

  return (
    <section id="amenities" className="relative w-full py-24 md:py-32 bg-[#05100d] overflow-hidden px-6 md:px-12 border-t border-[#efeae2]/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-xl mb-16 md:mb-24">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-[1px] bg-[#a07855]" />
            <span className="font-space text-xs tracking-[0.3em] uppercase text-[#a07855] font-semibold">
              The Conveniences of Refinement
            </span>
          </div>
          <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tight text-[#efeae2] leading-tight">
            Curated comfort.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {list.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative p-6 md:p-8 rounded-2xl border border-[#efeae2]/5 bg-[#091b15]/20 backdrop-blur-sm group hover:border-[#a07855]/30 hover:bg-[#091b15]/40 transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Top Row */}
              <div className="w-12 h-12 rounded-xl bg-[#05100d] flex items-center justify-center mb-6 border border-[#efeae2]/5 group-hover:border-[#a07855]/30 group-hover:scale-110 transition-all duration-500">
                {item.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="font-space text-lg font-bold text-[#efeae2] mb-2">
                {item.title}
              </h3>
              <p className="font-inter text-xs md:text-sm text-[#efeae2]/65 leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
