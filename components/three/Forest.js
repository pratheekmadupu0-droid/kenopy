"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Tree({ position, height = 3.5, radius = 0.9, color = "#0a261c" }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, height / 4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.14, height / 2, 8]} />
        <meshStandardMaterial color="#2d1c10" roughness={0.95} />
      </mesh>
      {/* Foliage Cones */}
      <mesh position={[0, height * 0.58, 0]} castShadow>
        <coneGeometry args={[radius, height * 0.72, 8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, height * 0.82, 0]} castShadow>
        <coneGeometry args={[radius * 0.76, height * 0.48, 8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function Forest() {
  const lightRayRef = useRef();

  useFrame((state) => {
    if (lightRayRef.current) {
      const time = state.clock.getElapsedTime();
      // Volumetric beam drift animation
      lightRayRef.current.position.x = Math.sin(time * 0.25) * 1.5;
      lightRayRef.current.position.z = Math.cos(time * 0.35) * 1.5;
    }
  });

  const trees = [
    { pos: [-4.8, -1.8, -5.0], h: 4.8, r: 1.1, c: "#061f16" },
    { pos: [-6.2, -1.8, -2.5], h: 5.6, r: 1.3, c: "#09241a" },
    { pos: [5.2, -1.8, -5.5], h: 5.0, r: 1.2, c: "#051c14" },
    { pos: [6.4, -1.8, -2.0], h: 5.4, r: 1.35, c: "#082319" },
    { pos: [-3.2, -1.8, -6.5], h: 4.2, r: 1.0, c: "#041911" },
    { pos: [3.6, -1.8, -6.5], h: 4.4, r: 1.0, c: "#061a12" },
    { pos: [-8.0, -1.8, -0.2], h: 6.2, r: 1.5, c: "#03140e" },
    { pos: [8.0, -1.8, -0.2], h: 6.2, r: 1.5, c: "#03140e" },
  ];

  return (
    <group>
      {/* Background Forest */}
      {trees.map((t, idx) => (
        <Tree key={idx} position={t.pos} height={t.h} radius={t.r} color={t.c} />
      ))}

      {/* Optimized fireflies particle system (Neon yellow/green glow) */}
      <Sparkles
        count={60}
        scale={[14, 8, 14]}
        size={4.5}
        speed={0.45}
        color="#bfff44"
        opacity={0.8}
      />

      {/* Floating leaves/mist particles (Beige/Mist gray) */}
      <Sparkles
        count={40}
        scale={[16, 10, 16]}
        size={2.8}
        speed={0.25}
        color="#efeae2"
        opacity={0.4}
      />

      {/* SpotLight representing the cinematic moonbeam through fog */}
      <spotLight
        ref={lightRayRef}
        position={[0, 9, 0]}
        angle={0.45}
        penumbra={1.0}
        intensity={3.0}
        color="#cceeff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Solid Ground Plane for base shadow mapping */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#040c0a" roughness={1.0} />
      </mesh>
    </group>
  );
}
