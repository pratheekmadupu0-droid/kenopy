"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

export default function HutModel(props) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Slow float and mouse rotate effect
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Smooth floating movement
    groupRef.current.position.y = props.position[1] + Math.sin(time * 0.5) * 0.08;
    
    // Slow drift rotation combining scroll angle + mouse tracking
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      (state.pointer.x * 0.16) + time * 0.015, 
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      (-state.pointer.y * 0.08),
      0.05
    );
  });

  // Helper arrays for architectural detailing
  const planks = Array.from({ length: 18 });
  const roofSeams = Array.from({ length: 10 });
  const railingPosts = [
    { x: -2.0, z: 2.0 }, { x: 2.0, z: 2.0 },
    { x: -2.0, z: -2.0 }, { x: 2.0, z: -2.0 },
    { x: -2.0, z: 0.0 }, { x: 2.0, z: 0.0 }
  ];

  return (
    <group ref={groupRef} {...props}>
      {/* Foundation Concrete Footings */}
      <mesh position={[-1.5, -1.75, -1.5]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#3a3c39" roughness={0.9} />
      </mesh>
      <mesh position={[1.5, -1.75, -1.5]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#3a3c39" roughness={0.9} />
      </mesh>
      <mesh position={[-1.5, -1.75, 1.5]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#3a3c39" roughness={0.9} />
      </mesh>
      <mesh position={[1.5, -1.75, 1.5]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#3a3c39" roughness={0.9} />
      </mesh>

      {/* Main Structural Stilts (Heavy Charcoal Steel H-Beams) */}
      <mesh position={[-1.5, -0.9, -1.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.7, 8]} />
        <meshStandardMaterial color="#1a1c1d" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[1.5, -0.9, -1.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.7, 8]} />
        <meshStandardMaterial color="#1a1c1d" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[-1.5, -0.9, 1.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.7, 8]} />
        <meshStandardMaterial color="#1a1c1d" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[1.5, -0.9, 1.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.7, 8]} />
        <meshStandardMaterial color="#1a1c1d" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Structural Cross-bracing under deck */}
      <group position={[0, -0.9, 0]}>
        <mesh rotation={[0, 0, 0.6]} castShadow>
          <boxGeometry args={[0.02, 2.2, 0.06]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, -0.6]} castShadow>
          <boxGeometry args={[0.02, 2.2, 0.06]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>
      </group>

      {/* Main Deck Platform (Teak Wood planks layout) */}
      <group position={[0, -0.05, 0]}>
        {planks.map((_, i) => (
          <mesh
            key={i}
            position={[-1.995 + i * 0.235, 0, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.22, 0.1, 4.2]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#2f1f13" : "#372517"}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        ))}
        {/* Steel edge border around deck */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.25, 0.12, 4.25]} />
          <meshStandardMaterial color="#0b0c0d" metalness={0.9} roughness={0.4} wireframe={false} />
        </mesh>
      </group>

      {/* Sleek Minimal Glass Railings around the deck */}
      <group position={[0, 0.45, 0]}>
        {railingPosts.map((pos, idx) => (
          <mesh key={idx} position={[pos.x, 0, pos.z]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
            <meshStandardMaterial color="#0c0d0e" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Glass Panels */}
        <mesh position={[0, 0, 2.0]} transparent opacity={0.15}>
          <boxGeometry args={[3.8, 0.7, 0.02]} />
          <meshStandardMaterial color="#aaccff" transparent opacity={0.15} roughness={0.05} metalness={0.95} />
        </mesh>
        <mesh position={[-2.0, 0, 0]} rotation={[0, Math.PI / 2, 0]} transparent opacity={0.15}>
          <boxGeometry args={[3.8, 0.7, 0.02]} />
          <meshStandardMaterial color="#aaccff" transparent opacity={0.15} roughness={0.05} metalness={0.95} />
        </mesh>
        <mesh position={[2.0, 0, 0]} rotation={[0, Math.PI / 2, 0]} transparent opacity={0.15}>
          <boxGeometry args={[3.8, 0.7, 0.02]} />
          <meshStandardMaterial color="#aaccff" transparent opacity={0.15} roughness={0.05} metalness={0.95} />
        </mesh>
      </group>

      {/* Main Architectural Cabin */}
      <group position={[0, 0.95, -0.25]}>
        
        {/* Left Solid Wall (Dark Stained Horizontal Slats) */}
        <mesh position={[-1.6, 0, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.8, 2.5]} />
          <meshStandardMaterial color="#161715" roughness={0.95} />
        </mesh>

        {/* Right Solid Wall */}
        <mesh position={[1.6, 0, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.8, 2.5]} />
          <meshStandardMaterial color="#161715" roughness={0.95} />
        </mesh>

        {/* Rear wall with dynamic vertical slits for soft light leakage */}
        <mesh position={[0, 0, -1.4]} castShadow receiveShadow>
          <boxGeometry args={[3.12, 1.8, 0.08]} />
          <meshStandardMaterial color="#0e0f0e" roughness={0.9} />
        </mesh>

        {/* Standing-Seam Architectural Roof */}
        <group position={[0, 0.95, 0.05]}>
          {/* Main Slanted Roof Panel */}
          <mesh rotation={[0.18, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.6, 0.08, 3.4]} />
            <meshStandardMaterial color="#111213" roughness={0.4} metalness={0.9} />
          </mesh>
          
          {/* Standing Seam Metal Rails */}
          {roofSeams.map((_, idx) => (
            <mesh 
              key={idx} 
              position={[-1.65 + idx * 0.36, 0.045, -0.05]} 
              rotation={[0.18, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.015, 0.03, 3.36]} />
              <meshStandardMaterial color="#080909" roughness={0.3} metalness={0.95} />
            </mesh>
          ))}

          {/* Natural wood soffit / ceiling visual underneath */}
          <mesh position={[0, -0.045, 0]} rotation={[0.18, 0, 0]}>
            <boxGeometry args={[3.5, 0.02, 3.3]} />
            <meshStandardMaterial color="#553922" roughness={0.7} />
          </mesh>
        </group>

        {/* Sleek Black Industrial Chimney Pipe */}
        <group position={[-1.1, 1.35, -0.6]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.1, 8]} />
            <meshStandardMaterial color="#0c0d0d" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Chimney Cap */}
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.04, 8]} />
            <meshStandardMaterial color="#0c0d0d" metalness={0.9} />
          </mesh>
        </group>

        {/* Front Glass Facade with black horizontal & vertical Mullion grids */}
        <group position={[0, 0, 1.0]}>
          {/* Glass panels */}
          <mesh transparent opacity={0.2}>
            <boxGeometry args={[3.1, 1.78, 0.02]} />
            <meshStandardMaterial 
              color="#d0f0ff" 
              transparent 
              opacity={0.22} 
              roughness={0.02} 
              metalness={0.98} 
              envMapIntensity={2.8}
            />
          </mesh>
          {/* Framing Mullions */}
          <mesh position={[0, 0, 0.01]} castShadow>
            <boxGeometry args={[0.04, 1.78, 0.04]} />
            <meshStandardMaterial color="#080909" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.2, 0.01]} castShadow>
            <boxGeometry args={[3.1, 0.03, 0.04]} />
            <meshStandardMaterial color="#080909" roughness={0.8} />
          </mesh>
          <mesh position={[-1.55, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 1.8, 0.06]} />
            <meshStandardMaterial color="#1a120b" roughness={0.7} />
          </mesh>
          <mesh position={[1.55, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 1.8, 0.06]} />
            <meshStandardMaterial color="#1a120b" roughness={0.7} />
          </mesh>
        </group>

        {/* Cozy Warm Volumetric Interior Glow */}
        <pointLight 
          position={[0, 0.2, -0.4]} 
          intensity={6.0} 
          distance={6} 
          color="#ffaa44" 
          castShadow
        />
        
        {/* Modern Spherical Pendant Light Lantern */}
        <mesh position={[0, 0.45, -0.3]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffc077" />
        </mesh>
        
        {/* Interior: Modern Floating Platform Bed */}
        <group position={[0.6, -0.7, -0.4]}>
          {/* Wooden Bed Base */}
          <mesh castShadow>
            <boxGeometry args={[1.3, 0.2, 1.7]} />
            <meshStandardMaterial color="#2d1c10" roughness={0.8} />
          </mesh>
          {/* White Linen Mattress */}
          <mesh position={[0, 0.18, 0.05]} castShadow>
            <boxGeometry args={[1.2, 0.22, 1.5]} />
            <meshStandardMaterial color="#efeae2" roughness={0.95} />
          </mesh>
          {/* Soft pillows */}
          <mesh position={[0, 0.32, -0.5]} rotation={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[1.0, 0.12, 0.4]} />
            <meshStandardMaterial color="#6a6358" roughness={0.9} />
          </mesh>
        </group>

        {/* Interior: Hanging Cylindrical Fireplace Stove */}
        <group position={[-0.8, -0.15, -0.6]}>
          {/* Stove Body */}
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.7, 12]} />
            <meshStandardMaterial color="#161717" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Fire Glowing Aperture */}
          <mesh position={[0, -0.1, 0.135]}>
            <planeGeometry args={[0.18, 0.18]} />
            <meshBasicMaterial color="#ff7711" />
          </mesh>
          <pointLight position={[0, -0.1, 0.2]} intensity={2.5} distance={2.5} color="#ff7711" />
        </group>
      </group>

      {/* Floating Modern Warm Ambient Lantern on the Deck corner */}
      <group position={[1.6, 0.2, 1.6]}>
        {/* Lantern Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.03, 8]} />
          <meshStandardMaterial color="#111" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Lantern Glass Cylinder */}
        <mesh position={[0, 0.12, 0]} transparent opacity={0.3}>
          <cylinderGeometry args={[0.06, 0.06, 0.2, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0.01} metalness={0.9} />
        </mesh>
        {/* Light Source */}
        <pointLight position={[0, 0.12, 0]} intensity={3.5} color="#ffa544" distance={3} />
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#ffd499" />
        </mesh>
        {/* Lantern Cap */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <coneGeometry args={[0.11, 0.05, 8]} />
          <meshStandardMaterial color="#111" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Luxury Deck Jacuzzi Plunge Pool */}
      <group position={[-1.3, -0.05, 0.9]}>
        {/* Outside Wood panel tub framework */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.15, 0.22, 1.15]} />
          <meshStandardMaterial color="#191008" roughness={0.95} />
        </mesh>
        {/* Sleek top rim */}
        <mesh position={[0, 0.115, 0]} castShadow>
          <boxGeometry args={[1.2, 0.03, 1.2]} />
          <meshStandardMaterial color="#0c0d0e" metalness={0.9} roughness={0.4} />
        </mesh>
        {/* Water mesh with high reflections & transparent ocean tone */}
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.08, 1.08]} />
          <meshStandardMaterial color="#1e6e70" transparent opacity={0.7} roughness={0.02} metalness={0.96} envMapIntensity={3.0} />
        </mesh>
        {/* Water glow light source */}
        <pointLight position={[0, 0.12, 0]} intensity={2.0} color="#2be8f0" distance={2.5} />
        {/* Jacuzzi Steam Particles */}
        <Sparkles
          count={10}
          scale={[0.8, 0.4, 0.8]}
          position={[0, 0.25, 0]}
          size={2.5}
          speed={0.4}
          color="#aae8ff"
          opacity={0.35}
        />
      </group>

      {/* Modern Low-Profile Deck Fire Pit */}
      <group position={[0.7, 0.1, 1.45]}>
        {/* Steel Bowl */}
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.24, 0.12, 12]} />
          <meshStandardMaterial color="#1a1c1d" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Lava Stones / Glowing Coals */}
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial color="#3a1100" roughness={0.9} />
        </mesh>
        {/* Cozy Warm Fire Pit Light */}
        <pointLight position={[0, 0.16, 0]} intensity={5.5} distance={4.5} color="#ff5511" castShadow />
        {/* Ember Sparkles rising */}
        <Sparkles
          count={12}
          scale={[0.4, 0.8, 0.4]}
          position={[0, 0.35, 0]}
          size={3.5}
          speed={1.2}
          color="#ff7711"
          opacity={0.8}
        />
      </group>

      {/* Potted Accent plant (Highly stylized custom fern model) */}
      <group position={[1.45, 0.1, -0.65]}>
        {/* Stone Pot */}
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.07, 0.22, 10]} />
          <meshStandardMaterial color="#2d2d2c" roughness={0.95} />
        </mesh>
        {/* Stylized detailed branches */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#1e3d27" roughness={0.9} />
        </mesh>
        {/* Small leaves planes */}
        <mesh position={[0.1, 0.22, 0.05]} rotation={[0.3, 0.4, 0.1]} castShadow>
          <boxGeometry args={[0.15, 0.01, 0.06]} />
          <meshStandardMaterial color="#2b4c34" roughness={0.8} />
        </mesh>
        <mesh position={[-0.1, 0.24, -0.05]} rotation={[-0.3, -0.4, -0.1]} castShadow>
          <boxGeometry args={[0.14, 0.01, 0.07]} />
          <meshStandardMaterial color="#2b4c34" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
