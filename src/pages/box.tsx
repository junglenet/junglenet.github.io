import dynamic from 'next/dynamic'
// import Instructions from '@/components/Three/dom/Instructions'
// import Floor from '@/components/Three/props/Floor'
// import { Sky } from '@react-three/drei'
import { Title } from '@/components/Foundation/Text'

// const Box = dynamic(() => import('@/components/Three/canvas/Box'), {
//   ssr: false,
// })

// const Portal = dynamic(() => import('@/components/Three/props/portals/Cursor'), {
//   ssr: false,
// })

const LevelCube = dynamic(() => import ('@/components/Three/canvas/Level'), {
  ssr: false
})

const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    // <Instructions />
    <Title>HELLO, Welcome!</Title>
  )
}

const R3F = () => {
  return (
    <>
      <LevelCube/>
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Box',
    },
  }
}
