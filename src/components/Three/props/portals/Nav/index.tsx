import * as THREE from "three";
import { Text, useCursor, MeshReflectorMaterial } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useCallback, useRef, useState } from "react";
import useStore from "@/utils/store";
import EarthHologram from "../../models/EarthHologram";
import RetroComputer from "../RetroComputer";
import MysteryBox from "../../models/MysteryBox";
import GoldenFrame from "../../models/GoldenFrame";

export const NavPortals = (props) => {
  const group = useRef<any>(null);
  const setTarget = useStore((state) => state.setTarget)
  
  return (
    <mesh 
      ref={group} 
      rotation={[0.1, 0, 6.3]}
      {...props}
      >
      <CVButton onClick={ (e) => setTarget(e.object) }/>
      <FreshBakedButton onClick={ (e) => setTarget(e.object) } position={[0, 1, 0]}/>
      <WorldButton onClick={ (e) => setTarget(e.object) }/>
      <NFTButton onClick={ (e) => setTarget(e.object) } position={[6, -3, 1]}/>
      <mesh rotation={[-Math.PI / 2, 0, 0]}position={[0, -5, -2]}>
        <planeGeometry args={[30, 30]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            opacity={2}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.25}
            roughness={2} mirror={2}                />
        </mesh>
      <Lights />
    </mesh>
  )
}

const CVButton = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))

  return (
      <group 
        ref={group}
        {...props}
      >
        <CVObject 
          rotation={[0, -Math.PI / 2, 0]}
          position={[5, -3.5, 2]}/>
        <CVText/>
      </group>
  )
}

const CVObject = (props) => {
  const mesh = useRef<any>(null);
  
  return (
    <group ref={mesh} {...props}>
      <rectAreaLight position={[5, 0, 1]}/>
      <RetroComputer />
    </group>
  )
}

function CVText(props) {
  const ref = useRef<any>(null);
  const router = useStore((state) => state.router);
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  return (
    <mesh 
      castShadow
      ref={ref}
      position={[4, -2.4, 0]}  
      onClick={(e) =>{ 
        e.stopPropagation()

       router.push('/cv')
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text color="gold" fontSize={2} letterSpacing={-0.06} {...props}>
          CV
        </Text>
      </mesh>
  );
}

const WorldButton = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))
  
  return (
      <group ref={group} {...props}>
        <WorldObject position={[2, 5.5, -2]} />
        <WorldText/>
      </group>
  )
}

function WorldText(props) {
  const ref = useRef<any>(null);
  const router = useStore((state) => state.router)
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  return (
    <mesh 
      castShadow
      ref={ref}
      position={[2.4, 3.4, -2]}
      onClick={(e) =>{ 
        e.stopPropagation()

       router.push('/scenes/dungeon')
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text fontSize={2} letterSpacing={-0.06} 
          color="gold" 
          {...props}>
          WORLD  
        </Text>
      </mesh>

  );
}

const WorldObject = (props) => {
  const mesh = useRef<any>(null);
  useFrame((state, delta) =>
  mesh.current
    ? (mesh.current.rotation.y = mesh.current.rotation.y += 0.01)
    : null
)

  return (
    <mesh ref={mesh} receiveShadow {...props} >
      <EarthHologram />
    </mesh>
  )
}

const FreshBakedButton = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))

  return (
      <group ref={group} {...props}>
        <rectAreaLight 
          position={[-8, 4, -1]}
          />
        <FreshBakedObject 
          scale={0.06}
          position={[-8, 1.8, -3]}
          />
        <FreshbakedText/>
      </group>
  )
}

function FreshbakedText(props) {
  const ref = useRef<any>(null);
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open('https://funkyflowerz.com', '_blank')
    } 
  }, [])
  
  return (
    <mesh 
      castShadow
      ref={ref}
      position={[-6, 0, -2]}
      onClick={(e) =>{ 
        e.stopPropagation()
        onClick()
       
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text 
          color="gold" 
          fontSize={1.5} 
          letterSpacing={-0.06} 
          {...props}>
            FRESHBAKED
          </Text>
      </mesh>
  );
}

const FreshBakedObject = (props) => {
  const mesh = useRef<any>(null);
  useFrame((state, delta) =>
  mesh.current
    ? (mesh.current.rotation.y = mesh.current.rotation.y += 0.01)
    : null
  );


  return (
    <mesh ref={mesh} receiveShadow {...props} >
      <MysteryBox />
    </mesh>
  )
}

const NFTButton = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))
  
  return (
      <group ref={group} {...props}>
         <rectAreaLight position={[-13, -1, 1]}/>
          <NFTObject
            scale={0.2}
            position={[-13, 0, -2]}
            />
        <NFTText position={[-9, 0, -2]}/>
      </group>
  )
}

function NFTText(props) {
  const ref = useRef<any>(null);
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open('https://cyber.xyz/90skid', '_blank')
    } 
  }, [])
  
  return (
    <mesh 
      castShadow
      ref={ref}
      // position={[-8, 0, -2]}
      onClick={(e) =>{ 
        e.stopPropagation()
        onClick()
       
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text 
          color="gold" 
          fontSize={2} 
          letterSpacing={-0.06} 
          {...props}
          >
            NFTs
          </Text>
      </mesh>
  );
}

const NFTObject = (props) => {
  const mesh = useRef<any>(null);

  return (
    <mesh ref={mesh} receiveShadow {...props} >
      <GoldenFrame />
    </mesh>
  )
}

function Lights() {
  const groupL = useRef<any>(null)
  const groupR = useRef<any>(null)
  const front = useRef<any>(null)
  useFrame(({ pointer }) => {
    groupL.current.rotation.y = THREE.MathUtils.lerp(groupL.current.rotation.y, -pointer.x * (Math.PI / 2), 0.1)
    groupR.current.rotation.y = THREE.MathUtils.lerp(groupR.current.rotation.y, pointer.x * (Math.PI / 2), 0.1)
    front.current.position.x = THREE.MathUtils.lerp(front.current.position.x, pointer.x * 12, 0.05)
    front.current.position.y = THREE.MathUtils.lerp(front.current.position.y, 7 + pointer.y * 4, 0.05)
  })
  return (
    <>
      <group ref={groupL}>
        <pointLight position={[0,5, -10]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 5, -10]} distance={15} intensity={10} />
      </group>
      <spotLight castShadow ref={front} penumbra={0.75} angle={Math.PI / 4} position={[0, 0, 4]} distance={10} intensity={15} shadow-mapSize={[2048, 2048]} />
    </>
  )
}

export default NavPortals;
