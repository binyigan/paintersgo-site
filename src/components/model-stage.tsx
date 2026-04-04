"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Group } from "three";

const HERO_MODEL_PATH = "/models/ToTu.glb";

function HeroModel() {
  const rootRef = useRef<Group>(null);
  const { scene } = useGLTF(HERO_MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    if (!rootRef.current) return;
    rootRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.22 + 0.16;
    rootRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.03;
  });

  return (
    <Float speed={1.55} rotationIntensity={0.14} floatIntensity={0.32}>
      <group ref={rootRef} position={[0.1, -1.08, 0.1]} scale={2.34}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

useGLTF.preload(HERO_MODEL_PATH);

export function ModelStage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative h-[24rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,#8c6330_0%,#3b2d22_30%,#171311_68%)] md:h-[32rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,211,145,0.18),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(255,154,76,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_32%,rgba(0,0,0,0.22)_100%)]" />

      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-300 backdrop-blur">
        Real-Time 3D Stage
      </div>

      <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(255,234,198,0.52),transparent_68%)]" />
      <div className="absolute left-1/2 top-[16%] h-44 w-44 -translate-x-1/2 rounded-full bg-amber-200/12 blur-3xl" />

      <Canvas
        camera={{ position: [0.18, 0.52, 4.85], fov: 31 }}
        dpr={isMobile ? [1, 1.1] : [1, 1.5]}
        shadows={!isMobile}
        className={isMobile ? "pointer-events-none" : ""}
      >
        <color attach="background" args={["#14110f"]} />
        <fog attach="fog" args={["#14110f", 4.6, 9]} />
        <ambientLight intensity={0.85} color="#fff4df" />
        <hemisphereLight intensity={0.72} groundColor="#1b1512" color="#ffe7c0" />
        <directionalLight position={[4.5, 5.4, 3.2]} intensity={2.8} color="#ffe3bc" />
        <pointLight position={[-3.8, 2.4, -2]} intensity={10} color="#fb923c" />
        <pointLight position={[3.4, 1.8, 2.8]} intensity={7} color="#fde68a" />
        <spotLight position={[0, 5, 2]} angle={0.27} penumbra={0.9} intensity={18} color="#fff7ed" />

        <Suspense fallback={null}>
          <HeroModel />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.12, 0]} receiveShadow>
            <circleGeometry args={[5.4, 64]} />
            <shadowMaterial transparent opacity={0.34} />
          </mesh>
          <mesh position={[0, -1.94, -1.3]}>
            <torusGeometry args={[2.26, 0.045, 16, 100]} />
            <meshStandardMaterial color="#f6c77b" emissive="#a3631a" emissiveIntensity={1.15} />
          </mesh>
          <mesh position={[0, -1.6, -2.5]}>
            <ringGeometry args={[2.3, 3.6, 80]} />
            <meshBasicMaterial color="#ffb85c" transparent opacity={0.09} />
          </mesh>
          <Environment preset="sunset" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!isMobile}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.7}
          minAzimuthAngle={-0.85}
          maxAzimuthAngle={0.85}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 grid gap-3 md:inset-x-5 md:bottom-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.4rem] border border-white/10 bg-black/24 px-4 py-3 backdrop-blur-md md:py-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">Hero Asset</p>
          <p className="mt-2 text-sm leading-7 text-zinc-100">
            当前首屏直接加载真实的 <span className="font-medium text-amber-200">ToTu.glb</span>，
            用户可以在进入功能介绍前先感受 PaintersGO 的 3D 成果质量。
          </p>
        </div>
        <div className="hidden grid-cols-3 gap-3 md:grid">
          {[
            { label: "Model", value: "ToTu.glb" },
            { label: "Control", value: "Drag to orbit" },
            { label: "Preview", value: "App-grade" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-md"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
              <p className="mt-2 text-sm font-medium text-zinc-100">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
