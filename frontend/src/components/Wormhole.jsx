import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Wormhole.css";

const Wormhole = () => {
  return (
    <div className="wormhole-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <WormholeMesh />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const WormholeMesh = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    ref.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.3) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[3, 0.2, 150, 20, 2, 3]} />
      <meshBasicMaterial wireframe color={"purple"} />
    </mesh>
  );
};

export default Wormhole;
