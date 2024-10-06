import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef();

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // X axis
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y axis
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z axis
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001; // Continuous rotation
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        color="#00bfff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const ParticleBackground = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
