import { GridHelper } from "three";
import { Bounds, Edges, Html, useGLTF } from "@react-three/drei"
import { Depth, Fresnel, Gradient, LayerMaterial } from "lamina";
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva";
import { useRef, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";

export const NavPortals = (props) => {
  const group = useRef<any>(null);

  return (
    <mesh ref={group}>
      <CursorButton/>
      <CursorButton2 />
      <CursorButton3 />
    </mesh>
  )
}

const CursorButton = (props) => {
  const group = useRef<any>(null);

  return (
      <mesh ref={group} {...props}>
          <Bounds fit clip observe>
            <group>
              <Cursor scale={[.5, 1.02, .6]} position={[-4, 2, -2]} rotation={[1, 4, 0]}/>
              <ToolTip1/>
            </group>
            <gridHelper args={[10, 40, '#101010', '#050505']} position={[0, 0, 4]} rotation={[0, 0, Math.PI / 2]} />
          </Bounds>
      </mesh>
  )
}


const CursorButton2 = (props) => {
  const group = useRef<any>(null);

  return (
      <mesh ref={group} {...props}>
          <Bounds fit clip observe>
            <group>
              <Cursor scale={[.5, 1.02, .6]} position={[4, -2, 1]} rotation={[-1, 4, -2]}/>
              <ToolTip2/>
            </group>
            <gridHelper args={[10, 40, '#101010', '#050505']} position={[0, 0, 4]} rotation={[0, 0, Math.PI / 2]} />
          </Bounds>
      </mesh>
  )
}

const CursorButton3 = (props) => {
  const group = useRef<any>(null);

  return (
      <mesh ref={group} {...props}>
          <Bounds fit clip observe>
            <group>
              <Cursor scale={[.5, 1.02, .6]} position={[-8, -6, -2]} rotation={[1, 4, 0]}/>
              <ToolTip3/>
            </group>
            <gridHelper args={[10, 40, '#101010', '#050505']} position={[0, 0, 4]} rotation={[0, 0, Math.PI / 2]} />
          </Bounds>
      </mesh>
  )
}


function Cursor(props) {
  const ref = useRef<any>(null);
  // @ts-ignore
  const {nodes } = useGLTF('/lamina-cursor.glb')
  const gradient = useControls({ gradient: { value: 0.7, min: 0, max: 1 }}) as any;

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
        <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5} origin={[0, 0, 0]} />
        <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={2 * gradient} far={2} origin={[0, 1, 1]} />
        <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={3 * gradient} far={3} origin={[0, 1, -1]} />
        <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5} origin={[1, -1, -1]} />
        <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
      </LayerMaterial>
      <Edges color="white" />
    </mesh>
  )
}

function ToolTip1() {
  return (
    <Html center position={[-1, 3, -1]}>
      <button style={{background: '#e4ff0021', borderRadius: '8px', padding: '.5rem 1rem'}}>
        <p style={{color: 'white'}}>Curriculum Vitae</p>
      </button>
    </Html>
  );
}

function ToolTip2() {
  return (
    <Html center position={[3, -1, -1]}>
      <button style={{background: '#e4ff0021', borderRadius: '8px', padding: '.5rem 1rem'}}>
        <p style={{color: 'white'}}>FreshBaked</p>
      </button>
    </Html>
  );
}

function ToolTip3() {
  return (
    <Html center position={[-8, -4, 1]}>
      <button style={{background: '#e4ff0021', borderRadius: '8px', padding: '.5rem 1rem'}}>
        <p style={{color: 'white'}}>World</p>
      </button>
    </Html>
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
