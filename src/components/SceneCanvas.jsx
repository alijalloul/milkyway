"use client";

import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import InsideCanvas from "./InsideCanvas";

const SceneCanvas = () => {
  return (
    <Canvas className="bg-gray-900">
      <ScrollControls pages={50} damping={1}>
        <InsideCanvas />
      </ScrollControls>
    </Canvas>
  );
};

export default SceneCanvas;
