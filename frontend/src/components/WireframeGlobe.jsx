import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import earthTexture from "./textures/earth.jpg";
import "./WireframeGlobe.css";

const points = [
  { position: [1, 0.5, 1.5], label: "New York" },
  { position: [-1, -0.5, -1.5], label: "Tokyo" },
  { position: [0.5, -1.5, 0.5], label: "Paris" },
  // Note: add more points with different positions and labels
];

const WireframeGlobe = () => {
  const globeRef = useRef();
  const texture = useMemo(
    () => new THREE.TextureLoader().load(earthTexture),
    []
  );

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
      globeRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <mesh ref={globeRef}>
      {/* Globe with Earth texture */}
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} wireframe={false} />
      {/* Render points on the globe */}
      {points.map((point, index) => (
        <InteractivePoint
          key={index}
          position={point.position}
          label={point.label}
        />
      ))}
    </mesh>
  );
};

const InteractivePoint = ({ position, label }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="red" />
      <Html distanceFactor={10}>
        <div className="label">{label}</div>
      </Html>
    </mesh>
  );
};

const GlobeCanvas = () => {
  return (
    <div className="globe-container">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <WireframeGlobe />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default GlobeCanvas;
