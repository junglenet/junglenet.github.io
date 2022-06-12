import * as THREE from "three";
import { Bounds, Edges, useGLTF, Text, useCursor, MeshReflectorMaterial } from "@react-three/drei"
import { Depth, Fresnel, LayerMaterial } from "lamina";
import { useFrame } from "@react-three/fiber"
import { useCallback, useRef, useState } from "react";
import { Vector3 } from "three";
import useStore from "@/utils/store";

export const NavPortals = (props) => {
  const group = useRef<any>(null);
  const setTarget = useStore((state) => state.setTarget)
  
  return (
    <mesh 
      ref={group} 
      rotation={[0.1, 0, 6.3]}
      {...props}
      >
      <CursorButton1 onClick={ (e) => setTarget(e.object) }/>
      <CursorButton2 onClick={ (e) => setTarget(e.object) }/>
      <CursorButton3 onClick={ (e) => setTarget(e.object) }/>
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
            roughness={1} mirror={1}                />
        </mesh>
      <Zoom />
      <Lights />
    </mesh>
  )
}

const CursorButton1 = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))

  return (
      <group 
        ref={group}
        {...props}
      >
        <Bounds fit clip observe>
          <group castShadow receiveShadow dispose={null}>
            <Cursor onClick={props.onClick} scale={[.5, 1.02, .6]} position={[4.8, 3.8, -1]} rotation={[1.4, .1, 2]}/>
            <ToolTip1/>
          </group>
          {/* <gridHelper args={[10, 40, '#101010', '#050505']} position={[0, 0, 4]} rotation={[0, 0, Math.PI / 2]} visible={false} /> */}
        </Bounds>
      </group>
  )
}


const CursorButton2 = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))

  return (
      <group ref={group} {...props}>
          <Bounds fit clip observe>
            <group>
              <Cursor onClick={props.onClick} scale={[.5, 1.02, .6]} position={[-8, -2, 1]} rotation={[-0.2, 1.2, -0.5]}/>
              <ToolTip2/>
            </group>
          </Bounds>
      </group>
  )
}

const CursorButton3 = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))
  
  return (
      <group ref={group} {...props}>
          <Bounds fit clip observe>
            <group>
              <Cursor onClick={props.onClick} scale={[.5, 1.02, .6]} position={[4.4, -3.5, 0]} rotation={[-0.4, 1.6, -0.5]}/>
              <ToolTip3/>
            </group>
          </Bounds>
      </group>
  )
}


function Cursor(props) {
  const ref = useRef<any>(null);
  // @ts-ignore
  const {nodes } = useGLTF('/lamina-cursor.glb')

  // Animate gradient
  useFrame((state) => {
    const sin = Math.sin(state.clock.elapsedTime / 2)
    const cos = Math.cos(state.clock.elapsedTime / 2)
    ref.current.layers[0].origin.set(cos , 0, 0)
    ref.current.layers[1].origin.set(cos, sin, cos)
    ref.current.layers[2].origin.set(sin, cos, sin)
    ref.current.layers[3].origin.set(cos, sin, cos)
  })

  return (
    <mesh geometry={nodes.Cube.geometry} {...props} >
      <LayerMaterial ref={ref} toneMapped={false}>
        <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal"  far={0.5} origin={[0, 0, 0]} />
        <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add"  far={2} origin={[0, 1, 1]} />
        <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add"  far={3} origin={[0, 1, -1]} />
        <Depth colorA="white" colorB="red" alpha={1} mode="overlay" far={1.5} origin={[1, -1, -1]} />
        <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
      </LayerMaterial>
      <Edges color="gold" />
    </mesh>
  )
}

function ToolTip1(props) {
  const ref = useRef<any>(null);
  const router = useStore((state) => state.router);
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  return (
    <mesh 
      castShadow
      ref={ref}
      position={[2.4, 3.4, -2]}
      rotation={[0, 0, 0]}
      onClick={(e) =>{ 
        e.stopPropagation()

       router.push('/cv')
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text color="gold" fontSize={2} letterSpacing={-0.06} {...props}>CV</Text>
      </mesh>
  );
}

function ToolTip2(props) {
  const ref = useRef<any>(null);
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open('https://freshbaked.io', '_blank')
    } 
  }, [])
  
  return (
    <mesh 
      castShadow
      ref={ref}
      position={[-8, 0, -2]}
      onClick={(e) =>{ 
        e.stopPropagation()
        onClick()
       
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text color="gold" fontSize={2} letterSpacing={-0.06} {...props}>FRESHBAKED</Text>
      </mesh>
  );
}

function ToolTip3(props) {
  const ref = useRef<any>(null);
  const router = useStore((state) => state.router)
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  return (
    <mesh 
      castShadow
      ref={ref}
      position={[5, -2.4, -2]}  
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
        <pointLight position={[0, 7, -15]} distance={5} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={5} intensity={10} />
      </group>
      <spotLight castShadow ref={front} penumbra={0.75} angle={Math.PI / 4} position={[0, 0, 8]} distance={10} intensity={15} shadow-mapSize={[2048, 2048]} />
    </>
  )
}

function Zoom() {
  useFrame((state) => {
    state.camera.position.lerp(new Vector3(0, 0, 10), 0.000)
    state.camera.lookAt(-2, 0, 0)
  });
  return null;
}

export default NavPortals;
