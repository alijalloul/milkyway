"use client";

import { useGLTF } from "@react-three/drei";

const Asteroid = (props) => {
  const { nodes, materials } = useGLTF("/models/asteroid.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Asteroid_1a.geometry}
        material={materials["Asteroid1a"]}
      />
    </group>
  );
};

useGLTF.preload("/models/asteroid.glb");

export default Asteroid;
