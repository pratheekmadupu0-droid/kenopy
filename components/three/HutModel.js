"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles, Html } from "@react-three/drei";

// Glowing clickable HTML Pin component for 3D hotspots
function InteractivePin({ position, label, active, onClick, colorClass = "bg-[#ffaa44]" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Html
      position={position}
      center
      distanceFactor={6}
      style={{
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: `scale(${hovered ? 1.25 : 1})`,
      }}
    >
      <div 
        className="relative flex items-center justify-center cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {/* Pulsing Outer Halo */}
        <span className={`absolute inline-flex h-6 w-6 rounded-full ${colorClass} opacity-40 animate-ping`}></span>
        
        {/* Solid Center Dot */}
        <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${colorClass} border border-white/60 shadow-lg shadow-black/80`}></span>

        {/* Premium Tooltip */}
        <div className={`absolute bottom-7 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#050b08]/90 border border-[#efeae2]/15 backdrop-blur-md text-[10px] tracking-widest text-[#efeae2] font-space uppercase transition-all duration-300 pointer-events-none ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
          {label} <span className="text-white/40 mx-1">|</span> {active !== undefined ? (active ? "ON" : "OFF") : "ACTIVATE"}
        </div>
      </div>
    </Html>
  );
}

export default function HutModel(props) {
  const groupRef = useRef();
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();

  // Configurator states
  const [lightsOn, setLightsOn] = useState(true);
  const [fireOn, setFireOn] = useState(true);
  const [jacuzziOn, setJacuzziOn] = useState(true);
  const [doorOpen, setDoorOpen] = useState(false);

  // Pulse animation state (triggered on click)
  const pulseScale = useRef(1.0);
  const isPulsing = useRef(false);
  const scrollScale = useRef(1.0);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click to trigger pulse on canvas background
  useEffect(() => {
    const handleClick = (e) => {
      // Ignore clicks on HTML pin elements
      if (e.target.closest('.three-pin')) return;
      isPulsing.current = true;
    };
    window.addEventListener('pointerdown', handleClick);
    return () => window.removeEventListener('pointerdown', handleClick);
  }, []);

  // Slow float, mouse parallax, pulse, and scroll-scale animation
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Smooth floating height offset
    groupRef.current.position.y = props.position[1] + Math.sin(time * 0.5) * 0.08;
    
    // Stronger mouse-driven rotation — wide yaw + pitch response
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (state.pointer.x * 0.28) + time * 0.012,
      0.045
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      (-state.pointer.y * 0.14),
      0.045
    );

    // Scroll-driven subtle scale: model grows slightly as page scrolls
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const sp = docHeight > 0 ? scrollY.current / docHeight : 0;
    const targetScrollScale = 1.0 + sp * 0.12;
    scrollScale.current = THREE.MathUtils.lerp(scrollScale.current, targetScrollScale, 0.04);

    // Click-pulse animation: quick overshoot scale then spring back
    if (isPulsing.current) {
      pulseScale.current = THREE.MathUtils.lerp(pulseScale.current, 1.12, 0.18);
      if (pulseScale.current > 1.115) {
        isPulsing.current = false;
      }
    } else {
      pulseScale.current = THREE.MathUtils.lerp(pulseScale.current, 1.0, 0.10);
    }

    const finalScale = scrollScale.current * pulseScale.current;
    groupRef.current.scale.setScalar(finalScale);

    // Smoothly animate left & right sliding glass door panels
    if (leftDoorRef.current && rightDoorRef.current) {
      const openOffset = doorOpen ? 1.05 : 0;
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(
        leftDoorRef.current.position.x, 
        -0.775 - openOffset * 0.72, 
        0.08
      );
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(
        rightDoorRef.current.position.x, 
        0.775 + openOffset * 0.72, 
        0.08
      );
    }
  });

  // Architectural arrays
  const planks = Array.from({ length: 18 });
  const roofSeams = Array.from({ length: 10 });
  const railingPosts = [
    { x: -2.0, z: 2.0 }, { x: 2.0, z: 2.0 },
    { x: -2.0, z: -2.0 }, { x: 2.0, z: -2.0 },
    { x: -2.0, z: 0.0 }, { x: 2.0, z: 0.0 }
  ];

  return (
    <group ref={groupRef} {...props}>
      
      {/* ---------------- INTERACTIVE HOTSPOT PINS ---------------- */}
      <InteractivePin 
        position={[0.7, 0.4, 1.45]} 
        label="Fire Pit" 
        active={fireOn} 
        onClick={() => setFireOn(!fireOn)}
        colorClass="bg-[#ff5511]"
      />
      <InteractivePin 
        position={[-1.3, 0.35, 0.9]} 
        label="Jacuzzi Pool" 
        active={jacuzziOn} 
        onClick={() => setJacuzziOn(!jacuzziOn)}
        colorClass="bg-[#2be8f0]"
      />
      <InteractivePin 
        position={[0, 1.4, -0.3]} 
        label="Interior Lights" 
        active={lightsOn} 
        onClick={() => setLightsOn(!lightsOn)}
        colorClass="bg-[#ffa544]"
      />
      <InteractivePin 
        position={[0, 0.95, 1.1]} 
        label="Sliding Glass Doors" 
        active={doorOpen} 
        onClick={() => setDoorOpen(!doorOpen)}
        colorClass="bg-[#ffffff]"
      />

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

      {/* Main Structural Stilts */}
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

      {/* Main Deck Platform (Planks) */}
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
          <meshStandardMaterial color="#0b0c0d" metalness={0.9} roughness={0.4} />
        </mesh>
      </group>

      {/* Sleek Minimal Glass Railings */}
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
        
        {/* Left Solid Wall */}
        <mesh position={[-1.6, 0, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.8, 2.5]} />
          <meshStandardMaterial color="#161715" roughness={0.95} />
        </mesh>

        {/* Right Solid Wall */}
        <mesh position={[1.6, 0, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.8, 2.5]} />
          <meshStandardMaterial color="#161715" roughness={0.95} />
        </mesh>

        {/* Rear wall */}
        <mesh position={[0, 0, -1.4]} castShadow receiveShadow>
          <boxGeometry args={[3.12, 1.8, 0.08]} />
          <meshStandardMaterial color="#0e0f0e" roughness={0.9} />
        </mesh>

        {/* Standing-Seam Architectural Roof */}
        <group position={[0, 0.95, 0.05]}>
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

          {/* Ceiling Wood Soffit */}
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
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.04, 8]} />
            <meshStandardMaterial color="#0c0d0d" metalness={0.9} />
          </mesh>
        </group>

        {/* Front Glass Facade - Interactive Sliding Doors */}
        <group position={[0, 0, 1.0]}>
          {/* Outer Black Border Frame */}
          <mesh position={[-1.55, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 1.8, 0.06]} />
            <meshStandardMaterial color="#1a120b" roughness={0.7} />
          </mesh>
          <mesh position={[1.55, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 1.8, 0.06]} />
            <meshStandardMaterial color="#1a120b" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.89, 0]} castShadow>
            <boxGeometry args={[3.16, 0.04, 0.06]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.89, 0]} castShadow>
            <boxGeometry args={[3.16, 0.04, 0.06]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.04, 1.78, 0.04]} />
            <meshStandardMaterial color="#0c0d0e" roughness={0.8} />
          </mesh>

          {/* Left Sliding Door */}
          <group ref={leftDoorRef} position={[-0.775, 0, 0]}>
            <mesh transparent opacity={0.2} castShadow>
              <boxGeometry args={[1.5, 1.74, 0.02]} />
              <meshStandardMaterial 
                color="#d0f0ff" 
                transparent 
                opacity={0.22} 
                roughness={0.02} 
                metalness={0.98} 
                envMapIntensity={2.8}
              />
            </mesh>
            {/* Minimal handle */}
            <mesh position={[0.7, 0, 0.02]} castShadow>
              <boxGeometry args={[0.02, 0.4, 0.02]} />
              <meshStandardMaterial color="#222" metalness={0.9} />
            </mesh>
          </group>

          {/* Right Sliding Door */}
          <group ref={rightDoorRef} position={[0.775, 0, 0]}>
            <mesh transparent opacity={0.2} castShadow>
              <boxGeometry args={[1.5, 1.74, 0.02]} />
              <meshStandardMaterial 
                color="#d0f0ff" 
                transparent 
                opacity={0.22} 
                roughness={0.02} 
                metalness={0.98} 
                envMapIntensity={2.8}
              />
            </mesh>
            {/* Minimal handle */}
            <mesh position={[-0.7, 0, 0.02]} castShadow>
              <boxGeometry args={[0.02, 0.4, 0.02]} />
              <meshStandardMaterial color="#222" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* Cozy Warm Volumetric Interior Glow */}
        <pointLight 
          position={[0, 0.2, -0.4]} 
          intensity={lightsOn ? 6.0 : 0} 
          distance={6} 
          color="#ffaa44" 
          castShadow
        />
        
        {/* Modern Spherical Pendant Light Lantern */}
        <mesh position={[0, 0.45, -0.3]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={lightsOn ? "#ffc077" : "#222"} />
        </mesh>
        
        {/* Interior: Platform Bed */}
        <group position={[0.6, -0.7, -0.4]}>
          <mesh castShadow>
            <boxGeometry args={[1.3, 0.2, 1.7]} />
            <meshStandardMaterial color="#2d1c10" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.18, 0.05]} castShadow>
            <boxGeometry args={[1.2, 0.22, 1.5]} />
            <meshStandardMaterial color="#efeae2" roughness={0.95} />
          </mesh>
          <mesh position={[0, 0.32, -0.5]} rotation={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[1.0, 0.12, 0.4]} />
            <meshStandardMaterial color="#6a6358" roughness={0.9} />
          </mesh>
        </group>

        {/* Interior: Hanging Fireplace Stove */}
        <group position={[-0.8, -0.15, -0.6]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.7, 12]} />
            <meshStandardMaterial color="#161717" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Fire Glowing Aperture */}
          <mesh position={[0, -0.1, 0.135]}>
            <planeGeometry args={[0.18, 0.18]} />
            <meshBasicMaterial color={lightsOn ? "#ff7711" : "#222"} />
          </mesh>
          <pointLight position={[0, -0.1, 0.2]} intensity={lightsOn ? 2.5 : 0} distance={2.5} color="#ff7711" />
        </group>
      </group>

      {/* Floating Modern Warm Ambient Lantern on the Deck corner */}
      <group position={[1.6, 0.2, 1.6]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.03, 8]} />
          <meshStandardMaterial color="#111" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.12, 0]} transparent opacity={0.3}>
          <cylinderGeometry args={[0.06, 0.06, 0.2, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0.01} metalness={0.9} />
        </mesh>
        <pointLight position={[0, 0.12, 0]} intensity={lightsOn ? 3.5 : 0} color="#ffa544" distance={3} />
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color={lightsOn ? "#ffd499" : "#222"} />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <coneGeometry args={[0.11, 0.05, 8]} />
          <meshStandardMaterial color="#111" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Luxury Deck Jacuzzi Plunge Pool */}
      <group position={[-1.3, -0.05, 0.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.15, 0.22, 1.15]} />
          <meshStandardMaterial color="#191008" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.115, 0]} castShadow>
          <boxGeometry args={[1.2, 0.03, 1.2]} />
          <meshStandardMaterial color="#0c0d0e" metalness={0.9} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.08, 1.08]} />
          <meshStandardMaterial color={jacuzziOn ? "#1e6e70" : "#142526"} transparent opacity={0.7} roughness={0.02} metalness={0.96} envMapIntensity={3.0} />
        </mesh>
        <pointLight position={[0, 0.12, 0]} intensity={jacuzziOn ? 2.0 : 0} color="#2be8f0" distance={2.5} />
        {jacuzziOn && (
          <Sparkles
            count={10}
            scale={[0.8, 0.4, 0.8]}
            position={[0, 0.25, 0]}
            size={2.5}
            speed={0.4}
            color="#aae8ff"
            opacity={0.35}
          />
        )}
      </group>

      {/* Modern Low-Profile Deck Fire Pit */}
      <group position={[0.7, 0.1, 1.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.24, 0.12, 12]} />
          <meshStandardMaterial color="#1a1c1d" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial color={fireOn ? "#ff3300" : "#222"} roughness={0.9} emissive={fireOn ? "#551100" : "#000"} />
        </mesh>
        <pointLight position={[0, 0.16, 0]} intensity={fireOn ? 5.5 : 0} distance={4.5} color="#ff5511" castShadow />
        {fireOn && (
          <Sparkles
            count={12}
            scale={[0.4, 0.8, 0.4]}
            position={[0, 0.35, 0]}
            size={3.5}
            speed={1.2}
            color="#ff7711"
            opacity={0.8}
          />
        )}
      </group>

      {/* Potted Accent plant */}
      <group position={[1.45, 0.1, -0.65]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.07, 0.22, 10]} />
          <meshStandardMaterial color="#2d2d2c" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#1e3d27" roughness={0.9} />
        </mesh>
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
