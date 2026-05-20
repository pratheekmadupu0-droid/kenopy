"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Flame, ShieldCheck } from "lucide-react";

export default function ImmersiveExperience() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress to horizontal translation (3 pages -> 0% to -66.67%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.67%"]);

  const stories = [
    {
      num: "01",
      title: "The Design Ethos",
      tagline: "Spatially Integrated Architecture",
      desc: "Every sanctuary is conceived to respond to the natural contours of the land. We do not flatten the earth; we suspend ourselves above it, blending modern glass and steel with weathered cedar.",
      icon: <Compass className="w-12 h-12 text-[#a07855]/70" />,
      bg: "bg-[#091b15]",
    },
    {
      num: "02",
      title: "Absolute Isolation",
      tagline: "Off-Grid coordinates",
      desc: "Located miles away from the nearest settlements, our sanctuaries offer pure silence. No roadways, no ambient city glow. Just the primeval sound of rustling fir trees and crackling fireplaces.",
      icon: <Flame className="w-12 h-12 text-[#a07855]/70" />,
      bg: "bg-[#0d1612]",
    },
    {
      num: "03",
      title: "Sustainable Footprint",
      tagline: "Eco-Futuristic Mechanics",
      desc: "Engineered with carbon-negative structural timber, state-of-the-art closed-loop water filtration systems, and custom solar roofs that power high-efficiency geothermal heating elements.",
      icon: <ShieldCheck className="w-12 h-12 text-[#a07855]/70" />,
      bg: "bg-[#08110e]",
    },
  ];

  return (
    <section 
      ref={targetRef} 
      id="experience" 
      className="relative h-[300vh] bg-[#05100d] border-t border-[#efeae2]/5"
    >
      {/* Sticky container matching screen viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* Slider panel track */}
        <motion.div style={{ x }} className="flex w-[300vw] h-full">
          {stories.map((story) => (
            <div
              key={story.num}
              className={`w-screen h-full flex flex-col justify-center px-6 md:px-24 relative ${story.bg}`}
            >
              {/* Subtle Tech Grid overlay */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,#efeae2_1px,transparent_1px),linear-gradient(to_bottom,#efeae2_1px,transparent_1px)] bg-[size:4rem_4rem]" />
              </div>

              <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-12 relative z-10">
                {/* Panel number watermark */}
                <div className="col-span-1 md:col-span-3">
                  <span className="font-space text-8xl md:text-[11rem] font-bold text-[#a07855]/20 leading-none block">
                    {story.num}
                  </span>
                </div>

                {/* Content description */}
                <div className="col-span-1 md:col-span-9 flex flex-col gap-5 md:gap-6">
                  {story.icon}
                  <div>
                    <span className="font-space text-xs tracking-[0.3em] uppercase text-[#a07855] font-semibold mb-2 block">
                      {story.tagline}
                    </span>
                    <h3 className="font-space text-4xl md:text-6xl font-bold text-[#efeae2] tracking-tight">
                      {story.title}
                    </h3>
                  </div>
                  <p className="font-inter text-base md:text-xl text-[#efeae2]/70 leading-relaxed font-light max-w-2xl">
                    {story.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
