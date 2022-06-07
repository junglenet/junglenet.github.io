import dynamic from "next/dynamic";

const ProfilePortal = dynamic(() => import('@/components/Three/canvas/ScrollView'), {
  ssr: false,
})

const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    // <Instructions />
    <div className="profile-header" />
  )
}

const R3F = () => {
  return (
    <>
      <ProfilePortal route='/cv' />
    </>
  )
}

const Portal = () => {
  return (
    <div  className="profile">
      <DOM />
      {/* @ts-ignore */}
      {/* <R3F r3f /> */}
    </div>
  )
}

export default Portal;

export async function getStaticProps() {
  return {
    props: {
      title: 'ProfilePortal'
    }
  }
}
