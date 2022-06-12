import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import useStore from '@/utils/store'
import partition from '@/utils/partition'
import Header from '@/config'
import Dom from '@/components/Three/layout/dom'
import { HomeIcon } from '@/components/svg'
import { Col } from '@/components/Layout/styled'
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
      position: 'fixed', top: 0, left: 0, padding: '1rem 2rem'}}>
      <div style={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridGap: '1rem'
      }}>
        <Link href="/">
          <Col align="center" items="start" justify="start" gap="1rem">
            <HomeIcon height='40px' width="40px"/>
            <div style={{textAlign: 'left', fontSize: '14px', color: textColor,}}>
              JUNG COLLECTIVES
            </div>
          </Col>
            
        </Link>
        <p style={{
          color: textColor, 
          fontSize: '28px',
          fontWeight: 'bold', 
          }}>
          {router.route.includes('dungeon') 
              ? "ARCHETYPE: WORLD"
              : router.route === "/" 
                ? "MENU" 
                : ""}
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
