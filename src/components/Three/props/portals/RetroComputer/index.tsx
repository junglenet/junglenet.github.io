/* eslint-disable react/display-name */
import { SpotLight } from '@react-three/drei';
import React, { useRef } from 'react';
import Model from '../../models/RetroComputer';


export default function RetroComputer({ route }: { route?: string}, props) {
  const mesh = useRef<any>(null); 

  return (
    <mesh 
      ref={mesh}
      className="retro-computer-portal-root"
      {...props}
      >
        <SpotLight 
          position={[1, -1, -2]} 
          distance={5}
          scale={1} 
          color="gray"
          />
        <Model position={[0, 0, 0]}/>
    </mesh>
  )
}
