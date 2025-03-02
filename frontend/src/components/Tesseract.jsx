import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Tesseract.css";

const Tesseract = () => {
  return (
    <div className="tesseract-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="tesseract-canvas"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TesseractGeometry />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const TesseractGeometry = () => {
  const ref = useRef();

  const vertices = useMemo(
    () => [
      [-1, -1, -1, -1],
      [1, -1, -1, -1],
      [1, 1, -1, -1],
      [-1, 1, -1, -1],
      [-1, -1, 1, -1],
      [1, -1, 1, -1],
      [1, 1, 1, -1],
      [-1, 1, 1, -1],
      [-1, -1, -1, 1],
      [1, -1, -1, 1],
      [1, 1, -1, 1],
      [-1, 1, -1, 1],
      [-1, -1, 1, 1],
      [1, -1, 1, 1],
      [1, 1, 1, 1],
      [-1, 1, 1, 1],
    ],
    []
  );

  const edges = useMemo(() => {
    const e = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dist = vertices[i]
          .map((v, idx) => Math.abs(v - vertices[j][idx]))
          .reduce((a, b) => a + b, 0);
        if (dist === 2) e.push([i, j]);
      }
    }
    return e;
  }, [vertices]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.7;

    const thetaXW = time * 0.8;
    const thetaZW = time * 0.5;

    const cosXW = Math.cos(thetaXW);
    const sinXW = Math.sin(thetaXW);
    const cosZW = Math.cos(thetaZW);
    const sinZW = Math.sin(thetaZW);

    const rotatedVertices = vertices.map(([x, y, z, w]) => {
      const newX = cosXW * x - sinXW * w;
      const newW = sinXW * x + cosXW * w;

      const newZ = cosZW * z - sinZW * w;
      const newWW = sinZW * z + cosZW * w;

      return [newX, y, newZ, newWW];
    });

    const positions = new Float32Array(
      edges.flatMap(([i, j]) => [
        rotatedVertices[i][0],
        rotatedVertices[i][1],
        rotatedVertices[i][2],
        rotatedVertices[j][0],
        rotatedVertices[j][1],
        rotatedVertices[j][2],
      ])
    );

    ref.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    ref.current.geometry.computeBoundingSphere();
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial attach="material" color="#ff007f" linewidth={2} />
    </lineSegments>
  );
};

export default Tesseract;
