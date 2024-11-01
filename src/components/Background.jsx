import { Environment } from "@react-three/drei";
import { RGBELoader } from "three-stdlib";

const Background = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <Environment
        background
        files="/images/milkyway.exr"
        loader={RGBELoader}
        intensity={4}
        rotation={[0, Math.PI, 0]}
      />
    </>
  );
};

export default Background;
