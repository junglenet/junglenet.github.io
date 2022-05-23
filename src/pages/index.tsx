import { Title } from '@/components/Foundation/Text';

// dom components goes here
const DOM = () => {
  return (
      <Title >Jenny Jung</Title>
      )
    }

const Page = () => {
  return (
    <>
    <DOM />
      {/* @ts-ignore */}
      {/* <R3F r3f /> */}
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
