import React, { useRef } from "react";
import "./LavaLamp.css";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

const LavaLamp = () => {
  return (
    <div className="lava-lamp-container">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <LavaFlow />
      </Canvas>
    </div>
  );
};

const LavaFlow = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    let t = clock.getElapsedTime() * 0.5; 
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = t;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[12, 8, 128, 128]} />
      <shaderMaterial
        attach="material"
        uniforms={{
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(12, 8) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};


const vertexShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Move blobs upwards over time
    pos.y += time * 0.3; // Controls upward speed

    // Smooth floating effect without horizontal drift
    pos.y += sin(pos.x * 3.0 + time * 1.2) * 0.2;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;


const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    // Create flowing rounded blobs
    float blobs = sin(vUv.x * 8.0 + time) * cos(vUv.y * 8.0 - time);
    float intensity = smoothstep(0.3, 0.7, blobs);

    // Color shift effect
    float hue = mod(time * 0.08, 1.0);
    vec3 color = vec3(
      0.5 + 0.5 * sin(hue * 6.2831), 
      0.5 + 0.5 * sin((hue + 0.3) * 6.2831), 
      0.5 + 0.5 * sin((hue + 0.6) * 6.2831)
    );

    gl_FragColor = vec4(color * intensity, 1.0);
  }
`;

export default LavaLamp;
