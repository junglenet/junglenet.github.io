import * as THREE from "three";
import { Bounds, Edges, useGLTF, Text, useCursor, MeshReflectorMaterial } from "@react-three/drei"
import { Depth, Fresnel, Gradient, LayerMaterial } from "lamina";
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { Vector3 } from "three";

export const NavPortals = (props) => {
  const group = useRef<any>(null);

  return (
    <mesh ref={group} rotation={[0.1, 0, 6.3]}>
      
      <CursorButton/>
      <CursorButton2 />
      <CursorButton3 />
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
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <spotLight castShadow ref={front} penumbra={0.75} angle={Math.PI / 4} position={[0, 0, 8]} distance={10} intensity={15} shadow-mapSize={[2048, 2048]} />
    </>
  )
}


function Zoom() {
  useFrame((state) => {
    state.camera.position.lerp(new Vector3(0, 0, 10), 0.000)
    state.camera.lookAt(-2, 0, 0)
  })
}

const CursorButton = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))

  return (
      <mesh ref={group} {...props}>
         
          <Bounds fit clip observe>
            <group castShadow receiveShadow dispose={null}>
              <Cursor scale={[.5, 1.02, .6]} position={[5.5, 3.3, -1]} rotation={[1.4, .1, 2]}/>
              {/* <Cursor scale={[.5, 1.02, .6]} position={[5.5, 3.3, -1]} rotation={[-1.8, 2.2, 5.2]}/> */}
              <ToolTip1/>
          </group>
            <gridHelper args={[10, 40, '#101010', '#050505']} position={[0, 0, 4]} rotation={[0, 0, Math.PI / 2]} visible={false} />
          </Bounds>
      </mesh>
  )
}


const CursorButton2 = (props) => {
  const group = useRef<any>(null);
  useFrame(({ pointer }) => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * (Math.PI / 5), 0.005)))

  return (
      <group ref={group} {...props}>
          <Bounds fit clip observe>
            <group>
              <Cursor scale={[.5, 1.02, .6]} position={[-8, -2, 1]} rotation={[-0.2, 1.2, -0.5]}/>
              <ToolTip2/>
            </group>
            <gridHelper args={[10, 40, '#101010', '#050505']} position={[0, 0, 4]} rotation={[0, 0, Math.PI / 2]} visible={false}/>
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
              <Cursor scale={[.5, 1.02, .6]} position={[4.4, -3.5, 0]} rotation={[-0.4, 1.6, -0.5]}/>
              <ToolTip3/>
            </group>
            <gridHelper args={[10, 40, '#101010', '#050505']} position={[0, 0, 4]} rotation={[0, 0, Math.PI / 2]} visible={false}/>
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
  const [clicked, click] = useState(false)
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  
  return (
    <mesh 
      castShadow
      ref={ref}
      position={[3.3, 3, -2]}
      rotation={[0, -.1, 0]}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text color="gold" fontSize={2} letterSpacing={-0.06} {...props}>CV</Text>
      </mesh>
  );
}

function ToolTip2(props) {
  const ref = useRef<any>(null);
  const [clicked, click] = useState(false)
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  
  return (
    <mesh 
      castShadow
      ref={ref}
      position={[-8, 0, -2]}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      >
        <Text color="gold" fontSize={2} letterSpacing={-0.06} {...props}>FRESHBAKED</Text>
      </mesh>
  );
}

function ToolTip3(props) {
  const ref = useRef<any>(null);
  const [clicked, click] = useState(false)
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  
  return (
    <mesh 
      castShadow
      ref={ref}
      position={[5, -2.4, -2]}  
      onClick={() => click(!clicked)}
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

const Button = () => {
  const [isHover, setIsHover] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.button
      initial={false}
      animate={[isLiked ? "liked" : "unliked", isHover ? "hover" : "rest"]}
      whileTap="press"
      variants={buttonVariants}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={() => setIsLiked(!isLiked)}
      style={{background: 'pink'}}
    >
      <motion.div
        className="icon"
        variants={{
          liked: { opacity: 0, transition: iconFadeTransition },
          hover: isLiked
            ? { opacity: 0, transition: iconFadeTransition }
            : { opacity: 1 }
        }}
      >
        {/* Icon here */}
      </motion.div>
      <div className="label">
        <motion.span variants={labelTextVariants} className="default">
          Star
          <motion.span variants={successTextVariants} className="success">
            red
          </motion.span>
        </motion.span>
      </div>
      <div className="number">
        <motion.span variants={currentCountVariants} className="current">
          38
        </motion.span>
        <motion.span variants={newCountVariants} className="new">
          39
        </motion.span>
      </div>
    </motion.button>
  )
}

const iconFadeTransition: Transition = { duration: 0.2, delay: 0.3 };


const buttonVariants: Variants = {
  rest: {
    // "--button-star-greyscale": "100%",
    // "--button-star-contrast": "0%",
    transition: { duration: 0.7 }
  },
  hover: {
    // "--button-star-greyscale": "0%",
    // "--button-star-contrast": "100%",
    scale: 1.2,
    y: -8
  },
  press: { scale: 1.1 }
};

const labelTextVariants: Variants = {
  unliked: { x: 24 },
  liked: { x: -46 }
};

const successTextVariants: Variants = {
  unliked: { opacity: 0 },
  liked: { opacity: 1 }
};

const likedTransition: Transition = {
  duration: 0.25,
  delay: 0.3
};

const currentCountVariants: Variants = {
  unliked: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  liked: { opacity: 0, y: -40, transition: likedTransition }
};

const newCountVariants: Variants = {
  unliked: { opacity: 0, y: 40, transition: { duration: 0.25 } },
  liked: { opacity: 1, y: 0, transition: likedTransition }
};


export default NavPortals;