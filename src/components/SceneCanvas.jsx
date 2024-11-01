"use client";

import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import InsideCanvas from "./InsideCanvas";

const SceneCanvas = () => {
  return (
    <Canvas className="bg-gray-900">
      <ScrollControls page={10} damping={0.3}>
        <InsideCanvas />
      </ScrollControls>
    </Canvas>
  );
};

export default SceneCanvas;
