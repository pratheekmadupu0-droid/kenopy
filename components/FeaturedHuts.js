"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, BedDouble, Trees } from "lucide-react";
import Image from "next/image";

function TiltCard({ title, desc, img, price, specs }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 220 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden group bg-[#091b15]/40 border border-[#efeae2]/5 shadow-2xl transition-shadow hover:shadow-[0_20px_50px_rgba(160,120,85,0.15)] flex flex-col justify-end p-6 md:p-8 cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-w-768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-65 group-hover:opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05100d] via-[#05100d]/40 to-transparent z-10" />
      </div>

      {/* Tilt Content Layer */}
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="relative z-20 flex flex-col gap-4"
      >
        <span className="font-space text-[10px] tracking-[0.2em] uppercase text-[#a07855] font-semibold">
          Featured Sanctuary
        </span>
        
        <div>
          <h3 className="font-space text-2xl md:text-3xl font-bold text-[#efeae2] mb-2">
            {title}
          </h3>
          <p className="font-inter text-xs md:text-sm text-[#efeae2]/70 line-clamp-2 font-light">
            {desc}
          </p>
        </div>

        {/* Spec badges */}
        <div className="flex items-center gap-4 text-[#efeae2]/60 border-t border-[#efeae2]/5 pt-4">
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-[#a07855]" />
            <span className="font-inter text-[10px] uppercase tracking-wider">{specs.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trees className="w-3.5 h-3.5 text-[#a07855]" />
            <span className="font-inter text-[10px] uppercase tracking-wider">{specs.view}</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between mt-2 pt-2">
          <div>
            <span className="font-inter text-[10px] uppercase tracking-wider text-[#efeae2]/45 block">Price / Night</span>
            <span className="font-space text-lg font-bold text-[#efeae2]">{price}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#efeae2] text-[#05100d] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45 shadow-lg">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedHuts() {
  const huts = [
    {
      title: "The A-Frame Canopy",
      desc: "An architectural masterpiece elevated amidst the pine canopy, offering full-height glass structures and cozy interiors.",
      img: "/images/hut1.png",
      price: "$450",
      specs: { beds: "King Suite", view: "Forest Valley" },
    },
    {
      title: "The Obsidian Pavilion",
      desc: "Minimalist black steel structural lounge featuring an outdoor heated jacuzzi and sweeping views of the foggy landscape.",
      img: "/images/hut2.png",
      price: "$620",
      specs: { beds: "Dual Suite", view: "Misty Gorge" },
    },
    {
      title: "The Solitude Dome",
      desc: "Procedural geometric geodesic capsule designed for ultimate isolation and immersion in raw natural wetlands.",
      img: "/images/hut3.png",
      price: "$380",
      specs: { beds: "Queen Loft", view: "River Stream" },
    },
  ];

  return (
    <section id="featured" className="relative w-full py-24 md:py-32 bg-[#05100d] overflow-hidden px-6 md:px-12 border-t border-[#efeae2]/5">
      {/* Decorative Forest Grid */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#efeae2_1px,transparent_1px),linear-gradient(to_bottom,#efeae2_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-[1px] bg-[#a07855]" />
              <span className="font-space text-xs tracking-[0.3em] uppercase text-[#a07855] font-semibold">
                Spatially Defined Luxury
              </span>
            </div>
            <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tight text-[#efeae2] leading-tight">
              Architectural <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efeae2] to-[#a07855]/70">
                sanctuaries.
              </span>
            </h2>
          </div>
          <p className="font-inter text-sm md:text-base text-[#efeae2]/60 max-w-sm leading-relaxed font-light">
            Each retreat is custom designed to integrate with the environment, minimizing ecological footprints while maximizing luxury.
          </p>
        </div>

        {/* Hut Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {huts.map((hut, idx) => (
            <motion.div
              key={hut.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <TiltCard {...hut} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
