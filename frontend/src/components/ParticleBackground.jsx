import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef();

  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15; // X axis
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y axis
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z axis
  }

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.05) * 0.4;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        color="#ffffff"
        size={0.075}
        sizeAttenuation={true}
        depthWrite={false}
        transparent={true}
        opacity={0.7}
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
        background:
          "linear-gradient(135deg, #1d3557, #4af3eb, #457b9d, #a8dadc)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
