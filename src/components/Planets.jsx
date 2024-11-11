"use client";

import { Float, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import * as THREE from "three";

import helvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
const Planets = () => {
  return (
    <>
      <Planet planet="Neptune" position={[0, 0, -20 + -80 * 1]} text="test" />
      <Planet planet="Uranus" position={[0, 0, -20 + -80 * 2]} text="test" />
      <Saturn position={[0, 0, -20 + -80 * 3]} />
      <Planet planet="Jupiter" position={[0, 0, -20 + -80 * 5]} text="test" />
      <Planet planet="Mars" position={[0, 0, -20 + -80 * 6]} text="test" />
      <Planet planet="Earth" position={[0, 0, -20 + -80 * 7]} text="test" />
      <Planet planet="Venus" position={[0, 0, -20 + -80 * 8]} text="test" />
      <Planet planet="Mercury" position={[0, 0, -20 + -80 * 9]} text="test" />
      <Planet planet="Sun" position={[0, 0, -20 + -80 * 10]} text="test" />
    </>
  );
};

export default Planets;

const Planet = ({ planet, position, text }) => {
  const texture = useTexture(`/textures/${planet}.jpg`);
  const textMeshRef = useRef();

  const planetRef = useRef();

  useEffect(() => {
    const font = new FontLoader().parse(helvetikerFont);

    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 1,
      height: 0.5,
      curveSegments: 12,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    if (textMeshRef.current) {
      textMeshRef.current.add(textMesh);
    }
  }, []);

  useFrame((_state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position}>
      <group position={[-30, 0, 0]} ref={textMeshRef}></group>

      <mesh ref={planetRef} position={[30, 0, 0]}>
        <sphereGeometry args={[25, 64, 64]} />
        <meshStandardMaterial map={texture} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

const Saturn = ({ position }) => {
  // Load the texture for Saturn
  const { scene } = useGLTF("/models/Saturn.glb");

  return (
    <group position={position}>
      <Float floatIntensity={2} speed={2}>
        <primitive object={scene} />
      </Float>
    </group>
  );
};
