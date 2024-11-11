import { Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Background = () => {
  const texture = useTexture("/images/8k_stars_milky_way.jpg");

  return (
    <>
      <Environment preset="city" />

      <mesh>
        <sphereGeometry args={[500, 64, 64]} />
        <meshStandardMaterial map={texture} side={THREE.BackSide} />
      </mesh>
    </>
  );
};

export default Background;
