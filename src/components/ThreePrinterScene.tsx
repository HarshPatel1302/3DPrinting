"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nozzle = useRef<THREE.Group>(null);
  const layersRef = useRef<THREE.Group>(null);
  const t = useRef(0);
  const nLayers = 8;

  useFrame((_, dt) => {
    t.current += dt;
    const amp = reducedMotion ? 0 : 1;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t.current * 0.25 * amp) * 0.18,
        0.05,
      );
    }
    if (nozzle.current) {
      nozzle.current.position.x = Math.sin(t.current * 0.9 * amp) * 0.2;
      nozzle.current.position.z = Math.cos(t.current * 0.7 * amp) * 0.16;
      nozzle.current.position.y =
        0.42 + Math.sin(t.current * 1.4 * amp) * 0.03;
    }
    if (layersRef.current && !reducedMotion) {
      const cycle = (t.current * 0.5) % 3;
      layersRef.current.children.forEach((child, i) => {
        const m = child as THREE.Mesh;
        const h = Math.min(1, Math.max(0, cycle * 2 - i * 0.15));
        m.scale.y = THREE.MathUtils.lerp(m.scale.y, 0.15 + h * 0.85, 0.08);
      });
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.1, 0.06, 1.1]} />
        <meshStandardMaterial
          color="#1e2228"
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
      {/* simplified frame */}
      {[
        [-0.58, 0.25, -0.58],
        [0.58, 0.25, -0.58],
        [-0.58, 0.25, 0.58],
        [0.58, 0.25, 0.58],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 12]} />
          <meshStandardMaterial
            color="#2d3238"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      ))}
      <group ref={layersRef} position={[0, -0.28, 0]}>
        {Array.from({ length: nLayers }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.045, 0.55]} />
            <meshStandardMaterial
              color={new THREE.Color().setHSL(0.52 + i * 0.02, 0.5, 0.45)}
              metalness={0.25}
              roughness={0.45}
              emissive="#22d3ee"
              emissiveIntensity={0.06}
            />
          </mesh>
        ))}
      </group>
      <group ref={nozzle} position={[0, 0.48, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.12, 16]} />
          <meshStandardMaterial
            color="#89a"
            metalness={0.9}
            roughness={0.2}
            emissive="#22d3ee"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <coneGeometry args={[0.02, 0.08, 12]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.85} />
        </mesh>
      </group>
    </group>
  );
}

export function ThreePrinterScene({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  return (
    <div className="h-[min(52vh,420px)] min-h-[240px] w-full">
      <Canvas
        shadows
        camera={{ position: [1.65, 0.85, 1.65], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        dpr={[1, 1.75]}
      >
        <ambientLight intensity={0.45} />
        <spotLight
          position={[2.5, 4, 2]}
          angle={0.45}
          penumbra={0.5}
          intensity={1.4}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-1.5, 1.2, 1]} intensity={0.35} color="#22d3ee" />
        <SceneContent reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
