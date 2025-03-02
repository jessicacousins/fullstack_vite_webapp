import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Tesseract.css";

const Tesseract = () => {
  return (
    <div className="tesseract-container">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        className="tesseract-canvas"
      >
        <TesseractGeometry />
        <OrbitControls enableDamping dampingFactor={0.1} />
      </Canvas>
    </div>
  );
};

const TesseractGeometry = () => {
  const ref = useRef();
  const vertices4D = [];
  const edges = [];
  const pos3D = [];

  const params = {
    speedXY: 0.01,
    speedZW: 0.015,
    modelScale: 5,
    baseColor: new THREE.Color("#ff00ff"),
  };

  useEffect(() => {
    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          for (let w = -1; w <= 1; w += 2) {
            vertices4D.push([x, y, z, w]);
          }
        }
      }
    }

    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        if (
          vertices4D[i].reduce(
            (acc, val, index) => acc + (val !== vertices4D[j][index] ? 1 : 0),
            0
          ) === 1
        ) {
          edges.push([i, j]);
        }
      }
    }

    for (let k = 0; k < 16; k++) {
      pos3D.push(new THREE.Vector3());
    }

    const lineGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(edges.length * 2 * 3);
    lineGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const lineMat = new THREE.LineBasicMaterial({ color: params.baseColor });
    const lineMesh = new THREE.LineSegments(lineGeom, lineMat);

    ref.current.add(lineMesh);

    return () => {
      ref.current.remove(lineMesh);
    };
  }, []);

  const rotate4D = (index, angleXY, angleZW) => {
    let [x, y, z, w] = vertices4D[index];

    const cosA = Math.cos(angleXY);
    const sinA = Math.sin(angleXY);
    const x2 = cosA * x - sinA * y;
    const y2 = sinA * x + cosA * y;

    const cosB = Math.cos(angleZW);
    const sinB = Math.sin(angleZW);
    const z2 = cosB * z - sinB * w;
    const w2 = sinB * z + cosB * w;

    vertices4D[index] = [x2, y2, z2, w2];
  };

  const project4Dto3D = (v4, out3) => {
    const R = 2.5;
    let wd = R - v4[3];
    if (Math.abs(wd) < 0.0001) wd = 0.0001;
    const factor = 1 / wd;

    const s = params.modelScale;
    out3.set(v4[0] * factor * s, v4[1] * factor * s, v4[2] * factor * s);
  };

  useFrame(() => {
    for (let i = 0; i < 16; i++) {
      rotate4D(i, params.speedXY, params.speedZW);
    }

    for (let i = 0; i < 16; i++) {
      project4Dto3D(vertices4D[i], pos3D[i]);
    }

    const positions =
      ref.current.children[0].geometry.attributes.position.array;
    edges.forEach((e, index) => {
      const [i1, i2] = e;
      const v1 = pos3D[i1];
      const v2 = pos3D[i2];
      const off = index * 6;
      positions[off] = v1.x;
      positions[off + 1] = v1.y;
      positions[off + 2] = v1.z;
      positions[off + 3] = v2.x;
      positions[off + 4] = v2.y;
      positions[off + 5] = v2.z;
    });

    ref.current.children[0].geometry.attributes.position.needsUpdate = true;
  });

  return <group ref={ref} />;
};

export default Tesseract;
