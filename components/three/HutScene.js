"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import HutModel from "./HutModel";
import Forest from "./Forest";
import { useEffect, useRef, useState, Suspense, useCallback } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

function SceneController({ dragDelta }) {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const smoothDrag = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      scrollProgress.current = window.scrollY / docHeight;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    const p = scrollProgress.current;

    // Smooth drag delta with easing
    smoothDrag.current.x = THREE.MathUtils.lerp(smoothDrag.current.x, dragDelta.current.x, 0.06);
    smoothDrag.current.y = THREE.MathUtils.lerp(smoothDrag.current.y, dragDelta.current.y, 0.06);

    // Multi-stage camera flight path
    let targetX = 0;
    let targetY = 0.8;
    let targetZ = 6.2;

    if (p < 0.2) {
      const t = p / 0.2;
      targetX = THREE.MathUtils.lerp(0, -1.8, t);
      targetY = THREE.MathUtils.lerp(0.8, 1.4, t);
      targetZ = THREE.MathUtils.lerp(6.2, 5.6, t);
    } else if (p < 0.45) {
      const t = (p - 0.2) / 0.25;
      targetX = THREE.MathUtils.lerp(-1.8, 2.5, t);
      targetY = THREE.MathUtils.lerp(1.4, 0.4, t);
      targetZ = THREE.MathUtils.lerp(5.6, 4.6, t);
    } else if (p < 0.75) {
      const t = (p - 0.45) / 0.3;
      targetX = THREE.MathUtils.lerp(2.5, 0, t);
      targetY = THREE.MathUtils.lerp(0.4, 3.6, t);
      targetZ = THREE.MathUtils.lerp(4.6, 6.6, t);
    } else {
      const t = (p - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(0, -1.0, t);
      targetY = THREE.MathUtils.lerp(3.6, -0.2, t);
      targetZ = THREE.MathUtils.lerp(6.6, 4.8, t);
    }

    // Enhanced mouse parallax + drag offset
    const mouseX = state.pointer.x * 0.65;
    const mouseY = state.pointer.y * 0.45;
    const dragX = smoothDrag.current.x * 2.8;
    const dragY = smoothDrag.current.y * 1.6;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + mouseX + dragX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouseY - dragY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    const lookX = THREE.MathUtils.lerp(0, -0.3, p);
    const lookY = THREE.MathUtils.lerp(0, 0.25, p);
    camera.lookAt(new THREE.Vector3(lookX, lookY, 0));
  });

  return null;
}

export default function HutScene() {
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragDelta = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const decayTimer = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Decay drag delta back to zero when mouse stops
  const startDecay = useCallback(() => {
    if (decayTimer.current) clearInterval(decayTimer.current);
    decayTimer.current = setInterval(() => {
      dragDelta.current.x *= 0.88;
      dragDelta.current.y *= 0.88;
      if (Math.abs(dragDelta.current.x) < 0.0005 && Math.abs(dragDelta.current.y) < 0.0005) {
        dragDelta.current = { x: 0, y: 0 };
        clearInterval(decayTimer.current);
      }
    }, 16);
  }, []);

  const handlePointerDown = useCallback((e) => {
    // Only start drag on left-click, not on pin elements
    if (e.button !== 0) return;
    setIsDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    if (decayTimer.current) clearInterval(decayTimer.current);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = (e.clientX - lastPointer.current.x) / window.innerWidth;
    const dy = (e.clientY - lastPointer.current.y) / window.innerHeight;
    dragDelta.current.x += dx * 3.5;
    dragDelta.current.y += dy * 3.5;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    startDecay();
  }, [startDecay]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-[#091b15] flex items-center justify-center">
        <div className="text-[#efeae2]/50 font-space text-lg animate-pulse tracking-widest">
          ESTABLISHING CINEMATIC GRID...
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen fixed inset-0 -z-10"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.8, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
        // Allow HTML overlays (pins) to receive pointer events
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          {/* Ambient Dark Forest Background Atmosphere */}
          <color attach="background" args={["#05100d"]} />
          <fog attach="fog" args={["#05100d", 4, 13]} />

          {/* Ambient Lighting */}
          <ambientLight intensity={0.9} color="#081f19" />

          {/* Cinematic Mist Light (Directional Moonbeam) */}
          <directionalLight
            position={[-6, 7, 4]}
            intensity={1.5}
            color="#b0e0ff"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* 3D Modern Luxury Hut */}
          <HutModel position={[0, -0.2, 0]} />

          {/* Interactive Forest Surroundings */}
          <Forest />

          {/* Soft, photorealistic ambient ground shadows */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.75}
            scale={12}
            blur={2.4}
            far={4.5}
          />

          {/* Reflections on Glass and Metals */}
          <Environment preset="forest" />

          {/* Camera controller coordinating transitions with page scroll + drag */}
          <SceneController dragDelta={dragDelta} />
        </Suspense>
      </Canvas>

      {/* Drag hint — fades in on first load, disappears after interaction */}
      {!isDragging && (
        <div
          className="pointer-events-none absolute bottom-24 right-8 flex items-center gap-2 opacity-40 animate-pulse"
          style={{ zIndex: 5 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#efeae2" strokeWidth="1.5">
            <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M12 12v.01" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-space text-[9px] tracking-[0.3em] uppercase text-[#efeae2]">Drag to explore</span>
        </div>
      )}
    </div>
  );
}
