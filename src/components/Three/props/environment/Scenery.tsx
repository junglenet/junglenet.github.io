import TrailRoad from "./Floors/Trail";

export default function Scenery({children}) {
  return (
    <TrailRoad 
      target={(
            <>
              {children}
            </>
          )}
      />
  )
}
