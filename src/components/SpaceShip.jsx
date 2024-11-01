"use client";

import { useGLTF } from "@react-three/drei";

const SpaceShip = (props) => {
  const { scene } = useGLTF("/models/spaceship.glb");

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload("/models/spaceship.glb");

export default SpaceShip;
