import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import useStore from '@/utils/store'
import partition from '@/utils/partition'
import Dom from '@/components/Three/layout/dom'
import Header from '@/config'
// import '@/styles/globals.css'
import '../index.css';

const SCanvas = dynamic(() => import('@/components/Three/layout/canvas'), {
  ssr: false,
})


function Overlay() {
  const router = useRouter()
  const textColor = useMemo(() => 
    router.route === "/cv" ? 'black' : 'white', [router.route])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '40px'}}>
      <div className="row">
        <a href="https://dogemoms.xyz/" style={{
          position: 'absolute', top: 20, left: 50, 
          fontSize: '14px', color: textColor
        }}>
            <p>
              JUNG COLLECTIVES
            </p>
        </a>
        <p style={{
          color: textColor, 
          fontSize: '28px',
          fontWeight: 'bold', 
          position: 'fixed', 
          top: '8%', 
          left: '5%'}}>
          {router.route === "/cv" 
            ? 'CURRICULUM VITAE' 
            : router.route.includes('dungeon') 
              ? "ARCHETYPE: WORLD" 
              : "ARCHETYPE: "}
        </p>
      </div>
    </div>
  )
}

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true)
  
  return (
    <>
      <Dom>{dom}</Dom>
      <SCanvas>{r3f}</SCanvas>
      
    </>
  )
}

function App({ Component, pageProps = { title: 'Jenny Jung' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children
  
  return (
    <>
      <Header title={pageProps.title} />
        <Balance child={child} />
      <Overlay/>
    </>
  )
}

export default App
