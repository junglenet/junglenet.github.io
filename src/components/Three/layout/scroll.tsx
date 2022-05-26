import { Canvas } from '@react-three/fiber'
import { Preload, Scroll,ScrollControls} from '@react-three/drei'
import { Suspense } from 'react'
import useStore from '@/utils/store'
import { cvURLS, nftStorageBase } from '@/constants/urls'
import styled from '@emotion/styled'

const SCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom);

  return (
      <Canvas
        flat
        style={{width: '100%'}}
        dpr={[1, 2]} camera={{ fov: 15, zoom:  1, position: [0, 0, 2] }}
      onCreated={(state) => state.events.connect(dom.current)}
        gl={{
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <ScrollControls damping={6} pages={22} >
          {/* @ts-ignore */}
        <Scroll html style={{ width: '100%', height: '100%'}}>
            {Object.values(cvURLS).map((cv) =>  (
              <HTMLItem key={`page-${cv.page}`}>
                {cv.url && <Redirect key={`link-${cv.page}`} href={cv.url} target="_blank"/>}
                <img key={`${cv.name}`} height={'800px'} width="100vw" src={`${nftStorageBase}/${cv.cid}`} alt="test-cv-page"/>
              </HTMLItem>
            ))}
          </Scroll>
          
          <Suspense fallback={null}>
            {children}
            <Preload all />
          </Suspense>
        </ScrollControls>
      </Canvas>
  )
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

export default SCanvas
