import { useEffect, useState } from "react"

export const FollowMouse = ({ color }) => {

  const className = color ? ` cell__${color}` : ``;
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    window.addEventListener('pointermove', handleMove)

    return () => { // cleanup method
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  })

  return (
    <>
      <div style={{
        position: 'fixed',
        borderRadius: '50%',
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: '60px',
        height: '60px',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
        className={className}
      />
    </>
  )
}