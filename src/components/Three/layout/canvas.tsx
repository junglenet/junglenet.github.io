import { useRouter } from 'next/router'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, BakeShadows, Cloud, Html, OrbitControls, Preload, Scroll, ScrollControls, Sky, Stars, TransformControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useControls } from 'leva'
import styled from '@emotion/styled'
import { Suspense, useCallback, useEffect, useState } from 'react'
import useStore from '@/utils/store'
import { cvURLS, nftStorageBase } from '@/constants/urls'
import Loader from '../helpers/Loader'
import Lightbulb from '../props/environment/Lights/Lightbulb'
import CameraController from '../helpers/jsm/controls/CameraController'
import AsciiBg from './ascii'

const DungeonView = ({children}) => {
  return (
    <>
      <AdaptiveDpr pixelated/>
      <AdaptiveEvents />
      <CameraController />
      <hemisphereLight color="orange" intensity={0.02}/>
      <Lightbulb position={[0, 0, 0]} intensity={.5} rotation={[-Math.PI / 2, 10, 0]} color="blue"/>
      <Sky turbidity={8} rayleigh={6} mieCoefficient={.005} mieDirectionalG={0.8} sunPosition={ [0, 0, 0]} />
      <Cloud
        opacity={0.5}
        speed={.5} // Rotation speed
        width={6} // Width of the full cloud
        depth={5} // Z-dir depth
        segments={20} // Number of particles
        />
      <Suspense fallback={<Loader />}>
        {children}
        <Preload all />
        <BakeShadows/>
      </Suspense>
      <Stars radius={100} depth={50} count={1000} factor={5} saturation={0} fade speed={1} />
    </>
  )
}

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const router = useRouter()
  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  
  const [isLoading, setIsLoading] = useState(true)
 
  const onRoute = useCallback(() => {

    setTimeout(() => {
      // setIsLoading(false)
      if (router.route === '/scenes') {
        router.replace('/scenes/dungeon')
        setTimeout(() => {
  
          setIsLoading(false)
        }, 2000)
      } else {
  
        setIsLoading(false)
      }
    }, 2000)

 
  }, [ setIsLoading, router.route])

  useEffect(() => {
    if (typeof window !== 'undefined') {
     
      window.addEventListener('pageshow', () => {
        if (router.route.includes('scenes/dungeon')) {
          router.replace('/scenes')
          
        }
      }        
      )
    }
  }, [router.route])


  useEffect(() => {
    if (isLoading) {
      
      onRoute()
    } 
  }, [onRoute, isLoading])

  return isLoading ? (
    <Canvas>
      <Html>
        <div style={{position: 'absolute', top: '10%', left: '0'}}>
          <button style={{color: 'white'}}>Next</button>
        </div>
      </Html>
      <Loader />
    </Canvas>
  ) : router.route === "/" ? (
      <Canvas
        onPointerMissed={() => setTarget(null)}
        >
         <>
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['black', 0, 25]} />
          <pointLight position={[0, 10, -10]} intensity={1} />
          <OrbitControls makeDefault/>
          <Suspense fallback={null}>
            {children}
            <Preload all />
            <AsciiBg />
          </Suspense>
          {target && <TransformControls object={target} mode={mode} />}
            <Zoom/>
        </>
      </Canvas>
    ) : (
      <Canvas
        shadows
        // @ts-ignore
        raycaster={ !router.route === "/cv" && { computeOffsets:({ clientX, clientY }) => ({
            offsetX: clientX, offsetY: clientY 
          })
      }}
        // className="canvas"
        style={{background: "navy", }}
        camera={router.route.includes('dungeon') ? {
          position: [-1, 0, 15],
          rotation: [Math.PI / 2, 10, 0],
        } : router.route === "/cv"
            ? { fov: 15, zoom:  1, position: [0, 0, 0] }
            : {  position: [0, 0, 0]}}
        onCreated={(state) => state.events.connect(dom.current)}
        onPointerMissed={() => setTarget(null)}
      >
        {
          router.route === "/cv" ? (
            <>
              <ScrollControls damping={6} pages={20} >
                {/* @ts-ignore */}
              <Scroll html style={{ width: '100%', height: '100%'}}>
                  {Object.values(cvURLS).map((cv) =>  (
                    <HTMLItem key={`page-${cv.page}`}>
                      {cv.url && <Redirect key={`link-${cv.page}`} href={cv.url} target="_blank"/>}
                      <img key={`${cv.name}`} height={'800px'} width="100%" src={`${nftStorageBase}/${cv.cid}`} alt="test-cv-page"/>
                    </HTMLItem>
                  ))}
                </Scroll>
                
                <Suspense fallback={null}>
                  {children}
                  <Preload all />
                </Suspense>
              </ScrollControls>
            </>
          ) : router.route.includes('dungeon') ? (
              <DungeonView>
                {children}
              </DungeonView>
          ) : (<></>)
        }
        
      </Canvas>
  )
}

function Zoom() {
  useFrame((state) => {
    state.camera.position.lerp(new Vector3(0, 0, 14), 0.003)
    state.camera.lookAt(-1, 0, 0)
  })
  return null;
}

const HTMLItem = styled.div`
  position: relative;
`;

const Redirect = styled.a`
  position: absolute;
  top: 6%;
  right: 5%;
  width: calc(100vw / 4);
  height: calc(100vw / 18);
  cursor: pointer;
`;

export default LCanvas
