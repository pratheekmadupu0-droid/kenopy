"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import HutModel from "./HutModel";
import Forest from "./Forest";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

function SceneController() {
  const { camera } = useThree();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      scrollProgress.current = window.scrollY / docHeight;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once to initialize
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    const p = scrollProgress.current;

    // Multi-stage camera flight path
    let targetX = 0;
    let targetY = 0.8;
    let targetZ = 6.2;

    if (p < 0.2) {
      // Stage 1: Zoom slightly, move left to outline wood/metal pillars (0.0 to 0.2)
      const t = p / 0.2;
      targetX = THREE.MathUtils.lerp(0, -1.8, t);
      targetY = THREE.MathUtils.lerp(0.8, 1.4, t);
      targetZ = THREE.MathUtils.lerp(6.2, 5.6, t);
    } else if (p < 0.45) {
      // Stage 2: Descend, rotate to side deck/jacuzzi pool perspective (0.2 to 0.45)
      const t = (p - 0.2) / 0.25;
      targetX = THREE.MathUtils.lerp(-1.8, 2.5, t);
      targetY = THREE.MathUtils.lerp(1.4, 0.4, t);
      targetZ = THREE.MathUtils.lerp(5.6, 4.6, t);
    } else if (p < 0.75) {
      // Stage 3: Dynamic high-angle cinematic crane view showing foggy trees (0.45 to 0.75)
      const t = (p - 0.45) / 0.3;
      targetX = THREE.MathUtils.lerp(2.5, 0, t);
      targetY = THREE.MathUtils.lerp(0.4, 3.6, t);
      targetZ = THREE.MathUtils.lerp(4.6, 6.6, t);
    } else {
      // Stage 4: Close up, dramatic floor-level perspective looking up (0.75 to 1.0)
      const t = (p - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(0, -1.0, t);
      targetY = THREE.MathUtils.lerp(3.6, -0.2, t);
      targetZ = THREE.MathUtils.lerp(6.6, 4.8, t);
    }

    // Dynamic mouse parallax vectors
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.35;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + mouseX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouseY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    // Frame the center point beautifully with dynamic scroll offsets
    const lookX = THREE.MathUtils.lerp(0, -0.3, p);
    const lookY = THREE.MathUtils.lerp(0, 0.25, p);
    camera.lookAt(new THREE.Vector3(lookX, lookY, 0));
  });

  return null;
}

export default function HutScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="w-screen h-screen fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 0.8, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
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

          {/* Camera controller coordinating transitions with page scroll */}
          <SceneController />
        </Suspense>
      </Canvas>
    </div>
  );
}
