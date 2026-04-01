"use client";

import { Suspense, useMemo, useRef } from "react";
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
    rootRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.2;
  });

  return (
    <Float speed={1.7} rotationIntensity={0.18} floatIntensity={0.45}>
      <group ref={rootRef} position={[0, -0.95, 0]} scale={2.2}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

useGLTF.preload(HERO_MODEL_PATH);

export function ModelStage() {
  return (
    <div className="relative h-[32rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,#6b4d25_0%,#2d251f_35%,#14110f_72%)]">
      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-300 backdrop-blur">
        3D Hero Stage
      </div>

      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,231,189,0.5),transparent_68%)]" />

      <Canvas camera={{ position: [0, 0.6, 5.2], fov: 34 }} shadows dpr={[1, 1.5]}>
        <color attach="background" args={["#14110f"]} />
        <fog attach="fog" args={["#14110f", 5, 10]} />
        <ambientLight intensity={1} />
        <directionalLight position={[4, 5, 3]} intensity={2.4} color="#ffe0b2" />
        <pointLight position={[-4, 2, -2]} intensity={12} color="#f97316" />
        <spotLight position={[0, 5, 2]} angle={0.28} penumbra={0.8} intensity={16} color="#fff7ed" />

        <Suspense fallback={null}>
          <HeroModel />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
            <circleGeometry args={[5.2, 64]} />
            <shadowMaterial transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, -1.95, -1.4]}>
            <torusGeometry args={[2.2, 0.04, 16, 100]} />
            <meshStandardMaterial color="#f7c67c" emissive="#8a5d1f" emissiveIntensity={0.9} />
          </mesh>
          <Environment preset="sunset" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.7}
          minAzimuthAngle={-0.85}
          maxAzimuthAngle={0.85}
        />
      </Canvas>

      <div className="absolute bottom-5 left-5 right-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 text-sm leading-7 text-zinc-200 backdrop-blur">
          现在首屏已经直接加载真实的 `ToTu.glb`，不再是占位角色。
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 text-sm leading-7 text-zinc-200 backdrop-blur">
          用户可以在 Hero 区域直接拖拽旋转模型，先感受 PaintersGO 的 3D 成果，再继续往下看功能和下载入口。
        </div>
      </div>
    </div>
  );
}
