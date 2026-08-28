import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  Text,
} from "@react-three/drei";
import type { Group } from "three";

const RED = "#e01b2e";
const BLUE = "#1f52ff";

function Tub() {
  const ref = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += Math.min(delta, 0.05) * 0.45;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <group ref={ref}>
      {/* body */}
      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.05, 0.95, 2.1, 64]} />
        <meshStandardMaterial color={RED} metalness={0.45} roughness={0.28} />
      </mesh>

      {/* label band */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.062, 1.005, 0.95, 64]} />
        <meshStandardMaterial color="#0b0d16" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* blue accent stripes */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.07, 1.055, 0.1, 64]} />
        <meshStandardMaterial color={BLUE} metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[1.02, 1.0, 0.1, 64]} />
        <meshStandardMaterial color={BLUE} metalness={0.6} roughness={0.2} />
      </mesh>

      {/* lid */}
      <mesh castShadow position={[0, 1.08, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 0.36, 64]} />
        <meshStandardMaterial color={BLUE} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.06, 64]} />
        <meshStandardMaterial color="#0b0d16" roughness={0.6} />
      </mesh>

      {/* wordmark on the label */}
      <Text
        position={[0, -0.02, 1.075]}
        fontSize={0.17}
        letterSpacing={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        textAlign="center"
      >
        KUMAR & KUMAR{"\n"}SPORTS
      </Text>
      <Text
        position={[0, -0.42, 1.075]}
        fontSize={0.085}
        letterSpacing={0.24}
        color={BLUE}
        anchorX="center"
        anchorY="middle"
      >
        WHEY PROTEIN
      </Text>
    </group>
  );
}

function Orbiters() {
  return (
    <>
      <Float speed={1.6} rotationIntensity={1.4} floatIntensity={1.2}>
        <mesh position={[-2.1, 1.1, -0.6]} castShadow>
          <torusGeometry args={[0.42, 0.11, 24, 64]} />
          <meshStandardMaterial color={BLUE} metalness={0.8} roughness={0.18} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[2.05, -0.7, -0.4]} castShadow>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color={RED} metalness={0.7} roughness={0.22} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        <mesh position={[1.9, 1.5, -1.2]} castShadow>
          <capsuleGeometry args={[0.16, 0.36, 8, 24]} />
          <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.25} />
        </mesh>
      </Float>
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 1, 3]} intensity={40} color={BLUE} />
      <pointLight position={[4, -1, 2]} intensity={30} color={RED} />

      <Tub />
      <Orbiters />

      <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={9} blur={2.6} far={4} />

      <Environment>
        <Lightformer intensity={2} position={[0, 4, 2]} scale={[8, 8, 1]} />
        <Lightformer
          intensity={2.4}
          color={BLUE}
          position={[-4, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[12, 3, 1]}
        />
        <Lightformer
          intensity={2}
          color={RED}
          position={[4, 0, 1]}
          rotation-y={-Math.PI / 2}
          scale={[12, 3, 1]}
        />
      </Environment>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
      />
    </>
  );
}

export function Hero3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={"relative h-[26rem] w-full sm:h-[34rem] " + className}>
      <div
        className="absolute inset-10 rounded-full blur-3xl"
        style={{ background: "var(--gradient-acid)", opacity: 0.28 }}
        aria-hidden="true"
      />
      {mounted && (
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0.8, 5.4], fov: 45 }}
          className="relative"
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
