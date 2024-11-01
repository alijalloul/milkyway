import { Environment } from "@react-three/drei";

const Background = () => {
  return (
    <>
      {/* <Environment
        background
        files="/images/HDR_blue_nebulae-1.hdr"
        loader={RGBELoader}
        intensity={4}
        rotation={[0, Math.PI, 0]}
      /> */}
      <Environment preset="city" />
    </>
  );
};

export default Background;
