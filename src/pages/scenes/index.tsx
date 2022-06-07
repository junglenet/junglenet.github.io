
import { Title } from '@/components/Foundation/Text';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/Three/canvas/Loading'), {
  ssr: false
})

// dom components goes here
const DOM = () => {
  return (
      <Title >Loading Scene...</Title>
      )
    }

const R3F = () => {
  return (
      
    <Scene route="/scenes"/>
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
      title: 'Loading...',
    },
  }
}
