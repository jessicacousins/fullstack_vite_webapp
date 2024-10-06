import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeonRainbowParticles() {
  const pointsRef = useRef();

  const particleCount = 1000;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10; // X axis
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y axis
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z axis
    }
    return arr;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
      const time = Date.now() * 0.00001;
      pointsRef.current.material.color.setHSL((time % 1) / 1, 1, 0.5);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        transparent={true}
        opacity={0.9}
      />
    </Points>
  );
}

const ColorfulParticleBackground = React.memo(() => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <NeonRainbowParticles />
      </Canvas>
    </div>
  );
});

export default ColorfulParticleBackground;
