import { cvURLS, nftStorageBase, tempImgUrl } from "@/constants/urls";
import { Scroll,Image,useIntersect, } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from 'three';
import LevelCanvas from "./Level";


export default function ScrollView(props) {

  return (
    <>
      <ScrollCv/>
    </>
  );
}


const ScrollCv = () => {

  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <Scroll>
      <Content key={`${cvURLS[1].name}`}url={`${nftStorageBase}/${cvURLS[1].cid}`} scale={[w , h / 1.5, 0]} position={[-w / 26, -h, 0]}/>
    </Scroll>
  )
}

function Content({url, scale,...props}) {
  const visible = useRef<boolean>(false);
  const ref = useIntersect<any>((isVisible) => (visible.current = isVisible));
  const { width, height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    
    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x, visible.current ? 0 : -width / 2+1, 4, delta)
      ref.current.material.zoom = THREE.MathUtils.damp(
        ref.current.material.zoom, visible.current ? 1 : 1.4, 4, delta)
  })
  

  return (
    <group { ...props} >
      <Image ref={ref} scale={scale} url={url} />
    </group>
  )
}
