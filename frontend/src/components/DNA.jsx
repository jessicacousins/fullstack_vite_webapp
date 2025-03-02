import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./DNA.css";

const DNA = () => {
  return (
    <div className="dna-container">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DoubleHelix />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const DoubleHelix = () => {
  const ref = useRef();
  const segments = 100;
  const radius = 2;
  const height = 15;
  const turns = 3;
  const spacing = height / segments;

  const vertices = [];
  const edges = [];

  for (let i = 0; i < segments; i++) {
    let angle = (i / segments) * turns * Math.PI * 2;
    let x1 = Math.cos(angle) * radius;
    let z1 = Math.sin(angle) * radius;
    let y1 = i * spacing - height / 2;

    let x2 = Math.cos(angle + Math.PI) * radius;
    let z2 = Math.sin(angle + Math.PI) * radius;
    let y2 = y1;

    vertices.push(new THREE.Vector3(x1, y1, z1));
    vertices.push(new THREE.Vector3(x2, y2, z2));

    if (i > 0) {
      edges.push([i * 2 - 2, i * 2]);
      edges.push([i * 2 - 1, i * 2 + 1]);
    }

    edges.push([i * 2, i * 2 + 1]);
  }

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(edges.length * 6);

  edges.forEach(([i, j], index) => {
    positions[index * 6] = vertices[i].x;
    positions[index * 6 + 1] = vertices[i].y;
    positions[index * 6 + 2] = vertices[i].z;
    positions[index * 6 + 3] = vertices[j].x;
    positions[index * 6 + 4] = vertices[j].y;
    positions[index * 6 + 5] = vertices[j].z;
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="cyan" />
    </lineSegments>
  );
};

export default DNA;
