"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Aurelius",
      title: "Senior Architect",
      quote: "The combination of minimal black framing with natural forest light is flawless. Standing inside, you feel suspended in time. A Masterpiece.",
      stars: 5,
    },
    {
      name: "Elena Rostova",
      title: "Travel Journalist",
      quote: "Sleeping beneath the glowing stars through the panoramic skylights is a memory I will carry forever. Absolute silent luxury.",
      stars: 5,
    },
    {
      name: "Jean-Louis",
      title: "Environmental Consultant",
      quote: "I was deeply impressed by the low-impact construction. The floating foundation preserved the mossy forest floor without a scratch.",
      stars: 5,
    },
    {
      name: "Ami Tanaka",
      title: "Design Director",
      quote: "Every wood grain, steel frame weld, and volumetric point-light matches the premium quality of high-end architectural journals.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 bg-[#05100d] overflow-hidden border-t border-[#efeae2]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-xl mb-16 md:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-[1px] bg-[#a07855]" />
            <span className="font-space text-xs tracking-[0.3em] uppercase text-[#a07855] font-semibold">
              Guest Impressions
            </span>
          </div>
          <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tight text-[#efeae2] leading-tight">
            Voices of retreat.
          </h2>
        </div>
      </div>

      {/* Infinite Horizontal Sliding Carousel Track */}
      <div className="w-full flex overflow-x-hidden relative py-4">
        {/* Blur gradients left and right */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-[#05100d] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-[#05100d] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 md:gap-8 flex-nowrap whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 32,
            ease: "linear",
          }}
        >
          {/* Double array elements to ensure seamless loop */}
          {[...reviews, ...reviews, ...reviews].map((rev, idx) => (
            <div
              key={idx}
              className="inline-block w-[300px] md:w-[400px] p-6 md:p-8 rounded-2xl border border-[#efeae2]/5 bg-[#091b15]/20 backdrop-blur-sm whitespace-normal flex flex-col gap-4 justify-between"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#a07855] text-[#a07855]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-inter text-sm md:text-base text-[#efeae2]/80 leading-relaxed font-light italic">
                "{rev.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-[#efeae2]/5 pt-4 flex flex-col">
                <span className="font-space text-sm font-bold text-[#efeae2]">{rev.name}</span>
                <span className="font-inter text-[10px] uppercase tracking-wider text-[#efeae2]/45">{rev.title}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
