"use client";

import { useGLTF } from "@react-three/drei";

const Asteroids = () => {
  const generateRandomXY = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const zPositions = Array.from({ length: 10 }, (_, i) => -10 * (2 * (i + 1)));

  const asteroidPositions = zPositions.map((z) => [
    generateRandomXY(-20, 20),
    generateRandomXY(-5, 5),
    z,
  ]);

  return (
    <>
      {asteroidPositions.map((position, index) => (
        <RandomAsteroid key={index} position={position} />
      ))}
    </>
  );
};

export default Asteroids;

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

const RandomAsteroid = ({ position }) => {
  return (
    <Asteroid
      scale={[
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
      ]}
      rotation={[
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
      ]}
      position={position}
    />
  );
};

useGLTF.preload("/models/asteroid.glb");
