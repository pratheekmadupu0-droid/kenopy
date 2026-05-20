"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LenisProvider from "@/components/LenisProvider";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedHuts from "@/components/FeaturedHuts";
import ImmersiveExperience from "@/components/ImmersiveExperience";
import About from "@/components/About";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

// Lazy load the 3D canvas scene with SSR disabled to prevent server-side hydration mismatches
const HutScene = dynamic(() => import("@/components/three/HutScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#05100d] flex items-center justify-center -z-10">
      <div className="text-[#efeae2]/40 font-space text-xs tracking-widest animate-pulse">
        SPATIAL RENDER INITIALIZING...
      </div>
    </div>
  ),
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <LenisProvider>
      {/* Cinematic intro logo load screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Main App Page View */}
      <div className={`relative flex flex-col min-h-screen transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        
        {/* Floating Navbar */}
        <Navbar />

        {/* Fullscreen 3D Viewport in background */}
        <HutScene />

        {/* Hero title overlays overlaying the WebGL Canvas context */}
        <Hero />

        {/* Content Sections */}
        <main className="relative z-20 bg-[#05100d]">
          {/* Featured Sanctuaries showcase */}
          <FeaturedHuts />

          {/* Sticky horizontal nature story slider */}
          <ImmersiveExperience />

          {/* Split layout about section with stat counters */}
          <About />

          {/* Custom glassmorphism amenities cards list */}
          <Amenities />

          {/* Seamless looping testimonials quote slider */}
          <Testimonials />

          {/* Masonry gallery layout with lightbox popup */}
          <Gallery />

          {/* Interactive booking dispatch form */}
          <BookingCTA />
        </main>

        {/* Minimal Footer and dispatcher */}
        <Footer />
      </div>
    </LenisProvider>
  );
}
