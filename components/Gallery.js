"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import Image from "next/image";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    { src: "/images/hut1.png", title: "A-Frame Silhouette", desc: "Dusk perspective of the upper ridge deck." },
    { src: "/images/hut2.png", title: "Obsidian Jacuzzi", desc: "Steam rising above the matte black pool." },
    { src: "/images/hut3.png", title: "Solitude View", desc: "The glass facade glowing under twilight." },
    { src: "/images/hut1.png", title: "Pine Tree Shadows", desc: "Shadowplay filtering through teak walls." },
    { src: "/images/hut3.png", title: "Mist Valley", desc: "Dawn view of the dome perched over wetlands." },
    { src: "/images/hut2.png", title: "Cabin Interior", desc: "Warm ambient glow casting light on modern design." },
  ];

  return (
    <section id="gallery" className="relative w-full py-24 md:py-32 bg-[#05100d] overflow-hidden px-6 md:px-12 border-t border-[#efeae2]/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-xl mb-16 md:mb-24">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-[1px] bg-[#a07855]" />
            <span className="font-space text-xs tracking-[0.3em] uppercase text-[#a07855] font-semibold">
              Visual Archives
            </span>
          </div>
          <h2 className="font-space text-4xl md:text-6xl font-bold tracking-tight text-[#efeae2] leading-tight">
            Cinematic moments.
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              onClick={() => setSelectedImg(item.src)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer border border-[#efeae2]/5 bg-[#091b15]/40"
            >
              <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-auto">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={450}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05100d] via-[#05100d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-space text-lg font-bold text-[#efeae2] mb-1">{item.title}</h3>
                    <p className="font-inter text-xs text-[#efeae2]/70 font-light">{item.desc}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#efeae2] text-[#05100d] flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 bg-[#05100d]/95 z-[999] flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-[#efeae2]/60 hover:text-[#efeae2] transition-colors p-2"
              aria-label="Close lightbox"
            >
              <X className="w-7 h-7" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full aspect-video rounded-xl overflow-hidden border border-[#efeae2]/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="Enlarged view"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
