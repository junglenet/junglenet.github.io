import { SpotLight } from "@react-three/drei";
import { useRef } from "react";
import Room12 from "../props/models/Room12";

// Geometry
export default function NFTRoom(props) {
  const mesh = useRef<any>(null);

  return (
    <mesh ref={mesh} {...props}>
      
      <directionalLight intensity={0.1} position={[0, 15, 0]} color="yellow" />
      {/* <sphereGeometry attach="geometry" args={[2, 32, 32]} /> */}
      <SpotLight
        color="#71E69E"
        distance={8}
        scale={15}
        position={[0, 0, 0]}
        angle={0.10}
        attenuation={3}
        anglePower={5} // Diffuse-cone anglePower (default: 5)
      />
      <Room12/>
    </mesh>
  );
}
