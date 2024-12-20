import styled from "styled-components";
import { ReactElement, useState,useRef,useEffect } from "react";
import { useEventListener } from "./useEventListener";
type WasdControlledProps = {
  speed?: number,
  children?: ReactElement
};
type MovementKeys = 'w' | 'a' | 's' | 'd';
type ActiveIntervals = { [K in MovementKeys]?: number };
export const WasdControlled = ({ speed=1, children }: WasdControlledProps) => {
  const [position, setPosition] = useState<{x:number,y:number}>({ x: 400, y: 400 })
  const activeIntervals = useRef<ActiveIntervals>({});

  const move = (key: string) => {
    switch (key) {
      case 'w':
        setPosition((prev) => ({ ...prev, y: prev.y - speed }))
        break;
      case 'a':
        setPosition((prev) => ({ ...prev, x: prev.x - speed }))
        break;
      case 's':
        setPosition((prev) => ({ ...prev, y: prev.y + speed }))
        break;
      case 'd':
        setPosition((prev) => ({ ...prev, x: prev.x + speed }))
        break;
    }
  }

  const HandleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat || activeIntervals.current[e.key as MovementKeys]) return

    if (['w', 'a', 's', 'd'].includes(e.key)) {
      if (!activeIntervals.current[e.key as MovementKeys]) {
        const intervalId = setInterval(() => {
          move(e.key);
        }, 1000 / 120);
        activeIntervals.current[e.key as MovementKeys] = intervalId;
    }
  }}

  const HandleKeyUp = (e: KeyboardEvent) => {
    if (activeIntervals.current[e.key as MovementKeys]) {
      clearInterval(activeIntervals.current[e.key as MovementKeys])
      delete activeIntervals.current[e.key as MovementKeys]      
    }
  }
  
  useEventListener('keydown', HandleKeyDown)
  useEventListener('keyup', HandleKeyUp)

  useEffect(() => {
    return () => {
      Object.values(activeIntervals.current).forEach(clearInterval);
    };
  }, []);
  
  return (
    <WasdDivWrapper style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      {children}
    </WasdDivWrapper>
  )

}


const WasdDivWrapper = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 10px;
    position: absolute;
    background-color:darkcyan;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`