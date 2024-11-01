import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html center>
      <div className="w-12 h-12 border-4 border-black border-b-transparent rounded-full animate-spin"></div>
    </Html>
  );
};

export default Loader;
