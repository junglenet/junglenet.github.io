import dynamic from 'next/dynamic'
import { Title } from '@/components/Foundation/Text'

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
