"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Avoid running on mobile devices to preserve native touch scrolling
    if (typeof window !== "undefined") {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 0.95,
        smoothTouch: false,
        infinite: false,
      });

      lenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      // Connect standard Lenis links
      const handleAnchorScroll = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
          e.preventDefault();
          const href = target.getAttribute('href');
          if (href === '#') return;
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element, { offset: -60, duration: 1.5 });
          }
        }
      };

      document.addEventListener("click", handleAnchorScroll);

      return () => {
        lenis.destroy();
        document.removeEventListener("click", handleAnchorScroll);
      };
    }
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
